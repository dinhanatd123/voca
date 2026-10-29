import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { VocabItem } from '../types';

interface SrsModalProps {
  isOpen: boolean;
  vocabList: VocabItem[];
  onClose: () => void;
  onStartDuePractice: () => void;
}

export const SrsModal: React.FC<SrsModalProps> = ({
  isOpen,
  vocabList,
  onClose,
  onStartDuePractice,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="srs-modal-title"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold text-indigo-600">
              Spaced Repetition System (SRS)
            </span>
            <h3 id="srs-modal-title" className="text-lg font-extrabold text-slate-900">
              Lịch Ôn Tập Ngắt Quãng Hôm Nay
            </h3>
          </div>
          <button
            type="button"
            aria-label="Đóng cửa sổ lịch ôn tập"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600">
          Thuật toán tự động nhắc lại các từ & cụm từ trước khi não bộ quên theo chu kỳ{' '}
          <strong>1 ngày → 3 ngày → 7 ngày → 14 ngày</strong>.
        </p>

        <div className="space-y-2 max-h-72 overflow-y-auto custom-scroll">
          {vocabList.map((item) => {
            const statusText =
              item.srsStatus === 'due'
                ? 'Cần ôn ngay'
                : item.srsStatus === 'mastered'
                ? 'Đã thuộc (14 ngày)'
                : 'Đang nhớ (3 ngày)';
            const statusColor =
              item.srsStatus === 'due'
                ? 'text-rose-600'
                : item.srsStatus === 'mastered'
                ? 'text-emerald-600'
                : 'text-amber-600';

            return (
              <div
                key={item.id}
                className="p-3 rounded-lg border border-slate-200 flex items-center justify-between gap-2 bg-slate-50/60"
              >
                <div className="min-w-0">
                  <div className="font-bold text-sm text-slate-900">
                    {item.word}{' '}
                    <span className="text-xs font-normal font-mono text-slate-500">
                      ({item.ipa})
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 truncate">
                    {item.contexts.office.chunk}
                  </div>
                </div>
                <span className={`text-xs font-bold whitespace-nowrap shrink-0 ${statusColor}`}>
                  {statusText}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onStartDuePractice}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            Bắt đầu luyện tập các từ đến hạn
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
