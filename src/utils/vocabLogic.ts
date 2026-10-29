import {
  VocabItem,
  SrsStatus,
  PhrasebookItem,
  PhrasebookCategory,
  SentenceGradeResult,
} from '../types';

export interface FilterCriteria {
  srsFilter: SrsStatus | 'all';
  searchQuery: string;
}

export function filterVocabItems(items: VocabItem[], criteria: FilterCriteria): VocabItem[] {
  return items.filter((item) => {
    if (criteria.srsFilter !== 'all' && item.srsStatus !== criteria.srsFilter) {
      return false;
    }
    const q = criteria.searchQuery.trim().toLowerCase();
    if (q !== '') {
      const inWord = item.word.toLowerCase().includes(q);
      const inVi = item.meaningVi.toLowerCase().includes(q);
      const inChunks = Object.values(item.contexts).some(
        (c) => c.chunk.toLowerCase().includes(q) || c.chunkVi.toLowerCase().includes(q)
      );
      if (!inWord && !inVi && !inChunks) return false;
    }
    return true;
  });
}

export function computeSrsStats(items: VocabItem[]): {
  reviewCount: number;
  learningCount: number;
  masteredCount: number;
  totalCount: number;
  reviewPct: number;
  learningPct: number;
  masteredPct: number;
} {
  const totalCount = items.length || 1;
  const reviewCount = items.filter((w) => w.srsStatus === 'review').length;
  const learningCount = items.filter((w) => w.srsStatus === 'learning').length;
  const masteredCount = items.filter((w) => w.srsStatus === 'mastered').length;

  return {
    reviewCount,
    learningCount,
    masteredCount,
    totalCount: items.length,
    reviewPct: (reviewCount / totalCount) * 100,
    learningPct: (learningCount / totalCount) * 100,
    masteredPct: (masteredCount / totalCount) * 100,
  };
}

export function applySm2Grade(
  item: VocabItem,
  newStatus: SrsStatus,
  newInterval: string
): VocabItem {
  let nextEf = item.ef;
  if (newStatus === 'mastered') {
    nextEf = Math.min(3.0, Number((item.ef + 0.15).toFixed(2)));
  } else if (newStatus === 'review') {
    nextEf = Math.max(1.3, Number((item.ef - 0.2).toFixed(2)));
  }
  return {
    ...item,
    srsStatus: newStatus,
    intervalText: newInterval,
    ef: nextEf,
  };
}

export function checkStep1Answer(item: VocabItem, chosen: string): boolean {
  return chosen.trim().toLowerCase() === item.quiz.answer.trim().toLowerCase();
}

export function checkStep2ChunkOrder(targetChunk: string, selectedTokens: string[]): boolean {
  return selectedTokens.join(' ').trim().toLowerCase() === targetChunk.trim().toLowerCase();
}

export function gradeSentenceLocally(
  w: VocabItem,
  rawInput: string
): SentenceGradeResult | null {
  const raw = rawInput.trim();
  if (raw.length < 10) {
    return null;
  }

  const root = w.word.split(' ')[0].toLowerCase();
  const hasTargetWord = raw.toLowerCase().includes(root);
  const wordCount = raw.split(/\s+/).length;
  const matchedContext = Object.values(w.contexts).some((c) =>
    raw.toLowerCase().includes(c.chunk.split(' ').slice(0, 2).join(' ').toLowerCase())
  );

  let score = 6.5;
  if (hasTargetWord) score += 1.5;
  if (matchedContext) score += 0.8;
  if (wordCount >= 10) score += 0.7;
  if (/^[A-Z]/.test(raw) && /[.!?]$/.test(raw)) score += 0.3;
  score = Math.min(9.5, Math.round(score * 10) / 10);

  const strengthNote = `${
    hasTargetWord
      ? `Sử dụng đúng từ cốt lõi "${w.word}" trong ngữ cảnh phù hợp.`
      : 'Cấu trúc câu có chủ-vị rõ ràng.'
  }${matchedContext ? ' Kết hợp tốt với cụm Collocation chuẩn.' : ''}`;

  const upgradeTip =
    'Kết hợp thêm trạng từ chỉ mức độ hoặc mệnh đề chỉ mục đích (in order to / so that) để câu văn chặt chẽ hơn.';

  return {
    score,
    hasTargetWord,
    matchedContext,
    wordCount,
    strengthNote,
    upgradeTip,
  };
}

export function filterPhrasebookItems(
  items: PhrasebookItem[],
  category: PhrasebookCategory,
  searchQuery = ''
): PhrasebookItem[] {
  return items.filter((item) => {
    if (category === 'saved' && !item.saved) return false;
    if (category !== 'all' && category !== 'saved' && item.category !== category) return false;
    const q = searchQuery.trim().toLowerCase();
    if (q !== '') {
      if (
        !item.situation.toLowerCase().includes(q) &&
        !item.sentenceEn.toLowerCase().includes(q) &&
        !item.chunk.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });
}

export function createCustomWordEntry(input: {
  wordText: string;
  posCefr: string;
  ipa: string;
  meaningVi: string;
  chunk: string;
  sentence: string;
}): VocabItem {
  const wordText = input.wordText.trim();
  const [pos, cefr] = input.posCefr.split('|');
  const ipa = input.ipa.trim() || '/ˈwɜːd/';
  const meaningVi = input.meaningVi.trim();
  const chunk = input.chunk.trim();
  const sentence = input.sentence.trim();
  const slug = wordText.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return {
    id: `${slug}-${Date.now().toString().slice(-3)}`,
    word: wordText,
    ipaUs: ipa,
    ipaUk: ipa,
    pos: pos || 'Verb',
    cefr: cefr || 'B2-C1',
    srsStatus: 'review',
    ef: 2.5,
    intervalText: 'Hôm nay',
    meaningVi,
    meaningEn: `Core business and academic vocabulary: ${wordText}.`,
    trapTip: `Hãy luôn học "${wordText}" đi kèm cụm "${chunk}" để đặt câu chuẩn xác.`,
    family: [wordText],
    contexts: {
      toeic: {
        label: 'TOEIC Thương mại',
        badgeColor: 'indigo',
        chunk,
        chunkVi: meaningVi,
        register: 'Thương mại',
        sentence,
        sentenceVi: meaningVi,
        note: 'Từ vựng người dùng tự thêm.',
      },
      ielts: {
        label: 'IELTS Academic (Band 7.5+)',
        badgeColor: 'violet',
        chunk,
        chunkVi: meaningVi,
        register: 'Học thuật',
        sentence,
        sentenceVi: meaningVi,
        note: 'Từ vựng người dùng tự thêm.',
      },
      workplace: {
        label: 'Giao tiếp Công sở',
        badgeColor: 'emerald',
        chunk,
        chunkVi: meaningVi,
        register: 'Công sở',
        sentence,
        sentenceVi: meaningVi,
        note: 'Từ vựng người dùng tự thêm.',
      },
      daily: {
        label: 'Giao tiếp Đời thường',
        badgeColor: 'amber',
        chunk,
        chunkVi: meaningVi,
        register: 'Đời thường',
        sentence,
        sentenceVi: meaningVi,
        note: 'Từ vựng người dùng tự thêm.',
      },
    },
    quiz: {
      question: sentence.replace(new RegExp(wordText.split(' ')[0], 'i'), '__________'),
      options: [wordText, 'accommodate', 'mitigate', 'expedite'],
      answer: wordText,
      explanation: `Cụm chuẩn: "${chunk}" (${meaningVi}).`,
    },
    chunkPuzzle: {
      targetChunk: chunk,
      meaningVi,
      distractors: ['with', 'on'],
    },
    sentenceStarter: `In our upcoming project, we will use ${chunk} to `,
  };
}
