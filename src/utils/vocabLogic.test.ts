import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_WORDS, DEFAULT_PHRASEBOOK } from '../data/vocabData';
import {
  filterVocabItems,
  computeSrsStats,
  applySm2Grade,
  checkStep1Answer,
  checkStep2ChunkOrder,
  gradeSentenceLocally,
  filterPhrasebookItems,
  createCustomWordEntry,
} from './vocabLogic';

test('filterVocabItems filters by SRS status and search query across Oxford 3000/5000 bank', () => {
  const allItems = filterVocabItems(DEFAULT_WORDS, {
    srsFilter: 'all',
    searchQuery: '',
  });
  assert.equal(allItems.length, 30);

  // Verify every word has official Oxford Learner's Dictionaries URL and MP3 audio
  for (const item of allItems) {
    assert.ok(
      item.oxfordUrl?.startsWith('https://www.oxfordlearnersdictionaries.com/definition/english/'),
      `Missing oxfordUrl for ${item.word}`
    );
    assert.ok(
      item.audioUs?.startsWith('https://www.oxfordlearnersdictionaries.com/media/english/us_pron/'),
      `Missing audioUs for ${item.word}`
    );
    assert.ok(
      item.audioUk?.startsWith('https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/'),
      `Missing audioUk for ${item.word}`
    );
  }

  const searchTimeline = filterVocabItems(DEFAULT_WORDS, {
    srsFilter: 'all',
    searchQuery: 'accommodate your timeline',
  });
  assert.equal(searchTimeline.length, 1);
  assert.equal(searchTimeline[0].id, 'accommodate');
});

test('computeSrsStats and applySm2Grade compute SM-2 values accurately', () => {
  const stats = computeSrsStats(DEFAULT_WORDS);
  assert.equal(stats.totalCount, 30);
  assert.equal(stats.reviewCount + stats.learningCount + stats.masteredCount, 30);

  const updated = applySm2Grade(DEFAULT_WORDS[0], 'mastered', '7 ngày');
  assert.equal(updated.srsStatus, 'mastered');
  assert.equal(updated.intervalText, '7 ngày');
  assert.equal(updated.ef, 2.65);
});

test('checkStep1Answer, checkStep2ChunkOrder, and gradeSentenceLocally validate active recall', () => {
  const accommodate = DEFAULT_WORDS[0];
  assert.equal(checkStep1Answer(accommodate, 'accommodate'), true);
  assert.equal(checkStep1Answer(accommodate, 'mitigate'), false);

  assert.equal(
    checkStep2ChunkOrder(accommodate.chunkPuzzle.targetChunk, [
      'accommodate',
      'your',
      'timeline',
      'for',
      'the',
      'launch',
    ]),
    true
  );

  const grade = gradeSentenceLocally(
    accommodate,
    "We will do our best to accommodate your team's request regarding accommodate your timeline / schedule."
  );
  assert.ok(grade);
  assert.equal(grade.hasTargetWord, true);
  assert.ok(grade.score >= 8.5);
});

test('filterPhrasebookItems and createCustomWordEntry work properly', () => {
  const saved = filterPhrasebookItems(DEFAULT_PHRASEBOOK, 'saved');
  assert.equal(saved.length, 3);

  const slack = filterPhrasebookItems(DEFAULT_PHRASEBOOK, 'slack');
  assert.equal(slack.length, 2);

  const custom = createCustomWordEntry({
    wordText: 'streamline',
    posCefr: 'Verb|B2-C1',
    ipa: '/ˈstriːm.laɪn/',
    meaningVi: 'Tinh gọn quy trình',
    chunk: 'streamline the approval workflow',
    sentence: 'We need to streamline the approval workflow across departments.',
  });
  assert.equal(custom.word, 'streamline');
  assert.equal(custom.srsStatus, 'review');
  assert.equal(custom.contexts.workplace.chunk, 'streamline the approval workflow');
});
