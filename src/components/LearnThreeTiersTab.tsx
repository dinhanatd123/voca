import React from 'react';
import { Volume2, Copy, ArrowRight, Search, X, Check } from 'lucide-react';
import { VocabItem, ContextDomain, SrsStatus } from '../types';

interface LearnThreeTiersTabProps {
  filteredVocab: VocabItem[];
  selectedWord: VocabItem;
  onSelectWord: (wordId: string) => void;
  contextFilter: ContextDomain | 'all';
  onChangeContextFilter: (filter: ContextDomain | 'all') => void;
  selectedTierDomain: ContextDomain;
  onSelectTierDomain: (domain: ContextDomain) => void;
  searchQuery: string;
  onChangeSearchQuery: (q: string) => void;
  srsFilter: SrsStatus | 'all';
  onChangeSrsFilter: (status: SrsStatus | 'all') => void;
  onResetFilters: () => void;
  onUpdateSrsStatus: (wordId: string, status: SrsStatus) => void;
  onSpeak: (text: string, lang?: 'en-US' | 'en-GB') => void;
  onCopy: (text: string, label: string) => void;
  onJumpToMatrix: (wordId: string) => void;
  onJumpToPractice: (wordId: string) => void;
}

const DOMAIN_META: Record<ContextDomain, { name: string; shortLabel: string }> = {
  toeic: { name: 'TOEIC Thương Mại', shortLabel: 'TOEIC' },
  ielts: { name: 'IELTS Học Thuật', shortLabel: 'IELTS' },
  office: { name: 'Giao Tiếp Công Sở', shortLabel: 'Công sở' },
  daily: { name: 'Phản Xạ Đời Thường', shortLabel: 'Đời thường' },
};

const SRS_STATUS_LABELS: Record<SrsStatus, { text: string; colorClass: string }> = {
  due: { text: 'Cần ôn', colorClass: 'text-rose-600' },
  learning: { text: 'Đang học', colorClass: 'text-amber-600' },
  mastered: { text: 'Đã thuộc', colorClass: 'text-emerald-600' },
};

export const LearnThreeTiersTab: React.FC<LearnThreeTiersTabProps> = ({
  filteredVocab,
  selectedWord,
  onSelectWord,
  contextFilter,
  onChangeContextFilter,
  selectedTierDomain,
  onSelectTierDomain,
  searchQuery,
  onChangeSearchQuery,
  srsFilter,
  onChangeSrsFilter,
  onResetFilters,
  onUpdateSrsStatus,
  onSpeak,
  onCopy,
  onJumpToMatrix,
  onJumpToPractice,
}) => {
  const activeDomain: ContextDomain =
    contextFilter === 'all' ? selectedTierDomain : contextFilter;
  const ctxData = selectedWord.contexts[activeDomain] || selectedWord.contexts.office;

  return (
    <section aria-label="Học 3 Tầng Từ Cụm Câu" className="space-y-6">
      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500 mr-1 whitespace-nowrap">
            Không gian ngữ cảnh:
          </span>
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {(
              [
                { key: 'all', label: 'Tất cả (10)' },
                { key: 'toeic', label: 'TOEIC' },
                { key: 'ielts', label: 'IELTS' },
                { key: 'office', label: 'Công sở' },
                { key: 'daily', label: 'Đời thường' },
              ] as const
            ).map((btn) => {
              const isActive = contextFilter === btn.key;
              return (
                <button
                  key={btn.key}
                  type="button"
                  onClick={() => onChangeContextFilter(btn.key)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              aria-label="Tìm từ, cụm từ, nghĩa tiếng Việt"
              value={searchQuery}
              onChange={(e) => onChangeSearchQuery(e.target.value)}
              placeholder="Tìm từ, cụm từ, nghĩa tiếng Việt..."
              className="w-full pl-8 pr-8 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Xóa tìm kiếm"
                onClick={() => onChangeSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <select
            aria-label="Lọc theo trạng thái SRS"
            value={srsFilter}
            onChange={(e) => onChangeSrsFilter(e.target.value as SrsStatus | 'all')}
            className="text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 shrink-0"
          >
            <option value="all">Mọi trạng thái SRS</option>
            <option value="due">Cần ôn hôm nay</option>
            <option value="learning">Đang học</option>
            <option value="mastered">Đã thuộc lòng</option>
          </select>
        </div>
      </div>

      {/* Main Split Layout: Word List (Left) + 3-Tier Deep Dive (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Word List */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-700">Danh sách Từ trọng tâm</h2>
            <span className="text-xs font-semibold text-indigo-600 tabular-nums">
              {filteredVocab.length} từ
            </span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[480px] lg:max-h-[740px] overflow-y-auto custom-scroll">
            {filteredVocab.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-xs space-y-2.5">
                <p className="font-semibold text-slate-700">
                  Không tìm thấy từ phù hợp với bộ lọc hiện tại.
                </p>
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-semibold hover:bg-indigo-100 transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              filteredVocab.map((item) => {
                const isSelected = item.id === selectedWord.id;
                const statusMeta = SRS_STATUS_LABELS[item.srsStatus];
                const sampleChunk =
                  item.contexts[activeDomain]?.chunk.split('/')[0].trim() || '';

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectWord(item.id)}
                    className={`w-full text-left p-3.5 transition-colors flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-indigo-50/90 ring-1 ring-inset ring-indigo-500/30'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{item.word}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{item.ipa}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                        {item.coreMeaning}
                      </p>
                      <div className="mt-1.5 text-[11px] font-medium text-indigo-700 truncate">
                        Cụm: {sampleChunk}
                      </div>
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1 text-[11px] tabular-nums">
                      <span className={`font-semibold ${statusMeta.colorClass}`}>
                        {statusMeta.text}
                      </span>
                      <span className="text-slate-400 font-medium">{item.cefr}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: 3-Tier Interactive Card */}
        <div className="lg:col-span-8 space-y-5">
          {/* TIER 1: CORE WORD */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-slate-900">Tầng 1 · Từ gốc (Core Word)</span>
                <span className="text-slate-300" aria-hidden="true">
                  ·
                </span>
                <span className="font-medium text-slate-600">
                  {selectedWord.pos} · Chuẩn {selectedWord.cefr}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-500 mr-1">{selectedWord.srsInterval}</span>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => onUpdateSrsStatus(selectedWord.id, 'due')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                      selectedWord.srsStatus === 'due'
                        ? 'bg-rose-600 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Cần ôn
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateSrsStatus(selectedWord.id, 'learning')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                      selectedWord.srsStatus === 'learning'
                        ? 'bg-amber-600 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Đang nhớ
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateSrsStatus(selectedWord.id, 'mastered')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 transition-colors flex items-center gap-1 ${
                      selectedWord.srsStatus === 'mastered'
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    Đã thuộc
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {selectedWord.word}
                  </h3>
                  <span className="text-sm font-mono text-indigo-700">{selectedWord.ipa}</span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-slate-800 mt-2">
                  {selectedWord.coreMeaning}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    onSpeak(selectedWord.word.split('/')[0].trim(), 'en-US')
                  }
                  className="px-3.5 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs flex items-center gap-1.5 border border-indigo-200 whitespace-nowrap shrink-0 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Anh-Mỹ (US)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onSpeak(selectedWord.word.split('/')[0].trim(), 'en-GB')
                  }
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 border border-slate-200 whitespace-nowrap shrink-0 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Anh-Anh (UK)
                </button>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950">
              <strong className="font-bold">Mẹo ghi nhớ & Bẫy thường gặp:</strong>{' '}
              {selectedWord.memoryTip}
            </div>
          </div>

          {/* TIER 2: CHUNKS & COLLOCATIONS ACROSS 4 CONTEXTS */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-purple-800">
                Tầng 2 · Cụm từ đi kèm (Chunks & Collocations)
              </span>
              <span className="text-xs text-slate-500">
                Bấm chọn ngữ cảnh để xem cụm từ & câu tương ứng:
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {(Object.keys(selectedWord.contexts) as ContextDomain[]).map((domKey) => {
                const domVal = selectedWord.contexts[domKey];
                const isCurr = domKey === activeDomain;
                const meta = DOMAIN_META[domKey];
                const firstChunk = domVal.chunk.split('/')[0].trim();

                return (
                  <div
                    key={domKey}
                    role="button"
                    tabIndex={0}
                    aria-label={`Chọn ngữ cảnh ${meta.name}`}
                    onClick={() => onSelectTierDomain(domKey)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectTierDomain(domKey);
                      }
                    }}
                    className={`cursor-pointer p-3.5 rounded-xl border transition-all text-left ${
                      isCurr
                        ? 'bg-indigo-50/90 border-indigo-500 ring-2 ring-indigo-500/15'
                        : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-700">{meta.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSpeak(firstChunk, 'en-US');
                        }}
                        className="text-xs text-indigo-600 hover:underline font-semibold flex items-center gap-1 whitespace-nowrap shrink-0"
                      >
                        <Volume2 className="w-3 h-3" />
                        Nghe cụm
                      </button>
                    </div>
                    <p className="text-sm font-extrabold text-indigo-950">{domVal.chunk}</p>
                    <p className="text-xs text-slate-600 mt-1">{domVal.chunkMeaning}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TIER 3: FULL CONTEXTUAL SENTENCE */}
          <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-extrabold text-emerald-400">
                  Tầng 3 · Cả câu hoàn chỉnh (Full Sentence)
                </span>
                <span className="text-slate-600" aria-hidden="true">
                  ·
                </span>
                <span className="font-medium text-indigo-200">{ctxData.badge}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSpeak(ctxData.sentenceEn, 'en-US')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Nghe cả câu
                </button>
                <button
                  type="button"
                  onClick={() => onCopy(ctxData.sentenceEn, 'câu mẫu')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-indigo-100 text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy câu
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <blockquote className="text-base sm:text-lg font-bold text-white leading-relaxed bg-slate-800/60 p-4 rounded-lg border border-slate-700/80">
                "{ctxData.sentenceEn}"
              </blockquote>
              <p className="text-xs sm:text-sm text-indigo-200">→ {ctxData.sentenceVi}</p>
              <div className="mt-3 pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
                <div>
                  <strong className="text-emerald-300">Ghi chú áp dụng:</strong>{' '}
                  {ctxData.grammarNote}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onJumpToMatrix(selectedWord.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold whitespace-nowrap shrink-0 transition-colors flex items-center gap-1"
                  >
                    So sánh 4 ngữ cảnh
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onJumpToPractice(selectedWord.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold whitespace-nowrap shrink-0 transition-colors flex items-center gap-1"
                  >
                    Luyện tập từ này
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
