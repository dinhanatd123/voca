import React from 'react';
import { VocabItem, ContextDomain, SrsStatus, TrackFilter } from '../types';

interface VocabSidebarProps {
  sidebarRef: React.RefObject<HTMLElement | null>;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  totalWordsCount: number;
  filteredWords: VocabItem[];
  selectedWordId: string;
  onSelectWord: (wordId: string) => void;
  searchQuery: string;
  onChangeSearchQuery: (q: string) => void;
  contextFilter: ContextDomain | 'all';
  onChangeContextFilter: (ctx: ContextDomain | 'all') => void;
  trackFilter: TrackFilter;
  srsFilter: SrsStatus | 'all';
  onChangeSrsFilter: (srs: SrsStatus | 'all') => void;
  speechRate: number;
  onToggleSpeechRate: () => void;
  onResetProgress: () => void;
  onResetSearchAndFilters: () => void;
  srsStats: {
    reviewCount: number;
    learningCount: number;
    masteredCount: number;
    reviewPct: number;
    learningPct: number;
    masteredPct: number;
  };
}

const STATUS_META: Record<SrsStatus, { label: string; cls: string }> = {
  review: {
    label: 'Cần ôn',
    cls: 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800',
  },
  learning: {
    label: 'Đang học',
    cls: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  },
  mastered: {
    label: 'Đã thuộc',
    cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  },
};

export const VocabSidebar: React.FC<VocabSidebarProps> = ({
  sidebarRef,
  searchInputRef,
  totalWordsCount,
  filteredWords,
  selectedWordId,
  onSelectWord,
  searchQuery,
  onChangeSearchQuery,
  contextFilter,
  onChangeContextFilter,
  trackFilter,
  srsFilter,
  onChangeSrsFilter,
  speechRate,
  onToggleSpeechRate,
  onResetProgress,
  onResetSearchAndFilters,
  srsStats,
}) => {
  const activeCtxKey: ContextDomain =
    contextFilter !== 'all'
      ? contextFilter
      : trackFilter !== 'all'
      ? trackFilter
      : 'workplace';

  return (
    <aside
      ref={sidebarRef}
      id="vocabSidebar"
      className="w-full lg:w-80 xl:w-96 flex-shrink-0 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden"
    >
      {/* Search & Context Filter Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Danh mục chủ điểm từ vựng
          </h2>
          <button
            type="button"
            onClick={onResetProgress}
            className="text-[11px] font-medium text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition"
            title="Khôi phục trạng thái mặc định"
          >
            Khôi phục mặc định
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={searchInputRef}
            id="inputSearchWord"
            type="text"
            aria-label="Tìm từ, cụm từ, nghĩa tiếng Việt"
            value={searchQuery}
            onChange={(e) => onChangeSearchQuery(e.target.value)}
            placeholder="Tìm từ, cụm từ, nghĩa tiếng Việt..."
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white dark:focus:bg-slate-800 transition"
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="Xóa tìm kiếm"
              onClick={() => onChangeSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Context Space Buttons */}
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              { key: 'all', label: `Tất cả (${totalWordsCount})` },
              { key: 'toeic', label: 'TOEIC' },
              { key: 'ielts', label: 'IELTS' },
              { key: 'workplace', label: 'Công sở' },
              { key: 'daily', label: 'Đời thường' },
            ] as const
          ).map((btn) => {
            const isActive = contextFilter === btn.key;
            return (
              <button
                key={btn.key}
                type="button"
                onClick={() => onChangeContextFilter(btn.key)}
                className={
                  isActive
                    ? 'px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 transition whitespace-nowrap'
                    : 'px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition whitespace-nowrap'
                }
              >
                {btn.label}
              </button>
            );
          })}
        </div>

        {/* SRS Status Filter & Audio Voice Speed */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <select
            aria-label="Lọc trạng thái SRS"
            value={srsFilter}
            onChange={(e) => onChangeSrsFilter(e.target.value as SrsStatus | 'all')}
            className="flex-1 text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">Mọi trạng thái SRS</option>
            <option value="review">🔴 Cần ôn (Due)</option>
            <option value="learning">🟡 Đang học (Learning)</option>
            <option value="mastered">🟢 Đã thuộc (Mastered)</option>
          </select>
          <button
            type="button"
            onClick={onToggleSpeechRate}
            className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-400 transition whitespace-nowrap"
            title="Tốc độ phát âm chuẩn / chậm"
          >
            🔊 {speechRate.toFixed(1)}x
          </button>
        </div>
      </div>

      {/* SRS Overview Mini Progress Bar */}
      <div className="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-[11px] font-semibold mb-1.5 tabular-nums">
          <span className="text-rose-600 dark:text-rose-400">
            Cần ôn: <strong>{srsStats.reviewCount}</strong>
          </span>
          <span className="text-amber-600 dark:text-amber-400">
            Đang học: <strong>{srsStats.learningCount}</strong>
          </span>
          <span className="text-emerald-600 dark:text-emerald-400">
            Đã thuộc: <strong>{srsStats.masteredCount}</strong>
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex">
          <div
            className="bg-rose-500 h-full transition-all duration-300"
            style={{ width: `${srsStats.reviewPct}%` }}
          />
          <div
            className="bg-amber-400 h-full transition-all duration-300"
            style={{ width: `${srsStats.learningPct}%` }}
          />
          <div
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${srsStats.masteredPct}%` }}
          />
        </div>
      </div>

      {/* Word List Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-100 dark:divide-slate-800/70 max-h-[420px] lg:max-h-[680px]">
        {filteredWords.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <div className="text-2xl">🔍</div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Không tìm thấy từ vựng phù hợp
            </p>
            <button
              type="button"
              onClick={onResetSearchAndFilters}
              className="text-xs font-bold text-brand-600 dark:text-brand-400 underline"
            >
              Xóa bộ lọc tìm kiếm
            </button>
          </div>
        ) : (
          filteredWords.map((item, idx) => {
            const isSelected = item.id === selectedWordId;
            const st = STATUS_META[item.srsStatus] || STATUS_META.review;
            const previewChunk = item.contexts[activeCtxKey]
              ? item.contexts[activeCtxKey].chunk
              : item.contexts.workplace.chunk;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectWord(item.id)}
                className={`w-full text-left p-3.5 transition flex flex-col gap-1.5 ${
                  isSelected
                    ? 'bg-brand-50/90 dark:bg-brand-950/50 ring-1 ring-inset ring-brand-500/30'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[11px] font-mono font-bold text-slate-400 tabular-nums">
                      {idx + 1}.
                    </span>
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                      {item.word}
                    </span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      {item.pos}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${st.cls}`}
                  >
                    {st.label}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">
                  {item.meaningVi}
                </p>
                <div className="flex items-center justify-between text-[11px] text-brand-600 dark:text-brand-400 font-medium pt-0.5">
                  <span className="truncate">↳ {previewChunk}</span>
                  <span className="text-[10px] font-mono text-slate-400 ml-2 flex-shrink-0">
                    {item.cefr}
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};
