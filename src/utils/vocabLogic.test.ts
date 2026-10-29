import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_VOCAB_DATA, INITIAL_PHRASEBOOK_DATA } from '../data/vocabData';
import {
  filterVocabItems,
  computeSrsStats,
  checkStep1Answer,
  checkStep2ChunkOrder,
  evaluateSentenceLocally,
  filterPhrasebookItems,
} from './vocabLogic';

test('filterVocabItems filters by persona, SRS status, and search query', () => {
  const allItems = filterVocabItems(INITIAL_VOCAB_DATA, {
    persona: 'all',
    srsFilter: 'all',
    searchQuery: '',
  });
  assert.equal(allItems.length, 10);

  const dueOnly = filterVocabItems(INITIAL_VOCAB_DATA, {
    persona: 'all',
    srsFilter: 'due',
    searchQuery: '',
  });
  assert.equal(dueOnly.length, 4);

  const searchSchedule = filterVocabItems(INITIAL_VOCAB_DATA, {
    persona: 'all',
    srsFilter: 'all',
    searchQuery: 'accommodate your schedule',
  });
  assert.equal(searchSchedule.length, 1);
  assert.equal(searchSchedule[0].id, 'accommodate');
});

test('computeSrsStats calculates due, mastered, and percentage accurately', () => {
  const stats = computeSrsStats(INITIAL_VOCAB_DATA);
  assert.equal(stats.totalCount, 10);
  assert.equal(stats.dueCount, 4);
  assert.equal(stats.masteredCount, 3);
  assert.equal(stats.masteryPercentage, 30);
});

test('checkStep1Answer and checkStep2ChunkOrder validate active recall steps', () => {
  const accommodate = INITIAL_VOCAB_DATA[0];
  assert.equal(checkStep1Answer(accommodate, 'accommodate'), true);
  assert.equal(checkStep1Answer(accommodate, 'accumulate'), false);

  assert.equal(
    checkStep2ChunkOrder(
      ['to', 'accommodate', 'your', 'schedule'],
      ['to', 'accommodate', 'your', 'schedule']
    ),
    true
  );
  assert.equal(
    checkStep2ChunkOrder(
      ['to', 'accommodate', 'your', 'schedule'],
      ['accommodate', 'to', 'your', 'schedule']
    ),
    false
  );
});

test('evaluateSentenceLocally scores full collocation sentence at 100/100', () => {
  const accommodate = INITIAL_VOCAB_DATA[0];
  const res = evaluateSentenceLocally(
    accommodate,
    'Please let me know if we need to move the meeting to accommodate your schedule.',
    'office'
  );
  assert.equal(res.score, 100);
  assert.equal(res.hasWord, true);
  assert.equal(res.hasChunk, true);
  assert.equal(res.modeLabel, 'Email/Họp Công sở');
});

test('filterPhrasebookItems filters by category and saved status', () => {
  const saved = filterPhrasebookItems(INITIAL_PHRASEBOOK_DATA, 'saved');
  assert.equal(saved.length, 2);

  const negotiation = filterPhrasebookItems(INITIAL_PHRASEBOOK_DATA, 'negotiation');
  assert.equal(negotiation.length, 2);
});
