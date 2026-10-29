import React, { useState, useMemo } from 'react';
import { PhrasebookItem, PhrasebookCategory } from '../types';
import { filterPhrasebookItems } from '../utils/vocabLogic';

interface PhrasebookTabProps {
  phrasebookItems: PhrasebookItem[];
  onToggleStar: (id: string) => void;
  onSpeak: (text: string, lang?: 'en-US' | 'en-GB') => void;
  onCopy: (text: string, label: string) => void;
}

const CATEGORIES: { id: PhrasebookCategory; label: string }[] = [
  { id: 'all', label: 'Tất cả (10)' },
  { id: 'email', label: '📧 Email (4)' },
  { id: 'slack', label: '💬 Slack/Teams (2)' },
  { id: 'meeting', label: '🎙️ Họp hành (2)' },
  { id: 'deadline', label: '⏳ Lùi Deadline (2)' },
  { id: 'saved', label: '⭐ Đã lưu' },
];

export const PhrasebookTab: React.FC<PhrasebookTabProps> = ({
  phrasebookItems,
  onToggleStar,
  onSpeak,
  onCopy,
}) => {
  const [activeCategory, setActiveCategory] = useState<PhrasebookCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(
    () => filterPhrasebookItems(phrasebookItems, activeCategory, searchQuery),
    [phrasebookItems, activeCategory, searchQuery]
  );

  return (
    <section id="tab-phrasebook" className="space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              💼 Sổ Tay Công Sở Thực Chiến (Workplace Phrasebook)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Mẫu câu chuẩn mực dùng ngay trong Email, Họp hành, Báo cáo &amp; Xin lùi Deadline — Có nút lưu Sao (⭐) cá nhân.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm mẫu câu công sở..."
              className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 w-full md:w-56"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 dark:bg-brand-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center text-sm text-slate-500">
          Không tìm thấy mẫu câu phù hợp.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:border-brand-300 transition flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                      {item.categoryLabel}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      • {item.situation}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => onToggleStar(item.id)}
                      className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer ${
                        item.saved ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'
                      }`}
                      title="Lưu mẫu câu"
                    >
                      ★
                    </button>
                    <button
                      type="button"
                      onClick={() => onSpeak(item.sentenceEn, 'en-US')}
                      className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 transition cursor-pointer"
                    >
                      🔊 Nghe
                    </button>
                    <button
                      type="button"
                      onClick={() => onCopy(item.sentenceEn, 'mẫu câu công sở')}
                      className="text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 px-2.5 py-1 rounded-lg transition cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed mb-1.5">
                  “{item.sentenceEn}”
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  🇻🇳 {item.sentenceVi}
                </p>
              </div>
              <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Sắc thái: {item.tone}</span>
                <code className="font-mono font-bold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/50 px-2 py-0.5 rounded">
                  {item.chunk}
                </code>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
