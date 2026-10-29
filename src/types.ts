export type ContextDomain = 'toeic' | 'ielts' | 'office' | 'daily';

export type PersonaMode = 'all' | 'busy_pro' | 'fresh_grad' | 'exam_prep';

export type SrsStatus = 'due' | 'learning' | 'mastered';

export type ActiveTab = 'learn' | 'matrix' | 'practice' | 'phrasebook' | 'architecture';

export type PhrasebookCategory = 'all' | 'email' | 'meeting' | 'negotiation' | 'saved';

export interface ContextDetail {
  badge: string;
  chunk: string;
  chunkMeaning: string;
  sentenceEn: string;
  sentenceVi: string;
  grammarNote: string;
}

export interface PracticeConfig {
  step1Question: string;
  step1Choices: string[];
  step2TargetMeaning: string;
  step2Words: string[];
  step2Distractors: string[];
  step3TargetChunk: string;
  step3Template: string;
}

export interface VocabItem {
  id: string;
  word: string;
  pos: string;
  ipa: string;
  cefr: string;
  coreMeaning: string;
  memoryTip: string;
  srsStatus: SrsStatus;
  srsInterval: string;
  personas: PersonaMode[];
  contexts: Record<ContextDomain, ContextDetail>;
  practice: PracticeConfig;
}

export interface PhrasebookItem {
  id: string;
  category: 'email' | 'meeting' | 'negotiation';
  catLabel: string;
  situation: string;
  keyChunk: string;
  sentenceEn: string;
  sentenceVi: string;
  tone: string;
  saved: boolean;
}

export interface SentenceEvaluationResult {
  score: number;
  hasWord: boolean;
  hasChunk: boolean;
  wordCount: number;
  chunkFeedback: string;
  structureFeedback: string;
  upgradedSentence: string;
  modeLabel: string;
  source: 'ai' | 'local';
}
