export type ContextDomain = 'toeic' | 'ielts' | 'workplace' | 'daily';

export type TrackFilter = 'all' | ContextDomain;

export type SrsStatus = 'review' | 'learning' | 'mastered';

export type ActiveTab =
  | 'tab-tier'
  | 'tab-matrix'
  | 'tab-practice'
  | 'tab-phrasebook'
  | 'tab-database';

export type PhrasebookCategory =
  | 'all'
  | 'email'
  | 'slack'
  | 'meeting'
  | 'deadline'
  | 'saved';

export interface ContextDetail {
  label: string;
  badgeColor: 'indigo' | 'violet' | 'emerald' | 'amber';
  chunk: string;
  chunkVi: string;
  register: string;
  sentence: string;
  sentenceVi: string;
  note: string;
}

export interface QuizConfig {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface ChunkPuzzleConfig {
  targetChunk: string;
  meaningVi: string;
  distractors: string[];
}

export interface VocabItem {
  id: string;
  word: string;
  ipaUs: string;
  ipaUk: string;
  pos: string;
  cefr: string;
  srsStatus: SrsStatus;
  ef: number;
  intervalText: string;
  meaningVi: string;
  meaningEn: string;
  trapTip: string;
  family: string[];
  contexts: Record<ContextDomain, ContextDetail>;
  quiz: QuizConfig;
  chunkPuzzle: ChunkPuzzleConfig;
  sentenceStarter: string;
}

export interface PhrasebookItem {
  id: string;
  category: 'email' | 'slack' | 'meeting' | 'deadline';
  categoryLabel: string;
  situation: string;
  chunk: string;
  sentenceEn: string;
  sentenceVi: string;
  tone: string;
  saved: boolean;
}

export interface SentenceGradeResult {
  score: number;
  hasTargetWord: boolean;
  matchedContext: boolean;
  wordCount: number;
  strengthNote: string;
  upgradeTip: string;
}
