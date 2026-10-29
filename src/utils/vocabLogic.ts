import {
  VocabItem,
  PersonaMode,
  SrsStatus,
  ContextDomain,
  SentenceEvaluationResult,
  PhrasebookItem,
  PhrasebookCategory,
} from '../types';

export interface FilterCriteria {
  persona: PersonaMode;
  srsFilter: SrsStatus | 'all';
  searchQuery: string;
}

export function filterVocabItems(items: VocabItem[], criteria: FilterCriteria): VocabItem[] {
  return items.filter((item) => {
    if (criteria.persona !== 'all' && !item.personas.includes(criteria.persona)) {
      return false;
    }
    if (criteria.srsFilter !== 'all' && item.srsStatus !== criteria.srsFilter) {
      return false;
    }
    const q = criteria.searchQuery.trim().toLowerCase();
    if (q !== '') {
      const inWord = item.word.toLowerCase().includes(q);
      const inMeaning = item.coreMeaning.toLowerCase().includes(q);
      const inChunks = Object.values(item.contexts).some(
        (c) =>
          c.chunk.toLowerCase().includes(q) ||
          c.chunkMeaning.toLowerCase().includes(q) ||
          c.sentenceEn.toLowerCase().includes(q) ||
          c.sentenceVi.toLowerCase().includes(q)
      );
      if (!inWord && !inMeaning && !inChunks) return false;
    }
    return true;
  });
}

export function computeSrsStats(items: VocabItem[]): {
  dueCount: number;
  learningCount: number;
  masteredCount: number;
  totalCount: number;
  masteryPercentage: number;
} {
  const dueCount = items.filter((w) => w.srsStatus === 'due').length;
  const learningCount = items.filter((w) => w.srsStatus === 'learning').length;
  const masteredCount = items.filter((w) => w.srsStatus === 'mastered').length;
  const totalCount = items.length;
  const masteryPercentage = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;

  return {
    dueCount,
    learningCount,
    masteredCount,
    totalCount,
    masteryPercentage,
  };
}

export function getSrsIntervalLabel(status: SrsStatus): string {
  if (status === 'mastered') return 'Đã thuộc (Ôn lại sau 14 ngày)';
  if (status === 'learning') return 'Đang học (Ôn lại sau 3 ngày)';
  return 'Đến hạn hôm nay (Chu kỳ 1 ngày)';
}

export function checkStep1Answer(item: VocabItem, choice: string): boolean {
  const normalizedChoice = choice.trim().toLowerCase();
  const primaryLemma = item.word.split('/')[0].trim().toLowerCase();
  return (
    normalizedChoice === primaryLemma ||
    normalizedChoice === item.practice.step1Choices[0].trim().toLowerCase()
  );
}

export function checkStep2ChunkOrder(targetWords: string[], selectedWords: string[]): boolean {
  const built = selectedWords.map((w) => w.trim()).join(' ').toLowerCase();
  const target = targetWords.map((w) => w.trim()).join(' ').toLowerCase();
  return built === target;
}

export function getContextModeLabel(mode: ContextDomain): string {
  switch (mode) {
    case 'ielts':
      return 'IELTS Academic (Band 7.5+)';
    case 'toeic':
      return 'TOEIC Business';
    case 'office':
      return 'Email/Họp Công sở';
    case 'daily':
      return 'Giao tiếp tự nhiên';
  }
}

export function evaluateSentenceLocally(
  item: VocabItem,
  userSentence: string,
  mode: ContextDomain
): SentenceEvaluationResult {
  const trimmed = userSentence.trim();
  const lower = trimmed.toLowerCase();
  const baseWord = item.word.split('/')[0].trim().toLowerCase();
  const targetChunk = item.practice.step3TargetChunk.toLowerCase();
  const stem = baseWord.slice(0, Math.min(5, baseWord.length));
  const hasWord = lower.includes(stem);
  const hasChunk = lower.includes(targetChunk);
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;

  let score = 70;
  if (hasWord) score += 12;
  if (hasChunk) score += 13;
  if (wordCount >= 8) score += 5;

  const chunkFeedback = hasChunk
    ? `Tuyệt vời! Bạn đã dùng đúng cụm "${item.practice.step3TargetChunk}".`
    : hasWord
    ? `Bạn đã có từ gốc "${item.word}", hãy thử ghép đủ cả cụm "${item.practice.step3TargetChunk}" để tự nhiên hơn.`
    : `Câu của bạn chưa chứa cụm mục tiêu "${item.practice.step3TargetChunk}".`;

  const structureFeedback =
    wordCount >= 8
      ? `Câu có độ dài tốt (${wordCount} từ), diễn đạt rõ ngữ cảnh.`
      : `Câu hơi ngắn (${wordCount} từ), nên mở rộng thêm mệnh đề chỉ mục đích hoặc thời gian (to / because / before...).`;

  const upgradedSentence =
    item.contexts[mode]?.sentenceEn || item.contexts.office.sentenceEn;

  return {
    score,
    hasWord,
    hasChunk,
    wordCount,
    chunkFeedback,
    structureFeedback,
    upgradedSentence,
    modeLabel: getContextModeLabel(mode),
    source: 'local',
  };
}

export function filterPhrasebookItems(
  items: PhrasebookItem[],
  category: PhrasebookCategory
): PhrasebookItem[] {
  if (category === 'all') return items;
  if (category === 'saved') return items.filter((p) => p.saved);
  return items.filter((p) => p.category === category);
}
