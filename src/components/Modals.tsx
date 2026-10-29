import React, { useState } from 'react';
import { VocabItem, SrsStatus } from '../types';

interface FlashcardModalProps {
  isOpen: boolean;
  words: VocabItem[];
  onSpeak: (text: string, lang?: 'en-US' | 'en-GB') => void;
  onClose: () => void;
  onGradeWord: (wordId: string, status: SrsStatus, intervalText: string) => void;
}

export const FlashcardModal: React.FC<FlashcardModalProps> = ({
  isOpen,
  words,
  onSpeak,
  onClose,
  onGradeWord,
}) => {
  const [fcIndex, setFcIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (!isOpen || words.length === 0) return null;

  const w = words[fcIndex % words.length];

  const handleGrade = (status: SrsStatus, intervalText: string) => {
    onGradeWord(w.id, status, intervalText);
    setFlipped(false);
    setFcIndex((prev) => (prev + 1) % words.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-extrabold">
              ⚡ Flashcard 3 Tầng
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {(fcIndex % words.length) + 1}/{words.length}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-lg font-bold px-2 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Flashcard Box */}
        <div
          onClick={() => setFlipped(!flipped)}
          className="cursor-pointer rounded-2xl border-2 border-dashed border-brand-300 dark:border-brand-700 bg-brand-50/40 dark:bg-slate-800/70 p-6 min-h-[230px] flex flex-col justify-center items-center text-center transition hover:border-brand-500"
        >
          {!flipped ? (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 block mb-2">
                MẶT TRƯỚC (Bấm để lật xem 3 tầng)
              </span>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                {w.word}
              </h3>
              <p className="text-sm font-mono text-slate-500 mb-3">
                {w.pos} • {w.ipaUs}
              </p>
              <span className="text-xs text-slate-400">
                Hãy nhẩm nghĩa và ít nhất 2 cụm Collocation trước khi lật thẻ!
              </span>
            </div>
          ) : (
            <div className="w-full text-left space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="font-extrabold text-base text-brand-700 dark:text-brand-300">
                  {w.meaningVi}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSpeak(w.word, 'en-US');
                  }}
                  className="text-xs px-2 py-1 rounded bg-brand-600 text-white font-bold cursor-pointer"
                >
                  🔊 Phát âm
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-blue-600 block">🎯 TOEIC</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">
                    {w.contexts.toeic.chunk}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-purple-600 block">🎓 IELTS</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">
                    {w.contexts.ielts.chunk}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-emerald-600 block">💼 Công sở</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">
                    {w.contexts.workplace.chunk}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-amber-600 block">☕ Đời thường</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">
                    {w.contexts.daily.chunk}
                  </span>
                </div>
              </div>
              <p className="text-xs italic text-slate-600 dark:text-slate-300 pt-1">
                📌 "{w.contexts.workplace.sentence}"
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          <button
            type="button"
            onClick={() => handleGrade('review', '10 phút')}
            className="py-2 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 cursor-pointer"
          >
            Quên (10p)
          </button>
          <button
            type="button"
            onClick={() => handleGrade('learning', '1 ngày')}
            className="py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 cursor-pointer"
          >
            Khó (1d)
          </button>
          <button
            type="button"
            onClick={() => handleGrade('learning', '3 ngày')}
            className="py-2 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 cursor-pointer"
          >
            Tốt (3d)
          </button>
          <button
            type="button"
            onClick={() => handleGrade('mastered', '7 ngày')}
            className="py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 cursor-pointer"
          >
            Thuộc (7d)
          </button>
        </div>
      </div>
    </div>
  );
};

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveWord: (input: {
    wordText: string;
    posCefr: string;
    ipa: string;
    meaningVi: string;
    chunk: string;
    sentence: string;
  }) => void;
}

export const AddWordModal: React.FC<AddWordModalProps> = ({
  isOpen,
  onClose,
  onSaveWord,
}) => {
  const [wordText, setWordText] = useState('');
  const [posCefr, setPosCefr] = useState('Verb|B2-C1');
  const [ipa, setIpa] = useState('');
  const [meaningVi, setMeaningVi] = useState('');
  const [chunk, setChunk] = useState('');
  const [sentence, setSentence] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wordText.trim() || !meaningVi.trim() || !chunk.trim() || !sentence.trim()) return;
    onSaveWord({
      wordText,
      posCefr,
      ipa,
      meaningVi,
      chunk,
      sentence,
    });
    setWordText('');
    setIpa('');
    setMeaningVi('');
    setChunk('');
    setSentence('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl my-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            ➕ Thêm Từ Vựng 3 Tầng Mới
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-lg font-bold px-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Từ vựng (Headword) *
              </label>
              <input
                type="text"
                required
                value={wordText}
                onChange={(e) => setWordText(e.target.value)}
                placeholder="VD: collaborate"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Từ loại &amp; CEFR
              </label>
              <select
                value={posCefr}
                onChange={(e) => setPosCefr(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2"
              >
                <option value="Verb|B2-C1">Verb (B2-C1)</option>
                <option value="Noun|B2-C1">Noun (B2-C1)</option>
                <option value="Adjective|C1">Adjective (C1)</option>
                <option value="Phrasal Verb|B2">Phrasal Verb (B2)</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Phiên âm IPA
              </label>
              <input
                type="text"
                value={ipa}
                onChange={(e) => setIpa(e.target.value)}
                placeholder="/kəˈlæb.ə.reɪt/"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2"
              />
            </div>
          </div>
          <div>
            <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">
              Nghĩa cốt lõi Tiếng Việt *
            </label>
            <input
              type="text"
              required
              value={meaningVi}
              onChange={(e) => setMeaningVi(e.target.value)}
              placeholder="VD: Hợp tác, cộng tác chặt chẽ"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2"
            />
          </div>
          <div>
            <label className="font-bold text-brand-600 dark:text-brand-400 block mb-1">
              🧩 Cụm Collocation Trọng Tâm (Tầng 2) *
            </label>
            <input
              type="text"
              required
              value={chunk}
              onChange={(e) => setChunk(e.target.value)}
              placeholder="VD: collaborate closely across departments"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2"
            />
          </div>
          <div>
            <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">
              Câu mẫu thực chiến (Tầng 3) *
            </label>
            <input
              type="text"
              required
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              placeholder="Our engineering and design teams collaborate closely across departments to launch the product."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2"
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold cursor-pointer"
            >
              Lưu vào bộ từ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
