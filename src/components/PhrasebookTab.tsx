import React from 'react';
import { Volume2, Copy, Star } from 'lucide-react';
import { PhrasebookItem, PhrasebookCategory } from '../types';
import { filterPhrasebookItems } from '../utils/vocabLogic';

interface PhrasebookTabProps {
  phrasebookList: PhrasebookItem[];
  activeCategory: PhrasebookCategory;
  onSelectCategory: (cat: PhrasebookCategory) => void;
  onToggleSave: (id: string) => void;
  onSpeak: (text: string, lang?: 'en-US' | 'en-GB') => void;
  onCopy: (text: string, label: string) => void;
}

export const PhrasebookTab: React.FC<PhrasebookTabProps> = ({
  phrasebookList,
  activeCategory,
  onSelectCategory,
  onToggleSave,
  onSpeak,
  onCopy,
}) => {
  const savedCount = phrasebookList.filter((p) => p.saved).length;
  const filtered = filterPhrasebookItems(phrasebookList, activeCategory);

  const categories: { key: PhrasebookCategory; label: string }[] = [
    { key: 'all', label: 'Tất cả tình huống' },
    { key: 'email', label: 'Viết Email & Nhắn Slack' },
    { key: 'meeting', label: 'Họp & Thuyết trình' },
    { key: 'negotiation', label: 'Đàm phán & Xin lùi Deadline' },
    { key: 'saved', label: `Đã lưu (${savedCount})` },
  ];

  return (
    <section aria-label="Sổ Tay Câu Công Sở Cấp Tốc" className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-700">
            Ứng dụng thực chiến ngay tại bàn làm việc
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
            Sổ Tay Cụm & Câu Công Sở Cấp Tốc (Copy & Dùng Ngay)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Tổng hợp các cụm từ (Chunks) và mẫu câu hoàn chỉnh cho Email, Slack/Teams, Họp hành và
            Đàm phán. Bấm 1 chạm để copy hoặc nghe phát âm.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => onSelectCategory(cat.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 transition-colors tabular-nums ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
          Chưa có mẫu câu nào trong mục đã lưu. Hãy bấm biểu tượng ngôi sao ở các mẫu câu bạn
          thích nhé!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">{item.catLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-700 font-medium">{item.tone}</span>
                  </div>
                  <button
                    type="button"
                    aria-label={
                      item.saved
                        ? `Bỏ lưu mẫu câu: ${item.situation}`
                        : `Lưu mẫu câu: ${item.situation}`
                    }
                    onClick={() => onToggleSave(item.id)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        item.saved ? 'fill-amber-400 text-amber-500' : 'text-slate-400'
                      }`}
                    />
                  </button>
                </div>

                <h3 className="text-sm font-bold text-slate-800">{item.situation}</h3>

                <div className="mt-2 text-xs font-bold text-indigo-700">
                  Cụm từ khóa: {item.keyChunk}
                </div>

                <p className="mt-2.5 text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                  "{item.sentenceEn}"
                </p>
                <p className="mt-1 text-xs text-slate-500">→ {item.sentenceVi}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => onSpeak(item.sentenceEn, 'en-US')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Nghe mẫu câu
                </button>
                <button
                  type="button"
                  onClick={() => onCopy(item.sentenceEn, 'mẫu câu công sở')}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy câu này
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
