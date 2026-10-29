import React, { useState, useEffect } from 'react';
import { VocabItem, SentenceGradeResult } from '../types';
import {
  checkStep1Answer,
  checkStep2ChunkOrder,
  gradeSentenceLocally,
} from '../utils/vocabLogic';

interface PracticeThreeStepsTabProps {
  currentWord: VocabItem;
  sentenceInputRef: React.RefObject<HTMLTextAreaElement | null>;
  sessionXp: number;
  onAddSessionXp: (xp: number) => void;
  step1CompletedMap: Record<string, boolean>;
  onMarkStep1Done: (wordId: string) => void;
  onMarkWordMastered: (wordId: string) => void;
  onSpeak: (text: string, lang?: 'en-US' | 'en-GB') => void;
}

interface ChipItem {
  id: string;
  text: string;
  used: boolean;
}

export const PracticeThreeStepsTab: React.FC<PracticeThreeStepsTabProps> = ({
  currentWord: w,
  sentenceInputRef,
  sessionXp,
  onAddSessionXp,
  step1CompletedMap,
  onMarkStep1Done,
  onMarkWordMastered,
  onSpeak,
}) => {
  // Step 1 state
  const [step1Choice, setStep1Choice] = useState<string | null>(null);
  const [step1Correct, setStep1Correct] = useState<boolean | null>(null);

  // Step 2 state
  const [shuffledChips, setShuffledChips] = useState<ChipItem[]>([]);
  const [selectedChips, setSelectedChips] = useState<ChipItem[]>([]);
  const [step2Checked, setStep2Checked] = useState(false);
  const [step2Correct, setStep2Correct] = useState(false);
  const [step2AttemptText, setStep2AttemptText] = useState('');

  // Step 3 state
  const [userSentence, setUserSentence] = useState('');
  const [tooShortWarning, setTooShortWarning] = useState(false);
  const [gradeResult, setGradeResult] = useState<SentenceGradeResult | null>(null);

  const initStep2Chips = () => {
    const correctTokens = w.chunkPuzzle.targetChunk.split(' ');
    const allTokens = [...correctTokens, ...(w.chunkPuzzle.distractors || [])];
    const chips = allTokens
      .map((text, idx) => ({ id: `${w.id}-chip-${idx}-${text}`, text, used: false }))
      .sort((a, b) => a.text.localeCompare(b.text));
    setShuffledChips(chips);
    setSelectedChips([]);
    setStep2Checked(false);
    setStep2Correct(false);
  };

  useEffect(() => {
    setStep1Choice(null);
    setStep1Correct(null);
    initStep2Chips();
    setUserSentence('');
    setTooShortWarning(false);
    setGradeResult(null);
  }, [w.id]);

  const handleChooseStep1 = (opt: string) => {
    setStep1Choice(opt);
    const isCorrect = checkStep1Answer(w, opt);
    setStep1Correct(isCorrect);
    if (isCorrect) {
      if (!step1CompletedMap[w.id]) {
        onMarkStep1Done(w.id);
        onAddSessionXp(15);
      }
      onSpeak(w.quiz.answer, 'en-US');
    }
  };

  const handlePickChip = (chipId: string) => {
    const found = shuffledChips.find((c) => c.id === chipId);
    if (!found || found.used) return;
    setShuffledChips((prev) =>
      prev.map((c) => (c.id === chipId ? { ...c, used: true } : c))
    );
    setSelectedChips((prev) => [...prev, { ...found, used: true }]);
    setStep2Checked(false);
  };

  const handleRemoveChip = (removeIdx: number) => {
    const removed = selectedChips[removeIdx];
    if (!removed) return;
    setSelectedChips((prev) => prev.filter((_, idx) => idx !== removeIdx));
    setShuffledChips((prev) =>
      prev.map((c) => (c.id === removed.id ? { ...c, used: false } : c))
    );
    setStep2Checked(false);
  };

  const handleCheckStep2 = () => {
    const tokens = selectedChips.map((c) => c.text);
    const attempt = tokens.join(' ').trim();
    setStep2AttemptText(attempt);
    const isCorrect = checkStep2ChunkOrder(w.chunkPuzzle.targetChunk, tokens);
    setStep2Checked(true);
    setStep2Correct(isCorrect);
    if (isCorrect) {
      onAddSessionXp(20);
      onSpeak(w.chunkPuzzle.targetChunk, 'en-US');
    }
  };

  const handleInsertChunk = (chunk: string) => {
    setUserSentence((prev) => {
      const trimmed = prev.trim();
      return (trimmed ? `${trimmed} ` : '') + `${chunk} `;
    });
    sentenceInputRef.current?.focus();
  };

  const handleFillTemplate = () => {
    setUserSentence(`${w.sentenceStarter}${w.contexts.workplace.chunk}.`);
    sentenceInputRef.current?.focus();
  };

  const handleGradeSentence = () => {
    const res = gradeSentenceLocally(w, userSentence);
    if (!res) {
      setTooShortWarning(true);
      setGradeResult(null);
      return;
    }
    setTooShortWarning(false);
    setGradeResult(res);
    if (res.hasTargetWord) {
      onMarkWordMastered(w.id);
      onAddSessionXp(35);
    }
  };

  const wordCount = userSentence.trim() ? userSentence.trim().split(/\s+/).length : 0;
  const step1Done = !!step1CompletedMap[w.id];

  return (
    <section id="tab-practice" className="space-y-6">
      {/* Active Recall Header Banner */}
      <div className="bg-gradient-to-r from-brand-700 via-indigo-700 to-violet-700 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold mb-2">
            🧠 Phòng Luyện Tập Chủ Động 3 Bước · Active Recall Room
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold">
            Đang luyện tập:{' '}
            <span className="underline decoration-amber-300">{w.word}</span>
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 mt-1">
            Hoàn thành cả 3 bước (Nhận diện từ → Ghép cụm Collocation → Đặt câu thực tế) để
            chuyển từ sang trạng thái <strong>Đã thuộc</strong>.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs px-4 py-3 rounded-xl border border-white/15 shrink-0">
          <div className="text-center px-2">
            <div className="text-[11px] text-indigo-200 uppercase font-semibold">
              Điểm phiên này
            </div>
            <div className="text-2xl font-extrabold text-amber-300 tabular-nums">
              {sessionXp} XP
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSpeak(w.word, 'en-US')}
            className="px-3 py-2 rounded-xl bg-white text-brand-700 font-bold text-xs hover:bg-indigo-50 transition whitespace-nowrap"
          >
            🔊 Nghe từ
          </button>
        </div>
      </div>

      {/* STEP 1: MULTIPLE CHOICE RECOGNITION */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center">
              1
            </span>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
              Bước 1 · Nhận diện Từ trong Ngữ cảnh
            </h3>
          </div>
          <span
            className={
              step1Done
                ? 'text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                : 'text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }
          >
            {step1Done ? '✓ Đã hoàn thành' : 'Chọn đáp án đúng'}
          </span>
        </div>

        <p className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/70 dark:border-slate-700">
          {w.quiz.question}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {w.quiz.options.map((opt) => {
            const isSelected = step1Choice === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => handleChooseStep1(opt)}
                className={`p-3.5 rounded-xl border text-left font-bold text-sm transition flex items-center justify-between ${
                  isSelected
                    ? step1Correct
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200'
                      : 'border-rose-400 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 hover:border-brand-500 text-slate-800 dark:text-slate-200'
                }`}
              >
                <span>{opt}</span>
                <span className="text-xs text-slate-400">Chọn →</span>
              </button>
            );
          })}
        </div>

        {step1Correct !== null && (
          <div
            className={
              step1Correct
                ? 'p-4 rounded-xl text-xs sm:text-sm font-medium bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                : 'p-4 rounded-xl text-xs sm:text-sm font-medium bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200'
            }
          >
            {step1Correct ? (
              <>
                ✅ <strong>Chính xác (+15 XP)!</strong> {w.quiz.explanation}
              </>
            ) : (
              <>
                ❌ <strong>Chưa chính xác.</strong> Hãy chú ý ngữ cảnh câu. Gợi ý:{' '}
                {w.quiz.explanation}
              </>
            )}
          </div>
        )}
      </div>

      {/* STEP 2: COLLOCATION CHUNKING PUZZLE */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-violet-600 text-white font-extrabold text-xs flex items-center justify-center">
              2
            </span>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                Bước 2 · Ghép Cụm Collocation (Chunking)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Nghĩa mục tiêu: “{w.chunkPuzzle.meaningVi}”
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSpeak(w.chunkPuzzle.targetChunk, 'en-US')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition whitespace-nowrap"
            >
              🔊 Nghe cụm
            </button>
            <button
              type="button"
              onClick={initStep2Chips}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition whitespace-nowrap"
            >
              ↺ Xếp lại
            </button>
            <button
              type="button"
              onClick={handleCheckStep2}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-700 text-white transition shadow-xs whitespace-nowrap"
            >
              ✓ Kiểm tra Cụm
            </button>
          </div>
        </div>

        {/* Selected Answer Slots */}
        <div className="min-h-[56px] p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap items-center gap-2">
          {selectedChips.length === 0 ? (
            <span className="text-xs text-slate-400 select-none">
              Nhấn vào các mảnh từ bên dưới theo đúng thứ tự để tạo cụm Collocation chuẩn...
            </span>
          ) : (
            selectedChips.map((chip, idx) => (
              <button
                key={`${chip.id}-sel-${idx}`}
                type="button"
                onClick={() => handleRemoveChip(idx)}
                className="px-3 py-1.5 rounded-xl bg-violet-600 text-white font-bold text-xs shadow-xs hover:bg-rose-600 transition"
              >
                {chip.text} ✕
              </button>
            ))
          )}
        </div>

        {/* Available Shuffled Word Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {shuffledChips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              disabled={chip.used}
              onClick={() => handlePickChip(chip.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                chip.used
                  ? 'opacity-30 bg-slate-100 dark:bg-slate-800 border-slate-200 cursor-not-allowed'
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 hover:border-violet-500 text-slate-800 dark:text-slate-100 shadow-xs'
              }`}
            >
              {chip.text}
            </button>
          ))}
        </div>

        {step2Checked && (
          <div
            className={
              step2Correct
                ? 'p-4 rounded-xl text-xs sm:text-sm font-medium bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                : 'p-4 rounded-xl text-xs sm:text-sm font-medium bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200'
            }
          >
            {step2Correct ? (
              <>
                🎉 <strong>Ghép cụm hoàn hảo (+20 XP)!</strong> Cụm chuẩn:{' '}
                <em>“{w.chunkPuzzle.targetChunk}”</em> ({w.chunkPuzzle.meaningVi}).
              </>
            ) : (
              <>
                💡 <strong>Chưa khớp hoàn toàn.</strong> Cụm bạn ghép:{' '}
                <em>“{step2AttemptText || '(trống)'}”</em>. Đáp án chuẩn:{' '}
                <strong>“{w.chunkPuzzle.targetChunk}”</strong>.
              </>
            )}
          </div>
        )}
      </div>

      {/* STEP 3: SENTENCE WRITING & SMART AI RUBRIC GRADER */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center">
              3
            </span>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                Bước 3 · Đặt Câu & AI Chữa Chi Tiết
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Viết 1 câu hoàn chỉnh sử dụng từ/cụm từ đang học. Hệ thống sẽ chấm điểm
                Collocation, Ngữ pháp & gợi ý nâng cấp câu chuẩn C1.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleFillTemplate}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition whitespace-nowrap"
          >
            ✨ Điền khung câu gợi ý
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Cụm mục tiêu gợi ý:</span>
            <div className="flex flex-wrap gap-1.5">
              {Object.values(w.contexts).map((c) => (
                <button
                  key={c.chunk}
                  type="button"
                  onClick={() => handleInsertChunk(c.chunk)}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-950 text-brand-600 dark:text-brand-400 font-mono text-xs border border-slate-200 dark:border-slate-700 transition"
                >
                  + {c.chunk}
                </button>
              ))}
            </div>
          </div>

          <textarea
            ref={sentenceInputRef}
            rows={3}
            aria-label="Nhập câu tiếng Anh của bạn"
            value={userSentence}
            onChange={(e) => setUserSentence(e.target.value)}
            placeholder="Ví dụ: We need to accommodate the client's special request before Friday's launch..."
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
          />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-slate-400 font-mono tabular-nums">
              {wordCount} từ
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setUserSentence('');
                  setTooShortWarning(false);
                  setGradeResult(null);
                }}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Xóa trắng
              </button>
              <button
                type="button"
                onClick={handleGradeSentence}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-700 hover:to-violet-700 text-white shadow-md shadow-brand-500/20 transition whitespace-nowrap"
              >
                🤖 Chấm điểm & Nâng cấp câu
              </button>
            </div>
          </div>
        </div>

        {tooShortWarning && (
          <div className="rounded-2xl border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/40 dark:bg-indigo-950/20 p-5">
            <div className="text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400">
              ⚠️ Câu còn quá ngắn. Hãy viết một câu hoàn chỉnh (ít nhất 6–8 từ) có chứa từ{' '}
              <strong>"{w.word}"</strong> để hệ thống phân tích chi tiết nhé!
            </div>
          </div>
        )}

        {gradeResult && (
          <div className="rounded-2xl border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/40 dark:bg-indigo-950/20 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-indigo-200/70 dark:border-indigo-800">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-brand-600 text-white font-extrabold text-sm tabular-nums">
                  Điểm AI: {gradeResult.score} / 10
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {gradeResult.hasTargetWord
                    ? '✓ Đã dùng đúng từ mục tiêu (+35 XP · Chuyển sang Đã thuộc)'
                    : `⚠️ Chưa thấy xuất hiện từ gốc "${w.word}"`}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500 tabular-nums">
                Độ dài: {gradeResult.wordCount} từ
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="font-bold text-slate-700 dark:text-slate-200">
                  ✅ Điểm mạnh trong câu của bạn:
                </div>
                <p className="text-slate-600 dark:text-slate-400">{gradeResult.strengthNote}</p>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="font-bold text-slate-700 dark:text-slate-200">
                  🚀 Gợi ý nâng cấp lên C1 / Band 8.0:
                </div>
                <p className="text-slate-600 dark:text-slate-400">{gradeResult.upgradeTip}</p>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <div className="text-xs font-extrabold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                3 Phiên bản nâng cấp chuẩn bản xứ cho bạn tham khảo:
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                <div>
                  🏢 <strong>Chuẩn Email Công sở:</strong> “{w.contexts.workplace.sentence}”
                </div>
                <div>
                  🎓 <strong>Chuẩn IELTS Academic:</strong> “{w.contexts.ielts.sentence}”
                </div>
                <div>
                  💼 <strong>Chuẩn TOEIC Thương mại:</strong> “{w.contexts.toeic.sentence}”
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
