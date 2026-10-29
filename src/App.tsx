import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  VocabItem,
  PhrasebookItem,
  ActiveTab,
  TrackFilter,
  ContextDomain,
  SrsStatus,
} from './types';
import { DEFAULT_WORDS, DEFAULT_PHRASEBOOK } from './data/vocabData';
import {
  filterVocabItems,
  computeSrsStats,
  applySm2Grade,
  createCustomWordEntry,
} from './utils/vocabLogic';
import { speakEnglishText } from './utils/speech';
import { VocabSidebar } from './components/VocabSidebar';
import { LearnThreeTiersTab } from './components/LearnThreeTiersTab';
import { MatrixTab } from './components/MatrixTab';
import { PracticeThreeStepsTab } from './components/PracticeThreeStepsTab';
import { PhrasebookTab } from './components/PhrasebookTab';
import { FlashcardModal, AddWordModal } from './components/Modals';
import { WinterNoelCapybara, SantaCapybaraSvg } from './components/WinterNoelCapybara';

const STORAGE_KEY_WORDS = 'lexiflow_pro_words_v2';
const STORAGE_KEY_PB = 'lexiflow_pro_pb_v2';
const STORAGE_KEY_THEME = 'lexiflow_pro_theme';

export default function App() {
  const [wordsData, setWordsData] = useState<VocabItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WORDS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].ipaUs) {
          return parsed;
        }
      }
    } catch {
      // ignore storage errors
    }
    return JSON.parse(JSON.stringify(DEFAULT_WORDS));
  });

  const [phrasebookData, setPhrasebookData] = useState<PhrasebookItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PB);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].sentenceEn) {
          return parsed;
        }
      }
    } catch {
      // ignore storage errors
    }
    return JSON.parse(JSON.stringify(DEFAULT_PHRASEBOOK));
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_THEME) === 'dark';
    } catch {
      return false;
    }
  });

  const [currentWordId, setCurrentWordId] = useState<string>('accommodate');
  const [contextFilter, setContextFilter] = useState<ContextDomain | 'all'>('all');
  const [trackFilter, setTrackFilter] = useState<TrackFilter>('all');
  const [srsFilter, setSrsFilter] = useState<'all' | SrsStatus>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<ActiveTab>('tab-tier');
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [sessionXp, setSessionXp] = useState<number>(0);
  const [step1CompletedMap, setStep1CompletedMap] = useState<Record<string, boolean>>({});

  const [isFlashcardOpen, setIsFlashcardOpen] = useState<boolean>(false);
  const [isAddWordOpen, setIsAddWordOpen] = useState<boolean>(false);
  const [noelEnabled, setNoelEnabled] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const sidebarRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sentenceInputRef = useRef<HTMLTextAreaElement>(null);

  // Sync dark mode class with documentElement
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem(STORAGE_KEY_THEME, 'dark');
      } catch {
        // ignore
      }
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem(STORAGE_KEY_THEME, 'light');
      } catch {
        // ignore
      }
    }
  }, [isDark]);

  // Persist wordsData
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WORDS, JSON.stringify(wordsData));
    } catch {
      // ignore
    }
  }, [wordsData]);

  // Persist phrasebookData
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PB, JSON.stringify(phrasebookData));
    } catch {
      // ignore
    }
  }, [phrasebookData]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2300);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const filteredWords = useMemo(
    () => filterVocabItems(wordsData, { srsFilter, searchQuery }),
    [wordsData, srsFilter, searchQuery]
  );

  const currentWord = useMemo(
    () => wordsData.find((w) => w.id === currentWordId) || wordsData[0],
    [wordsData, currentWordId]
  );

  const currentIndex = useMemo(
    () => Math.max(0, wordsData.findIndex((w) => w.id === currentWord.id)),
    [wordsData, currentWord]
  );

  const srsStats = useMemo(() => computeSrsStats(wordsData), [wordsData]);

  const handleNavigateWord = (direction: number) => {
    const idx = wordsData.findIndex((w) => w.id === currentWord.id);
    const nextIdx = (idx + direction + wordsData.length) % wordsData.length;
    setCurrentWordId(wordsData[nextIdx].id);
  };

  const handleSpeak = (text: string, lang: 'en-US' | 'en-GB' = 'en-US') => {
    speakEnglishText(text, lang, speechRate);
  };

  const handleCopy = (text: string, label = 'nội dung') => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Đã sao chép ${label} vào bộ nhớ tạm!`);
    });
  };

  // Global keyboard shortcuts matching 1111.html
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === '/') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSpeak(currentWord.word, 'en-US');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNavigateWord(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleNavigateWord(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentWord, speechRate, wordsData]);

  const handleGradeSrs = (
    wordId: string,
    status: SrsStatus,
    intervalText: string
  ) => {
    setWordsData((prev) =>
      prev.map((w) =>
        w.id === wordId ? applySm2Grade(w, status, intervalText) : w
      )
    );
    const target = wordsData.find((w) => w.id === wordId) || currentWord;
    const updated = applySm2Grade(target, status, intervalText);
    showToast(
      `Đã cập nhật SRS "${updated.word}": Ôn lại sau ${updated.intervalText} (EF: ${updated.ef})`
    );
  };

  const handleToggleSpeechRate = () => {
    const nextRate = speechRate === 1.0 ? 0.8 : 1.0;
    setSpeechRate(nextRate);
    showToast(
      `Tốc độ đọc: ${nextRate.toFixed(1)}x (${
        nextRate === 0.8 ? 'Chậm rõ âm' : 'Tự nhiên'
      })`
    );
  };

  const handleResetProgress = () => {
    const freshWords = JSON.parse(JSON.stringify(DEFAULT_WORDS));
    const freshPb = JSON.parse(JSON.stringify(DEFAULT_PHRASEBOOK));
    setWordsData(freshWords);
    setPhrasebookData(freshPb);
    setCurrentWordId('accommodate');
    setContextFilter('all');
    setTrackFilter('all');
    setSrsFilter('all');
    setSearchQuery('');
    showToast('Đã khôi phục dữ liệu mặc định!');
  };

  const handleToggleStarPhrase = (id: string) => {
    setPhrasebookData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextSaved = !item.saved;
          showToast(
            nextSaved
              ? 'Đã lưu vào Sổ tay cá nhân ⭐'
              : 'Đã bỏ lưu mẫu câu'
          );
          return { ...item, saved: nextSaved };
        }
        return item;
      })
    );
  };

  const handleSaveCustomWord = (input: {
    wordText: string;
    posCefr: string;
    ipa: string;
    meaningVi: string;
    chunk: string;
    sentence: string;
  }) => {
    const newWord = createCustomWordEntry(input);
    setWordsData((prev) => [newWord, ...prev]);
    setCurrentWordId(newWord.id);
    showToast(`Đã thêm từ "${newWord.word}" vào lộ trình 3 tầng!`);
  };

  const handleTrackSelectChange = (val: TrackFilter) => {
    setTrackFilter(val);
    setContextFilter(val);
    const names: Record<TrackFilter, string> = {
      all: 'Toàn diện 4 ngữ cảnh',
      toeic: 'Luyện thi TOEIC',
      ielts: 'Học thuật IELTS',
      workplace: 'Tiếng Anh Công sở',
      daily: 'Giao tiếp Đời thường',
    };
    showToast(`Đã chuyển sang lộ trình: ${names[val]}`);
  };

  const handleSrsDueBadgeClick = () => {
    setSrsFilter((prev) => {
      const next = prev === 'review' ? 'all' : 'review';
      showToast(
        next === 'review'
          ? 'Đang lọc các từ cần ôn tập SRS hôm nay'
          : 'Hiển thị tất cả từ vựng'
      );
      return next;
    });
  };

  const scrollMobileToSidebar = () => {
    sidebarRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 antialiased selection:bg-brand-600 selection:text-white min-h-screen flex flex-col transition-colors duration-200">
      {/* TOP ANNOUNCEMENT / KEYBOARD SHORTCUT BAR */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-500/20 text-brand-300 border border-brand-400/30">
              LexiFlow Pro v2.5
            </span>
            <span className="font-medium text-slate-300 hidden sm:inline">
              Phương pháp Học 3 Tầng:{' '}
              <strong className="text-white">
                Từ đơn → Cụm Collocation → Câu hoàn chỉnh
              </strong>{' '}
              (Tích hợp SRS SM-2 &amp; Lưu trữ tự động)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden lg:inline text-slate-400">
              Phím tắt:{' '}
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-200 border border-slate-700">
                ↑/↓
              </kbd>{' '}
              Chuyển từ •{' '}
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-200 border border-slate-700">
                S
              </kbd>{' '}
              Phát âm •{' '}
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-200 border border-slate-700">
                /
              </kbd>{' '}
              Tìm kiếm
            </span>
            <button
              type="button"
              onClick={() => {
                setNoelEnabled((prev) => {
                  const next = !prev;
                  showToast(
                    next
                      ? '🎄 Đã bật hiệu ứng Tuyết rơi & Đàn Capybara Noel!'
                      : 'Đã tắt hiệu ứng Mùa đông Noel'
                  );
                  return next;
                });
              }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer border ${
                noelEnabled
                  ? 'bg-red-500/25 hover:bg-red-500/35 text-red-200 border-red-400/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              🎅 {noelEnabled ? 'Noel Capy: Bật' : 'Noel Capy: Tắt'}
            </button>
            <button
              type="button"
              onClick={() => setIsFlashcardOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30 font-semibold transition cursor-pointer"
            >
              ⚡ Flashcard 3D Nhanh
            </button>
          </div>
        </div>
      </div>

      {/* WINTER NOEL SNOWFALL & SCROLL-LINKED CAPYBARA COMPANIONS */}
      <WinterNoelCapybara
        enabled={noelEnabled}
        currentWord={currentWord.word}
        onPetCapybara={(capyName, bonusXp, quoteEn) => {
          setSessionXp((prev) => prev + bonusXp);
          handleSpeak(quoteEn, 'en-US');
          showToast(`🎄 ${capyName} tặng bạn +${bonusXp} XP Noel!`);
        }}
      />

      {/* MAIN HEADER */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand + Mobile Word Drawer Trigger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollMobileToSidebar}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Danh sách từ vựng"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-indigo-700 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
              LF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                  LexiFlow
                </h1>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-700">
                  3-Tier SRS
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Học 1 từ dùng chuẩn trong TOEIC • IELTS • Công sở • Đời thường
              </p>
            </div>
          </div>

          {/* Right Controls: Track Selector + SRS Stats + Add Word + Dark Mode */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Learning Track Selector */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-2 hidden md:inline">
                Lộ trình:
              </span>
              <select
                value={trackFilter}
                onChange={(e) =>
                  handleTrackSelectChange(e.target.value as TrackFilter)
                }
                aria-label="Lộ trình học"
                className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs font-semibold rounded-lg px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
              >
                <option value="all">🎯 Toàn diện (4 Ngữ cảnh)</option>
                <option value="workplace">💼 Người đi làm bận rộn (Công sở)</option>
                <option value="toeic">📈 Luyện thi TOEIC (Business)</option>
                <option value="ielts">🎓 Luyện thi IELTS Academic</option>
                <option value="daily">🗣️ Giao tiếp Đời thường</option>
              </select>
            </div>

            {/* Progress Counters */}
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-semibold">
                <span>🔥 Streak:</span>
                <strong>7 ngày</strong>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-semibold">
                <span>Đã thuộc:</span>
                <strong>
                  {srsStats.masteredCount}/{srsStats.totalCount}
                </strong>
              </div>
              <button
                type="button"
                onClick={handleSrsDueBadgeClick}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-semibold hover:bg-rose-100 transition cursor-pointer"
                title="Bấm để lọc các từ cần ôn tập hôm nay"
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span>Cần ôn SRS ({srsStats.reviewCount})</span>
              </button>
            </div>

            {/* Add Custom Word Button */}
            <button
              type="button"
              onClick={() => setIsAddWordOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1 cursor-pointer"
            >
              <span>+ Thêm từ</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
              title="Chuyển giao diện Sáng / Tối"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="max-w-[1440px] mx-auto px-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/60">
          <nav
            className="flex items-center gap-1 overflow-x-auto py-1.5 no-scrollbar"
            aria-label="Tabs"
          >
            <button
              type="button"
              onClick={() => setActiveTab('tab-tier')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'tab-tier'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800'
              }`}
            >
              <span>1. Học 3 Tầng (Từ → Cụm → Câu)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tab-matrix')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'tab-matrix'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800'
              }`}
            >
              <span>2. Ma Trận "1 Từ – 4 Ngữ Cảnh"</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tab-practice')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'tab-practice'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800'
              }`}
            >
              <span>3. Phòng Luyện Tập 3 Bước &amp; AI Chấm Câu</span>
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-amber-400/20 text-amber-600 dark:text-amber-300 font-extrabold">
                Hot
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tab-phrasebook')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'tab-phrasebook'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800'
              }`}
            >
              <span>4. Sổ Tay Mẫu Câu Cấp Tốc</span>
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 py-5 flex flex-col lg:flex-row gap-6 items-start">
        {/* LEFT SIDEBAR: WORD EXPLORER */}
        <VocabSidebar
          sidebarRef={sidebarRef}
          searchInputRef={searchInputRef}
          totalWordsCount={wordsData.length}
          filteredWords={filteredWords}
          selectedWordId={currentWord.id}
          onSelectWord={(id) => setCurrentWordId(id)}
          searchQuery={searchQuery}
          onChangeSearchQuery={(q) => setSearchQuery(q)}
          contextFilter={contextFilter}
          onChangeContextFilter={(ctx) => {
            setContextFilter(ctx);
            setTrackFilter(ctx);
          }}
          trackFilter={trackFilter}
          srsFilter={srsFilter}
          onChangeSrsFilter={(s) => setSrsFilter(s)}
          speechRate={speechRate}
          onToggleSpeechRate={handleToggleSpeechRate}
          onResetProgress={handleResetProgress}
          onResetSearchAndFilters={() => {
            setSearchQuery('');
            setSrsFilter('all');
            setContextFilter('all');
            setTrackFilter('all');
          }}
          srsStats={srsStats}
        />

        {/* RIGHT CONTENT AREA */}
        <section className="flex-1 min-w-0 w-full space-y-5 pb-16">
          {/* Interactive Winter Noel Capybara Trio Banner */}
          {noelEnabled && (
            <div className="noel-scroll-card relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-700 via-rose-600 to-emerald-700 text-white p-4 sm:p-5 shadow-md border border-amber-300/40">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 relative z-10">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/20 text-amber-200 text-[11px] font-extrabold uppercase tracking-wider">
                    ❄️ Lễ Hội Mùa Đông • Đội Quân Capybara Noel Học Từ Vựng
                  </div>
                  <h2 className="text-base sm:text-lg font-extrabold flex items-center gap-2">
                    <span>🎄 Lướt cuộn trang cùng 3 chú Capybara mặc áo Noel!</span>
                    <span className="text-xs px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-black">
                      +{sessionXp} XP Noel
                    </span>
                  </h2>
                  <p className="text-xs text-red-100 max-w-2xl">
                    Cuộn chuột lên/xuống để xem <strong>Capy Santa</strong> trượt tuyết theo tiến độ học bên phải màn hình, hoặc bấm trực tiếp vào 3 chú Capybara bên dưới để nghe phát âm &amp; nhận thưởng XP!
                  </p>
                </div>

                {/* 3 Interactive Santa Capybaras */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setSessionXp((prev) => prev + 5);
                      handleSpeak(
                        `Ho ho ho! Let's master the word ${currentWord.word}!`,
                        'en-US'
                      );
                      showToast(
                        `🛷 Capy Santa Trượt Tuyết tặng bạn +5 XP cho từ "${currentWord.word}"!`
                      );
                    }}
                    className="group flex flex-col items-center p-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 transition cursor-pointer"
                  >
                    <div className="animate-capy-bob">
                      <SantaCapybaraSvg variant="sleigh" className="w-14 h-14 sm:w-16 sm:h-16" />
                    </div>
                    <span className="text-[11px] font-extrabold text-amber-200 mt-1">
                      🛷 Capy Trượt Tuyết
                    </span>
                    <span className="text-[10px] text-white/80">Bấm nhận +5 XP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSessionXp((prev) => prev + 5);
                      handleSpeak(currentWord.contexts.workplace.chunk, 'en-US');
                      showToast(
                        `🍊 Capy Noel Đội Quýt đọc cụm "${currentWord.contexts.workplace.chunk}" (+5 XP)!`
                      );
                    }}
                    className="group flex flex-col items-center p-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 transition cursor-pointer"
                  >
                    <div className="animate-capy-bob">
                      <SantaCapybaraSvg variant="onsen" className="w-14 h-14 sm:w-16 sm:h-16" />
                    </div>
                    <span className="text-[11px] font-extrabold text-amber-200 mt-1">
                      🍊 Capy Đội Quýt
                    </span>
                    <span className="text-[10px] text-white/80">Nghe Collocation</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSessionXp((prev) => prev + 5);
                      handleSpeak(currentWord.contexts.workplace.sentence, 'en-US');
                      showToast(
                        `🦌 Capy Tuần Lộc đọc câu mẫu Tầng 3 (+5 XP)!`
                      );
                    }}
                    className="group flex flex-col items-center p-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 transition cursor-pointer"
                  >
                    <div className="animate-capy-waddle">
                      <SantaCapybaraSvg variant="reindeer" className="w-14 h-14 sm:w-16 sm:h-16" />
                    </div>
                    <span className="text-[11px] font-extrabold text-amber-200 mt-1">
                      🦌 Capy Tuần Lộc
                    </span>
                    <span className="text-[10px] text-white/80">Nghe Câu Tầng 3</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'tab-tier' && (
            <LearnThreeTiersTab
              currentWord={currentWord}
              currentIndex={currentIndex}
              totalWords={wordsData.length}
              contextFilter={contextFilter}
              trackFilter={trackFilter}
              onPrevWord={() => handleNavigateWord(-1)}
              onNextWord={() => handleNavigateWord(1)}
              onSpeak={handleSpeak}
              onCopy={handleCopy}
              onGradeSrs={(status, intervalText) =>
                handleGradeSrs(currentWord.id, status, intervalText)
              }
              onGoToPractice={() => setActiveTab('tab-practice')}
            />
          )}

          {activeTab === 'tab-matrix' && (
            <MatrixTab
              words={wordsData}
              currentWord={currentWord}
              onSelectWord={(id) => setCurrentWordId(id)}
              onSpeak={handleSpeak}
            />
          )}

          {activeTab === 'tab-practice' && (
            <PracticeThreeStepsTab
              currentWord={currentWord}
              sentenceInputRef={sentenceInputRef}
              sessionXp={sessionXp}
              onAddSessionXp={(xp) => setSessionXp((prev) => prev + xp)}
              step1CompletedMap={step1CompletedMap}
              onMarkStep1Done={(wordId) =>
                setStep1CompletedMap((prev) => ({ ...prev, [wordId]: true }))
              }
              onMarkWordMastered={(wordId) =>
                handleGradeSrs(wordId, 'mastered', '7 ngày')
              }
              onSpeak={handleSpeak}
            />
          )}

          {activeTab === 'tab-phrasebook' && (
            <PhrasebookTab
              phrasebookItems={phrasebookData}
              onToggleStar={handleToggleStarPhrase}
              onSpeak={handleSpeak}
              onCopy={handleCopy}
            />
          )}
        </section>
      </main>

      {/* MODALS */}
      <FlashcardModal
        isOpen={isFlashcardOpen}
        words={wordsData}
        onSpeak={handleSpeak}
        onClose={() => setIsFlashcardOpen(false)}
        onGradeWord={handleGradeSrs}
      />

      <AddWordModal
        isOpen={isAddWordOpen}
        onClose={() => setIsAddWordOpen(false)}
        onSaveWord={handleSaveCustomWord}
      />

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2.5 rounded-xl shadow-lg text-xs font-bold flex items-center gap-2 transition-all">
          <span>✅</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
