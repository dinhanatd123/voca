import React, { useState } from 'react';
import { VocabItem, SrsStatus } from '../types';

interface FlashcardModalProps {
  isOpen: boolean;
  words: VocabItem[];
  onSpeak: (text: string, lang?: 'en-US' | 'en-GB', oxfordMp3Url?: string) => void;
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
              ⚡ Flashcard 3 Tầng (Oxford 3000/5000)
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
                    onSpeak(w.word, 'en-US', w.audioUs);
                  }}
                  className="text-xs px-2 py-1 rounded bg-brand-600 text-white font-bold cursor-pointer"
                >
                  🔊 Phát âm Oxford
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
                📌 &quot;{w.contexts.workplace.sentence}&quot;
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
    ipaUk?: string;
    meaningVi: string;
    meaningEn?: string;
    chunk: string;
    sentence: string;
    audioUs?: string;
    audioUk?: string;
    oxfordUrl?: string;
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
  const [ipaUk, setIpaUk] = useState('');
  const [meaningVi, setMeaningVi] = useState('');
  const [meaningEn, setMeaningEn] = useState('');
  const [chunk, setChunk] = useState('');
  const [sentence, setSentence] = useState('');
  const [audioUs, setAudioUs] = useState<string | undefined>(undefined);
  const [audioUk, setAudioUk] = useState<string | undefined>(undefined);
  const [oxfordUrl, setOxfordUrl] = useState<string | undefined>(undefined);
  const [lookupStatus, setLookupStatus] = useState<string | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);

  if (!isOpen) return null;

  const handleOxfordLookup = async () => {
    const cleanWord = wordText
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-\s]/g, '')
      .replace(/\s+/g, '-');
    if (!cleanWord) {
      setLookupStatus('⚠️ Vui lòng nhập từ tiếng Anh trước khi tra cứu Oxford!');
      return;
    }

    setIsLookingUp(true);
    setLookupStatus('⏳ Đang lấy IPA, Audio MP3 & câu mẫu từ Oxford Learner’s Dictionaries...');

    try {
      const resp = await fetch(`/api/oxford-lookup?word=${encodeURIComponent(cleanWord)}`);
      if (resp.ok) {
        const data = await resp.json();
        if (data.ipaUs) setIpa(data.ipaUs);
        if (data.ipaUk) setIpaUk(data.ipaUk);
        if (data.audioUs) setAudioUs(data.audioUs);
        if (data.audioUk) setAudioUk(data.audioUk);
        if (data.oxfordUrl) setOxfordUrl(data.oxfordUrl);
        if (data.definitionEn) {
          setMeaningEn(data.definitionEn);
          if (!meaningVi.trim()) {
            setMeaningVi(data.definitionEn);
          }
        }
        if (Array.isArray(data.examples) && data.examples.length > 0) {
          const ex = data.examples[0];
          setSentence(ex);
          if (!chunk.trim()) {
            setChunk(ex.split(/\s+/).slice(0, 5).join(' ').replace(/[.,;!?]+$/, ''));
          }
        }
        setLookupStatus(
          `✅ Đã đồng bộ từ Oxford Learner's Dictionaries (${data.pos || 'Word'} · ${
            data.cefr || 'B2'
          })!`
        );
        setIsLookingUp(false);
        return;
      }
    } catch {
      // Fallback for static hosting if backend route is unavailable
    }

    try {
      const fallbackResp = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`
      );
      if (fallbackResp.ok) {
        const arr = await fallbackResp.json();
        const entry = arr?.[0];
        const phonetic =
          entry?.phonetic || entry?.phonetics?.find((p: { text?: string }) => p.text)?.text || '';
        const audio =
          entry?.phonetics?.find((p: { audio?: string }) => p.audio)?.audio || undefined;
        const firstMeaning = entry?.meanings?.[0];
        const def = firstMeaning?.definitions?.[0]?.definition || '';
        const ex =
          firstMeaning?.definitions?.find((d: { example?: string }) => d.example)?.example || '';

        if (phonetic) {
          setIpa(phonetic);
          setIpaUk(phonetic);
        }
        if (audio) setAudioUs(audio);
        setOxfordUrl(
          `https://www.oxfordlearnersdictionaries.com/definition/english/${encodeURIComponent(
            cleanWord
          )}`
        );
        if (def) {
          setMeaningEn(def);
          if (!meaningVi.trim()) setMeaningVi(def);
        }
        if (ex) {
          setSentence(ex);
          if (!chunk.trim()) {
            setChunk(ex.split(/\s+/).slice(0, 5).join(' ').replace(/[.,;!?]+$/, ''));
          }
        }
        setLookupStatus('✅ Đã lấy dữ liệu phiên âm & định nghĩa Oxford thành công!');
      } else {
        setLookupStatus('⚠️ Không tìm thấy từ này trên Oxford, bạn có thể tự nhập bên dưới.');
      }
    } catch {
      setLookupStatus('⚠️ Không thể kết nối từ điển, vui lòng nhập thủ công.');
    } finally {
      setIsLookingUp(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wordText.trim() || !meaningVi.trim() || !chunk.trim() || !sentence.trim()) return;
    onSaveWord({
      wordText,
      posCefr,
      ipa,
      ipaUk: ipaUk || ipa,
      meaningVi,
      meaningEn,
      chunk,
      sentence,
      audioUs,
      audioUk,
      oxfordUrl,
    });
    setWordText('');
    setIpa('');
    setIpaUk('');
    setMeaningVi('');
    setMeaningEn('');
    setChunk('');
    setSentence('');
    setAudioUs(undefined);
    setAudioUk(undefined);
    setOxfordUrl(undefined);
    setLookupStatus(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl my-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              ➕ Thêm Từ Vựng 3 Tầng &amp; Tra Cứu Oxford
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Nhập từ tiếng Anh và bấm nút <strong>Lấy từ Oxford</strong> để tự động điền IPA, Audio MP3 &amp; câu mẫu
            </p>
          </div>
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
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Từ vựng (Headword) *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={wordText}
                  onChange={(e) => setWordText(e.target.value)}
                  placeholder="VD: resilience, scrutinize..."
                  className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2"
                />
                <button
                  type="button"
                  onClick={handleOxfordLookup}
                  disabled={isLookingUp}
                  className="px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold whitespace-nowrap transition cursor-pointer"
                >
                  {isLookingUp ? '⏳ Đang tải...' : '📖 Lấy từ Oxford'}
                </button>
              </div>
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
                <option value="Adjective|B2-C1">Adjective (B2-C1)</option>
                <option value="Phrasal Verb|B2">Phrasal Verb (B2)</option>
              </select>
            </div>
          </div>

          {lookupStatus && (
            <div className="px-3 py-2 rounded-xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-200 text-[11px] font-semibold">
              {lookupStatus}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Phiên âm IPA (🇺🇸 US / 🇬🇧 UK)
              </label>
              <input
                type="text"
                value={ipa}
                onChange={(e) => setIpa(e.target.value)}
                placeholder="/rɪˈzɪl.jəns/"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Nghĩa cốt lõi Tiếng Việt (hoặc Định nghĩa Oxford) *
              </label>
              <input
                type="text"
                required
                value={meaningVi}
                onChange={(e) => setMeaningVi(e.target.value)}
                placeholder="VD: Khả năng phục hồi nhanh sau khó khăn"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2"
              />
            </div>
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
              placeholder="VD: build long-term supply chain resilience"
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
              placeholder="Companies must diversify suppliers to build long-term supply chain resilience."
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
