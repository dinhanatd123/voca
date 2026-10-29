import React from 'react';
import { VocabItem, ContextDomain } from '../types';

interface MatrixTabProps {
  words: VocabItem[];
  currentWord: VocabItem;
  onSelectWord: (wordId: string) => void;
  onSpeak: (text: string, lang?: 'en-US' | 'en-GB') => void;
}

const MATRIX_CTX_ORDER: {
  key: ContextDomain;
  icon: string;
  title: string;
  formality: string;
  barColor: string;
}[] = [
  {
    key: 'toeic',
    icon: '💼',
    title: '1. TOEIC (Thương mại & Dịch vụ)',
    formality: '85%',
    barColor: 'bg-indigo-600',
  },
  {
    key: 'ielts',
    icon: '🎓',
    title: '2. IELTS Academic (Học thuật Band 7.5+)',
    formality: '95%',
    barColor: 'bg-violet-600',
  },
  {
    key: 'workplace',
    icon: '🏢',
    title: '3. Giao tiếp Công sở (Email & Họp hành)',
    formality: '80%',
    barColor: 'bg-emerald-600',
  },
  {
    key: 'daily',
    icon: '☕',
    title: '4. Giao tiếp Đời thường (Nhà hàng & Du lịch)',
    formality: '45%',
    barColor: 'bg-amber-500',
  },
];

export const MatrixTab: React.FC<MatrixTabProps> = ({
  words,
  currentWord: w,
  onSelectWord,
  onSpeak,
}) => {
  const handleSpeakAll = () => {
    const combined = `${w.word}. TOEIC: ${w.contexts.toeic.chunk}. IELTS: ${w.contexts.ielts.chunk}. Workplace: ${w.contexts.workplace.chunk}.`;
    onSpeak(combined, 'en-US');
  };

  return (
    <section id="tab-matrix" className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-2">
              <span>🦎 Context Chameleon</span> · Biến hóa linh hoạt theo môi trường
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Ma Trận 4 Ngữ Cảnh cho từ:{' '}
              <span className="text-brand-600 dark:text-brand-400 underline decoration-wavy decoration-brand-400/60">
                {w.word}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              So sánh trực diện cách cùng một từ gốc chuyển đổi Collocation, sắc thái trang trọng
              (Register) và cấu trúc câu trong 4 bối cảnh thực tế.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSpeakAll}
              className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition shadow-xs whitespace-nowrap"
            >
              🔊 Nghe lần lượt 4 ngữ cảnh
            </button>
          </div>
        </div>

        {/* 2x2 Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6">
          {MATRIX_CTX_ORDER.map((item) => {
            const c = w.contexts[item.key];
            return (
              <div
                key={item.key}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      {item.icon} {item.title}
                    </h3>
                    <button
                      type="button"
                      onClick={() => onSpeak(c.sentence, 'en-US')}
                      className="p-1.5 rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-300 text-xs font-bold hover:bg-brand-100 whitespace-nowrap"
                    >
                      🔊 Nghe
                    </button>
                  </div>
                  {/* Formality Meter */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>
                        Sắc thái: <strong>{c.register}</strong>
                      </span>
                      <span>Độ trang trọng: {item.formality}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`${item.barColor} h-full rounded-full`}
                        style={{ width: item.formality }}
                      />
                    </div>
                  </div>
                  {/* Chunk Box */}
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700">
                    <div className="text-[10px] font-bold uppercase text-slate-400">
                      Cụm Collocation chuẩn
                    </div>
                    <div className="font-extrabold text-sm text-brand-600 dark:text-brand-400 mt-0.5">
                      {c.chunk}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{c.chunkVi}</div>
                  </div>
                  {/* Full Sentence */}
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                      “{c.sentence}”
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                      {c.sentenceVi}
                    </p>
                  </div>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200/70 dark:border-slate-700/70">
                  💡 <strong>Ghi chú ứng dụng:</strong> {c.note}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Comparison Table Across All Words */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
            Bảng tổng hợp nhanh Collocation {words.length} từ cốt lõi theo 4 ngữ cảnh
          </h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 font-bold">
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Từ gốc</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">
                    💼 TOEIC Thương mại
                  </th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">
                    🎓 IELTS Academic
                  </th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">
                    🏢 Giao tiếp Công sở
                  </th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">
                    ☕ Đời thường
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {words.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => onSelectWord(item.id)}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer ${
                      item.id === w.id
                        ? 'bg-brand-50/70 dark:bg-brand-950/30 font-semibold'
                        : ''
                    }`}
                  >
                    <td className="p-3 font-extrabold text-brand-600 dark:text-brand-400 whitespace-nowrap">
                      {item.word}
                    </td>
                    <td className="p-3 text-slate-700 dark:text-slate-300">
                      {item.contexts.toeic.chunk}
                    </td>
                    <td className="p-3 text-slate-700 dark:text-slate-300">
                      {item.contexts.ielts.chunk}
                    </td>
                    <td className="p-3 text-slate-700 dark:text-slate-300">
                      {item.contexts.workplace.chunk}
                    </td>
                    <td className="p-3 text-slate-700 dark:text-slate-300">
                      {item.contexts.daily.chunk}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
