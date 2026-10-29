import React from 'react';
import { Volume2, Copy } from 'lucide-react';
import { VocabItem, ContextDomain } from '../types';

interface MatrixTabProps {
  vocabList: VocabItem[];
  selectedWordId: string;
  onSelectWordId: (wordId: string) => void;
  onSpeak: (text: string, lang?: 'en-US' | 'en-GB') => void;
  onCopy: (text: string, label: string) => void;
}

const MATRIX_STYLES: Record<
  ContextDomain,
  { border: string; headerBg: string; title: string; accentText: string }
> = {
  toeic: {
    border: 'border-blue-200',
    headerBg: 'bg-blue-50/80',
    title: 'TOEIC (Thương mại & Đề thi)',
    accentText: 'text-blue-700',
  },
  ielts: {
    border: 'border-purple-200',
    headerBg: 'bg-purple-50/80',
    title: 'IELTS Academic (Học thuật Band 7.0+)',
    accentText: 'text-purple-700',
  },
  office: {
    border: 'border-indigo-200',
    headerBg: 'bg-indigo-50/80',
    title: 'Giao tiếp Công sở (Email & Họp)',
    accentText: 'text-indigo-700',
  },
  daily: {
    border: 'border-emerald-200',
    headerBg: 'bg-emerald-50/80',
    title: 'Giao tiếp Đời thường (Tự nhiên)',
    accentText: 'text-emerald-700',
  },
};

export const MatrixTab: React.FC<MatrixTabProps> = ({
  vocabList,
  selectedWordId,
  onSelectWordId,
  onSpeak,
  onCopy,
}) => {
  const item = vocabList.find((w) => w.id === selectedWordId) || vocabList[0];

  return (
    <section aria-label="Ma Trận 1 Từ 4 Ngữ Cảnh" className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-600">
              Tính năng đối chiếu trực diện
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
              Bộ Lọc "1 Từ – 4 Ngữ Cảnh" (Context Chameleon)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              Cùng 1 từ vựng nhưng khi bước vào bài thi IELTS, đề TOEIC, Email công sở hay Quán cà
              phê sẽ đi kèm các cụm (Chunks) và sắc thái câu hoàn toàn khác nhau.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="matrix-word-select" className="text-xs font-semibold text-slate-600">
              Chọn từ đối chiếu:
            </label>
            <select
              id="matrix-word-select"
              value={item.id}
              onChange={(e) => onSelectWordId(e.target.value)}
              className="bg-indigo-50 border border-indigo-200 text-indigo-950 font-bold text-xs sm:text-sm rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {vocabList.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.word} ({w.pos}) — {w.coreMeaning.slice(0, 38)}...
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {(Object.keys(item.contexts) as ContextDomain[]).map((key) => {
          const data = item.contexts[key];
          const st = MATRIX_STYLES[key];
          const subTopic = data.badge.split('·')[1]?.trim() || data.badge;

          return (
            <div
              key={key}
              className={`bg-white rounded-xl border ${st.border} overflow-hidden flex flex-col justify-between`}
            >
              <div>
                <div
                  className={`${st.headerBg} px-4 py-3 border-b ${st.border} flex items-center justify-between gap-2`}
                >
                  <span className="text-xs font-extrabold text-slate-900">{st.title}</span>
                  <span className={`text-xs font-semibold ${st.accentText}`}>{subTopic}</span>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-slate-500">
                      Tầng 2 · Cụm từ (Chunk / Collocation)
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <p className="text-sm font-extrabold text-indigo-950">{data.chunk}</p>
                      <button
                        type="button"
                        onClick={() => onSpeak(data.chunk.split('/')[0].trim(), 'en-US')}
                        className="text-xs text-indigo-600 font-semibold hover:underline shrink-0 flex items-center gap-1 whitespace-nowrap"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        Nghe
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">Nghĩa: {data.chunkMeaning}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <div className="text-xs font-semibold text-slate-500">
                      Tầng 3 · Câu áp dụng hoàn chỉnh
                    </div>
                    <p className="text-sm font-semibold text-slate-900 mt-1 leading-relaxed">
                      "{data.sentenceEn}"
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{data.sentenceVi}</p>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="text-slate-600 leading-snug">
                  <strong className="text-slate-700">Ghi chú:</strong> {data.grammarNote}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => onSpeak(data.sentenceEn, 'en-US')}
                    className="text-indigo-600 font-semibold hover:underline flex items-center gap-1 whitespace-nowrap"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    Đọc câu
                  </button>
                  <button
                    type="button"
                    onClick={() => onCopy(data.sentenceEn, 'câu ngữ cảnh')}
                    className="text-slate-600 font-semibold hover:text-slate-900 flex items-center gap-1 whitespace-nowrap"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
