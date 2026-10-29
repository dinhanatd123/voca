import React, { useState, useEffect } from 'react';
import { Volume2, ArrowRight, RotateCcw, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { VocabItem, ContextDomain, SentenceEvaluationResult, SrsStatus } from '../types';
import {
  checkStep1Answer,
  checkStep2ChunkOrder,
  evaluateSentenceLocally,
  getContextModeLabel,
} from '../utils/vocabLogic';

interface PracticeThreeStepsTabProps {
  vocabList: VocabItem[];
  practiceWordId: string;
  onSelectPracticeWordId: (wordId: string) => void;
  onUpdateSrsStatus: (wordId: string, status: SrsStatus, silent?: boolean) => void;
  onSpeak: (text: string, lang?: 'en-US' | 'en-GB') => void;
  onShowToast: (msg: string, type?: 'info' | 'success' | 'warning') => void;
}

interface WordTile {
  id: string;
  text: string;
}

export const PracticeThreeStepsTab: React.FC<PracticeThreeStepsTabProps> = ({
  vocabList,
  practiceWordId,
  onSelectPracticeWordId,
  onUpdateSrsStatus,
  onSpeak,
  onShowToast,
}) => {
  const item = vocabList.find((w) => w.id === practiceWordId) || vocabList[0];

  // Step 1 state
  const [step1Done, setStep1Done] = useState(false);
  const [step1SelectedChoice, setStep1SelectedChoice] = useState<string | null>(null);
  const [step1IsCorrect, setStep1IsCorrect] = useState<boolean | null>(null);

  // Step 2 state
  const [step2Done, setStep2Done] = useState(false);
  const [availableWords, setAvailableWords] = useState<WordTile[]>([]);
  const [selectedWords, setSelectedWords] = useState<WordTile[]>([]);
  const [step2Checked, setStep2Checked] = useState(false);
  const [step2IsCorrect, setStep2IsCorrect] = useState(false);

  // Step 3 state
  const [step3Done, setStep3Done] = useState(false);
  const [contextMode, setContextMode] = useState<ContextDomain>('office');
  const [userSentence, setUserSentence] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<SentenceEvaluationResult | null>(null);

  // Reset all 3 steps whenever the active word changes
  useEffect(() => {
    setStep1Done(false);
    setStep1SelectedChoice(null);
    setStep1IsCorrect(null);

    setStep2Done(false);
    setSelectedWords([]);
    setStep2Checked(false);
    setStep2IsCorrect(false);

    const distractors = item.practice.step2Distractors || ['with', 'for'];
    const combined = [...item.practice.step2Words, ...distractors].map((w, idx) => ({
      id: `${item.id}_tile_${idx}_${w}`,
      text: w,
    }));
    // Deterministic shuffle based on index parity so tiles aren't in trivial order
    const shuffled = [...combined].sort((a, b) => a.text.localeCompare(b.text));
    setAvailableWords(shuffled);

    setStep3Done(false);
    setUserSentence('');
    setEvalResult(null);
  }, [item.id]);

  const handleNextWord = () => {
    const idx = vocabList.findIndex((w) => w.id === item.id);
    const nextIdx = (idx + 1) % vocabList.length;
    onSelectPracticeWordId(vocabList[nextIdx].id);
  };

  const handleStep1Choice = (choice: string) => {
    setStep1SelectedChoice(choice);
    const correct = checkStep1Answer(item, choice);
    setStep1IsCorrect(correct);
    if (correct) {
      setStep1Done(true);
      onSpeak(item.word.split('/')[0].trim(), 'en-US');
    }
  };

  const handlePickTile = (tile: WordTile) => {
    if (selectedWords.some((t) => t.id === tile.id)) return;
    setSelectedWords((prev) => [...prev, tile]);
    setStep2Checked(false);
  };

  const handleRemoveTile = (tileId: string) => {
    setSelectedWords((prev) => prev.filter((t) => t.id !== tileId));
    setStep2Checked(false);
  };

  const handleCheckStep2 = () => {
    const isCorrect = checkStep2ChunkOrder(
      item.practice.step2Words,
      selectedWords.map((t) => t.text)
    );
    setStep2Checked(true);
    setStep2IsCorrect(isCorrect);
    if (isCorrect) {
      setStep2Done(true);
      onSpeak(item.practice.step2Words.join(' '), 'en-US');
    }
  };

  const handleEvaluateStep3 = async () => {
    const trimmed = userSentence.trim();
    if (!trimmed) {
      onShowToast(
        "Hãy nhập một câu tiếng Anh hoặc bấm 'Điền khung câu gợi ý' trước nhé!",
        'warning'
      );
      return;
    }

    setIsEvaluating(true);
    const localEval = evaluateSentenceLocally(item, trimmed, contextMode);

    try {
      const response = await fetch('/api/evaluate-sentence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: item.word,
          targetChunk: item.practice.step3TargetChunk,
          userSentence: trimmed,
          contextMode,
          modeLabel: getContextModeLabel(contextMode),
          defaultUpgradedSentence: localEval.upgradedSentence,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (!data.fallback && typeof data.score === 'number') {
          setEvalResult({
            ...localEval,
            score: data.score,
            chunkFeedback: data.chunkFeedback || localEval.chunkFeedback,
            structureFeedback: data.structureFeedback || localEval.structureFeedback,
            upgradedSentence: data.upgradedSentence || localEval.upgradedSentence,
            source: 'ai',
          });
        } else {
          setEvalResult(localEval);
        }
      } else {
        setEvalResult(localEval);
      }
    } catch {
      setEvalResult(localEval);
    } finally {
      setIsEvaluating(false);
      setStep3Done(true);
      if (localEval.hasWord) {
        onUpdateSrsStatus(item.id, 'mastered', true);
      }
    }
  };

  return (
    <section aria-label="Phòng Luyện Tập 3 Bước và AI Chấm Câu" className="space-y-6">
      {/* Top Selector for Practice Word */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700">
            Quy trình ghi nhớ chủ động 3 bước (Active Recall & AI Coach)
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
            Phòng Luyện Tập Chủ Động: Từ → Cụm → Tự Đặt Câu
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Hoàn thành cả 3 bước để mở khóa mức độ nhớ sâu và cập nhật chu kỳ ôn tập ngắt quãng
            (SRS).
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <select
            aria-label="Chọn từ muốn luyện tập"
            value={item.id}
            onChange={(e) => onSelectPracticeWordId(e.target.value)}
            className="bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {vocabList.map((w) => (
              <option key={w.id} value={w.id}>
                Luyện từ: {w.word}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleNextWord}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg whitespace-nowrap shrink-0 transition-colors flex items-center gap-1"
          >
            Từ tiếp theo
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3 Steps Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        {/* Step 1: Word Recognition */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-blue-700">Bước 1 · Nhận diện Từ</span>
              <span
                className={`text-xs font-semibold ${
                  step1Done ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                {step1Done ? '✓ Hoàn thành' : 'Chưa hoàn thành'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-2.5">
              Nghe phát âm hoặc đọc định nghĩa sau và chọn đúng từ gốc:
            </p>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-500">
                  Định nghĩa & Ngữ cảnh:
                </span>
                <button
                  type="button"
                  onClick={() => onSpeak(item.word.split('/')[0].trim(), 'en-US')}
                  className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1 whitespace-nowrap"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Nghe từ
                </button>
              </div>
              <p className="text-sm font-semibold text-slate-800">
                {item.practice.step1Question}
              </p>
            </div>
            <div className="space-y-2">
              {item.practice.step1Choices.map((choice) => {
                const isSelected = step1SelectedChoice === choice;
                return (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => handleStep1Choice(choice)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm font-semibold transition-colors flex items-center justify-between ${
                      isSelected
                        ? step1IsCorrect
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                          : 'bg-rose-50 border-rose-400 text-rose-900'
                        : 'border-slate-200 hover:border-indigo-400 text-slate-800'
                    }`}
                  >
                    <span>{choice}</span>
                    <span className="text-slate-400 text-xs">Chọn</span>
                  </button>
                );
              })}
            </div>
          </div>

          {step1IsCorrect !== null && (
            <div
              className={`mt-4 text-xs p-3 rounded-lg font-medium border flex items-start gap-2 ${
                step1IsCorrect
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border-rose-200'
              }`}
            >
              {step1IsCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Chính xác!</strong> "{item.word}" ({item.ipa}) mang nghĩa:{' '}
                    {item.coreMeaning}
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>Chưa đúng. Hãy thử lại hoặc nghe gợi ý phát âm nhé!</div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Step 2: Chunking Builder */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-purple-700">
                Bước 2 · Ghép Cụm (Chunking)
              </span>
              <span
                className={`text-xs font-semibold ${
                  step2Done ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                {step2Done ? '✓ Hoàn thành' : 'Chưa hoàn thành'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-2.5">
              Bấm vào các mảnh từ bên dưới theo đúng thứ tự để tạo thành Collocation chuẩn:
            </p>
            <div className="p-3 rounded-lg bg-purple-50/60 border border-purple-100 mb-3">
              <span className="text-xs text-purple-700 font-medium">Nghĩa cụm cần ghép:</span>
              <p className="text-sm font-bold text-purple-950 mt-0.5">
                {item.practice.step2TargetMeaning}
              </p>
            </div>

            {/* Selected words slot */}
            <div
              aria-label="Khu vực cụm từ đã ghép"
              className="min-h-[52px] p-2.5 rounded-lg bg-slate-50 border border-dashed border-slate-300 flex flex-wrap items-center gap-1.5 mb-3"
            >
              {selectedWords.length === 0 ? (
                <span className="text-xs text-slate-400">
                  Bấm các từ bên dưới để xếp vào đây...
                </span>
              ) : (
                selectedWords.map((wObj) => (
                  <button
                    key={wObj.id}
                    type="button"
                    onClick={() => handleRemoveTile(wObj.id)}
                    className="px-2.5 py-1 rounded-md bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-colors"
                  >
                    {wObj.text} ✕
                  </button>
                ))
              )}
            </div>

            {/* Word bank */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {availableWords.map((wObj) => {
                const used = selectedWords.some((s) => s.id === wObj.id);
                return (
                  <button
                    key={wObj.id}
                    type="button"
                    disabled={used}
                    onClick={() => handlePickTile(wObj)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      used
                        ? 'bg-slate-100 text-slate-300 border-slate-100 cursor-not-allowed'
                        : 'bg-white text-slate-800 border-slate-300 hover:border-purple-500 hover:bg-purple-50'
                    }`}
                  >
                    {wObj.text}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedWords([]);
                  setStep2Checked(false);
                }}
                className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1 whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Xếp lại
              </button>
              <button
                type="button"
                onClick={handleCheckStep2}
                className="flex-1 px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-colors whitespace-nowrap"
              >
                Kiểm tra Cụm
              </button>
            </div>

            {step2Checked && (
              <div
                className={`mt-3 text-xs p-3 rounded-lg font-medium border ${
                  step2IsCorrect
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : 'bg-rose-50 text-rose-900 border-rose-200'
                }`}
              >
                {step2IsCorrect ? (
                  <>
                    ✓ <strong>Chuẩn xác!</strong> Cụm Collocation chuẩn là:{' '}
                    <strong>"{item.practice.step2Words.join(' ')}"</strong>
                  </>
                ) : (
                  <>
                    ✕ Thứ tự chưa khớp. Gợi ý cụm đúng gồm {item.practice.step2Words.length} từ: "
                    {item.practice.step2Words[0]} ...{' '}
                    {item.practice.step2Words[item.practice.step2Words.length - 1]}"
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Contextual Sentence & AI Coach */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-emerald-700">
                Bước 3 · Đặt Câu & AI Chữa
              </span>
              <span
                className={`text-xs font-semibold ${
                  step3Done ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                {step3Done ? '✓ Đã chấm câu' : 'Chưa hoàn thành'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-2">
              Viết 1 câu hoàn chỉnh sử dụng cụm{' '}
              <strong className="text-indigo-700">"{item.practice.step3TargetChunk}"</strong> (hoặc
              bấm "Điền khung câu gợi ý"):
            </p>

            <div className="mb-2 flex items-center justify-between gap-2">
              <label htmlFor="step3-context-mode" className="text-xs font-medium text-slate-500">
                Ngữ cảnh mục tiêu:
              </label>
              <select
                id="step3-context-mode"
                value={contextMode}
                onChange={(e) => setContextMode(e.target.value as ContextDomain)}
                className="text-xs font-semibold bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none"
              >
                <option value="office">Email / Họp Công sở</option>
                <option value="ielts">IELTS Writing / Speaking</option>
                <option value="toeic">TOEIC Business</option>
                <option value="daily">Giao tiếp hằng ngày</option>
              </select>
            </div>

            <textarea
              rows={3}
              aria-label="Nhập câu tiếng Anh của bạn"
              value={userSentence}
              onChange={(e) => setUserSentence(e.target.value)}
              placeholder="Gõ câu tiếng Anh của bạn vào đây..."
              className="w-full p-3 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2"
            />

            <div className="flex items-center justify-between gap-2 mb-3">
              <button
                type="button"
                onClick={() => setUserSentence(item.practice.step3Template)}
                className="text-xs font-semibold text-indigo-600 hover:underline whitespace-nowrap"
              >
                Điền khung câu gợi ý
              </button>
              <button
                type="button"
                disabled={isEvaluating}
                onClick={handleEvaluateStep3}
                className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isEvaluating ? 'Đang chấm câu...' : 'Chấm điểm & Nâng cấp câu'}
              </button>
            </div>
          </div>

          {evalResult && (
            <div className="text-xs p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-extrabold text-slate-900">
                  Nhận xét từ AI Sentence Coach
                </span>
                <span
                  className={`font-bold tabular-nums ${
                    evalResult.score >= 85 ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  Điểm ngữ cảnh: {evalResult.score}/100
                </span>
              </div>
              <ul className="space-y-1 text-slate-700">
                <li>
                  • <strong>Kiểm tra Cụm từ (Chunk):</strong>{' '}
                  <span
                    className={
                      evalResult.hasChunk
                        ? 'text-emerald-700 font-semibold'
                        : evalResult.hasWord
                        ? 'text-amber-700 font-semibold'
                        : 'text-rose-700 font-semibold'
                    }
                  >
                    {evalResult.chunkFeedback}
                  </span>
                </li>
                <li>
                  • <strong>Độ dài & Cấu trúc:</strong> {evalResult.structureFeedback}
                </li>
              </ul>
              <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-950">
                <div className="text-[11px] font-bold text-indigo-700">
                  Gợi ý nâng cấp chuẩn {evalResult.modeLabel}:
                </div>
                <p className="font-semibold mt-0.5">"{evalResult.upgradedSentence}"</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
