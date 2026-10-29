import React from 'react';
import { VocabItem, ContextDomain, SrsStatus, TrackFilter } from '../types';

interface LearnThreeTiersTabProps {
  currentWord: VocabItem;
  currentIndex: number;
  totalWords: number;
  contextFilter: ContextDomain | 'all';
  trackFilter: TrackFilter;
  onPrevWord: () => void;
  onNextWord: () => void;
  onSpeak: (text: string, lang?: 'en-US' | 'en-GB') => void;
  onCopy: (text: string, label: string) => void;
  onGradeSrs: (status: SrsStatus, intervalText: string) => void;
  onGoToPractice: () => void;
}

const CTX_ORDER: ContextDomain[] = ['toeic', 'ielts', 'workplace', 'daily'];

const CTX_STYLE_MAP: Record<
  ContextDomain,
  { icon: string; border: string; bg: string; tag: string }
> = {
  toeic: {
    icon: '💼',
    border: 'border-indigo-200 dark:border-indigo-800/80',
    bg: 'bg-indigo-50/40 dark:bg-indigo-950/20',
    tag: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/70 dark:text-indigo-200',
  },
  ielts: {
    icon: '🎓',
    border: 'border-violet-200 dark:border-violet-800/80',
    bg: 'bg-violet-50/40 dark:bg-violet-950/20',
    tag: 'bg-violet-100 text-violet-800 dark:bg-violet-900/70 dark:text-violet-200',
  },
  workplace: {
    icon: '🏢',
    border: 'border-emerald-200 dark:border-emerald-800/80',
    bg: 'bg-emerald-50/40 dark:bg-emerald-950/20',
    tag: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/70 dark:text-emerald-200',
  },
  daily: {
    icon: '☕',
    border: 'border-amber-200 dark:border-amber-800/80',
    bg: 'bg-amber-50/40 dark:bg-amber-950/20',
    tag: 'bg-amber-100 text-amber-800 dark:bg-amber-900/70 dark:text-amber-200',
  },
};

function renderHighlightedSentence(sentence: string, word: string) {
  const root = word.split(' ')[0].replace(/[^a-zA-Z]/g, '');
  if (!root) return sentence;
  const regex = new RegExp(`(${root}[a-zA-Z]*)`, 'gi');
  const parts = sentence.split(regex);
  return parts.map((part, idx) =>
    part.toLowerCase().startsWith(root.toLowerCase()) ? (
      <mark
        key={idx}
        className="bg-brand-100 dark:bg-brand-900/80 text-brand-800 dark:text-brand-200 font-bold px-1 rounded"
      >
        {part}
      </mark>
    ) : (
      <React.Fragment key={idx}>{part}</React.Fragment>
    )
  );
}

export const LearnThreeTiersTab: React.FC<LearnThreeTiersTabProps> = ({
  currentWord: w,
  currentIndex,
  totalWords,
  contextFilter,
  trackFilter,
  onPrevWord,
  onNextWord,
  onSpeak,
  onCopy,
  onGradeSrs,
  onGoToPractice,
}) => {
  const activeCtx: ContextDomain | 'all' =
    contextFilter !== 'all'
      ? contextFilter
      : trackFilter !== 'all'
      ? trackFilter
      : 'all';

  const visibleSentenceKeys: ContextDomain[] =
    activeCtx === 'all'
      ? CTX_ORDER
      : [activeCtx, ...CTX_ORDER.filter((k) => k !== activeCtx)];

  const srsBadgeInfo =
    w.srsStatus === 'review'
      ? {
          text: '🔴 Cần ôn',
          cls: 'px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300',
        }
      : w.srsStatus === 'learning'
      ? {
          text: '🟡 Đang học',
          cls: 'px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300',
        }
      : {
          text: '🟢 Đã thuộc',
          cls: 'px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300',
        };

  return (
    <section id="tab-tier" className="space-y-6">
      {/* TIER 1: CORE WORD CARD */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="bg-gradient-to-r from-brand-600/10 via-indigo-500/5 to-transparent dark:from-brand-500/15 px-6 py-3 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-brand-600 text-white">
              Tầng 1 · Core Word
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Hiểu bản chất, phát âm chuẩn IPA & tránh bẫy ngữ cảnh
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrevWord}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition whitespace-nowrap"
            >
              ← Từ trước
            </button>
            <span className="text-xs font-mono font-bold text-slate-500 tabular-nums">
              {currentIndex + 1} / {totalWords}
            </span>
            <button
              type="button"
              onClick={onNextWord}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition whitespace-nowrap"
            >
              Từ tiếp →
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Word Header, IPA, Audio & Badges */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {w.word}
                </h2>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800">
                  {w.pos}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-violet-100 text-violet-800 dark:bg-violet-950/80 dark:text-violet-300">
                  CEFR {w.cefr}
                </span>
                <span className={srsBadgeInfo.cls}>{srsBadgeInfo.text}</span>
              </div>

              {/* IPA & US/UK Pronunciation Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                  <span className="text-xs font-bold text-slate-500">🇺🇸 US</span>
                  <span className="font-mono text-sm text-slate-800 dark:text-slate-200">
                    {w.ipaUs}
                  </span>
                  <button
                    type="button"
                    aria-label="Nghe phát âm Anh-Mỹ"
                    onClick={() => onSpeak(w.word, 'en-US')}
                    className="p-1 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition"
                    title="Nghe phát âm Anh-Mỹ"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                  <span className="text-xs font-bold text-slate-500">🇬🇧 UK</span>
                  <span className="font-mono text-sm text-slate-800 dark:text-slate-200">
                    {w.ipaUk}
                  </span>
                  <button
                    type="button"
                    aria-label="Nghe phát âm Anh-Anh"
                    onClick={() => onSpeak(w.word, 'en-GB')}
                    className="p-1 rounded-lg bg-slate-700 text-white hover:bg-slate-800 transition"
                    title="Nghe phát âm Anh-Anh"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* SM-2 Active Self-Grading Panel */}
            <div className="bg-slate-50 dark:bg-slate-800/70 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col gap-2 min-w-[260px]">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                <span>ĐÁNH GIÁ MỨC ĐỘ NHỚ (SRS SM-2)</span>
                <span className="font-mono text-brand-600 dark:text-brand-400">
                  EF: {w.ef.toFixed(1)} · Ôn: {w.intervalText}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                <button
                  type="button"
                  onClick={() => onGradeSrs('review', '10 phút')}
                  className="py-1.5 px-2 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-center transition"
                >
                  <div className="text-xs font-extrabold">Quên</div>
                  <div className="text-[10px] opacity-80">10p</div>
                </button>
                <button
                  type="button"
                  onClick={() => onGradeSrs('learning', '1 ngày')}
                  className="py-1.5 px-2 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-center transition"
                >
                  <div className="text-xs font-extrabold">Khó</div>
                  <div className="text-[10px] opacity-80">1 ngày</div>
                </button>
                <button
                  type="button"
                  onClick={() => onGradeSrs('learning', '3 ngày')}
                  className="py-1.5 px-2 rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-center transition"
                >
                  <div className="text-xs font-extrabold">Tốt</div>
                  <div className="text-[10px] opacity-80">3 ngày</div>
                </button>
                <button
                  type="button"
                  onClick={() => onGradeSrs('mastered', '7 ngày')}
                  className="py-1.5 px-2 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-center transition"
                >
                  <div className="text-xs font-extrabold">Đã thuộc</div>
                  <div className="text-[10px] opacity-80">7 ngày</div>
                </button>
              </div>
            </div>
          </div>

          {/* Meaning & Nuance Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Nghĩa cốt lõi & Bản chất
              </div>
              <p className="text-base font-bold text-slate-900 dark:text-white mb-1">
                {w.meaningVi}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {w.meaningEn}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1">
                <span>💡</span> Mẹo ghi nhớ & Bẫy thường gặp (Exam Trap)
              </div>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
                {w.trapTip}
              </p>
            </div>
          </div>

          {/* Word Family & Synonyms Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="font-bold text-slate-500 dark:text-slate-400">
              Họ từ & Đồng nghĩa:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(w.family || []).map((f) => (
                <span
                  key={f}
                  className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs border border-slate-200/60 dark:border-slate-700"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TIER 2: CHUNKS & COLLOCATIONS CARD */}
      <div className="tier-connector bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600/10 via-purple-500/5 to-transparent dark:from-violet-500/15 px-6 py-3 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-violet-600 text-white">
              Tầng 2 · Chunks & Collocations
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Học theo cụm cố định để nói/viết tự nhiên như người bản xứ, không ghép từng chữ
            </span>
          </div>
          <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">
            4 ngữ cảnh chuẩn hóa
          </span>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {CTX_ORDER.map((key) => {
            const c = w.contexts[key];
            const st = CTX_STYLE_MAP[key];
            const isFocused = activeCtx === 'all' || activeCtx === key;
            return (
              <div
                key={key}
                className={`p-4 rounded-xl border transition ${st.border} ${st.bg} ${
                  isFocused
                    ? 'ring-1 ring-brand-500/30 opacity-100'
                    : 'opacity-60 hover:opacity-100'
                } flex flex-col justify-between gap-3`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${st.tag}`}>
                      {st.icon} {c.label}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      {c.register}
                    </span>
                  </div>
                  <div className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight">
                    “{c.chunk}”
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    → {c.chunkVi}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => onSpeak(c.chunk, 'en-US')}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    🔊 Nghe cụm từ
                  </button>
                  <button
                    type="button"
                    onClick={() => onCopy(c.chunk, 'Cụm Collocation')}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
                  >
                    📋 Copy cụm
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TIER 3: FULL SENTENCES & SHADOWING CARD */}
      <div className="tier-connector bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600/10 via-teal-500/5 to-transparent dark:from-emerald-500/15 px-6 py-3 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-600 text-white">
              Tầng 3 · Full Sentence & Shadowing
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Đặt cụm từ vào câu hoàn chỉnh, phân tích cấu trúc ăn điểm và luyện nói đuổi
              (Shadowing)
            </span>
          </div>
          <button
            type="button"
            onClick={onGoToPractice}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs whitespace-nowrap"
          >
            <span>✍️</span> Luyện đặt câu với từ này →
          </button>
        </div>

        <div className="p-6 space-y-4">
          {visibleSentenceKeys.map((key) => {
            const c = w.contexts[key];
            const st = CTX_STYLE_MAP[key];
            return (
              <div
                key={key}
                className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${st.tag}`}>
                      {st.icon} {c.label}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      Chunk: <strong>{c.chunk}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSpeak(c.sentence, 'en-US')}
                      className="px-2.5 py-1 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition whitespace-nowrap"
                    >
                      🔊 Phát âm cả câu
                    </button>
                    <button
                      type="button"
                      onClick={() => onCopy(c.sentence, 'Câu mẫu')}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition whitespace-nowrap"
                    >
                      📋 Copy câu này
                    </button>
                  </div>
                </div>
                <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
                  {renderHighlightedSentence(c.sentence, w.word)}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic">
                  “{c.sentenceVi}”
                </p>
                <div className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60">
                  🎯 <strong>Điểm ăn điểm:</strong> {c.note}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
