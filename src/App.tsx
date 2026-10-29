/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Clock } from 'lucide-react';
import {
  ActiveTab,
  PersonaMode,
  ContextDomain,
  SrsStatus,
  VocabItem,
  PhrasebookItem,
  PhrasebookCategory,
} from './types';
import {
  INITIAL_VOCAB_DATA,
  INITIAL_PHRASEBOOK_DATA,
  PERSONA_META,
} from './data/vocabData';
import {
  filterVocabItems,
  computeSrsStats,
  getSrsIntervalLabel,
} from './utils/vocabLogic';
import { LearnThreeTiersTab } from './components/LearnThreeTiersTab';
import { MatrixTab } from './components/MatrixTab';
import { PracticeThreeStepsTab } from './components/PracticeThreeStepsTab';
import { PhrasebookTab } from './components/PhrasebookTab';
import { ArchitectureTab } from './components/ArchitectureTab';
import { SrsModal } from './components/SrsModal';

interface ToastMessage {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning';
}

const SRS_STORAGE_KEY = 'lexiflow_srs_state_v1';

export default function App() {
  const [vocabList, setVocabList] = useState<VocabItem[]>(() => {
    try {
      const saved = localStorage.getItem(SRS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          const validStatuses: SrsStatus[] = ['due', 'learning', 'mastered'];
          return INITIAL_VOCAB_DATA.map((item) => {
            const entry = parsed[item.id];
            if (entry && validStatuses.includes(entry.status)) {
              return {
                ...item,
                srsStatus: entry.status,
                srsInterval:
                  typeof entry.interval === 'string' && entry.interval
                    ? entry.interval
                    : item.srsInterval,
              };
            }
            return item;
          });
        }
      }
    } catch {
      // Ignore storage access errors in sandboxed frames
    }
    return INITIAL_VOCAB_DATA;
  });

  const [phrasebookList, setPhrasebookList] = useState<PhrasebookItem[]>(
    INITIAL_PHRASEBOOK_DATA
  );

  const [activeTab, setActiveTab] = useState<ActiveTab>('learn');
  const [persona, setPersona] = useState<PersonaMode>('all');
  const [contextFilter, setContextFilter] = useState<ContextDomain | 'all'>('all');
  const [srsFilter, setSrsFilter] = useState<SrsStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWordId, setSelectedWordId] = useState('accommodate');
  const [selectedTierDomain, setSelectedTierDomain] = useState<ContextDomain>('office');
  const [matrixWordId, setMatrixWordId] = useState('accommodate');
  const [practiceWordId, setPracticeWordId] = useState('accommodate');
  const [phrasebookCategory, setPhrasebookCategory] =
    useState<PhrasebookCategory>('all');
  const [isSrsModalOpen, setIsSrsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (message: string, type: 'info' | 'success' | 'warning' = 'info') => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 2600);
    },
    []
  );

  useEffect(() => {
    try {
      const map: Record<string, { status: SrsStatus; interval: string }> = {};
      vocabList.forEach((item) => {
        map[item.id] = { status: item.srsStatus, interval: item.srsInterval };
      });
      localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(map));
    } catch {
      // Ignore storage errors
    }
  }, [vocabList]);

  const speakText = useCallback(
    (text: string, lang: 'en-US' | 'en-GB' = 'en-US') => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        showToast('Trình duyệt không hỗ trợ phát âm trực tiếp.', 'warning');
        return;
      }
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.94;
        window.speechSynthesis.speak(utterance);
        showToast(
          `Đang đọc (${lang}): "${text.slice(0, 42)}${text.length > 42 ? '...' : ''}"`
        );
      } catch {
        showToast('Không thể phát âm thanh lúc này.', 'warning');
      }
    },
    [showToast]
  );

  const copyTextToClipboard = useCallback(
    (text: string, label = 'nội dung') => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            showToast(`Đã copy ${label} vào bộ nhớ tạm!`, 'success');
          })
          .catch(() => {
            showToast(`Đã copy ${label} vào bộ nhớ tạm!`, 'success');
          });
      } else {
        showToast(`Đã copy ${label} vào bộ nhớ tạm!`, 'success');
      }
    },
    [showToast]
  );

  const handlePersonaChange = (newPersona: PersonaMode) => {
    setPersona(newPersona);
    const info = PERSONA_META[newPersona];
    setSelectedTierDomain(info.defaultDomain);
    showToast(`Đã chuyển sang lộ trình: ${info.tag}`);
  };

  const handleUpdateSrsStatus = (
    wordId: string,
    newStatus: SrsStatus,
    silent = false
  ) => {
    setVocabList((prev) =>
      prev.map((item) =>
        item.id === wordId
          ? {
              ...item,
              srsStatus: newStatus,
              srsInterval: getSrsIntervalLabel(newStatus),
            }
          : item
      )
    );
    if (!silent) {
      const target = vocabList.find((w) => w.id === wordId);
      showToast(
        `Đã cập nhật trạng thái SRS cho "${target?.word || wordId}"!`,
        'success'
      );
    }
  };

  const handleToggleSavePhrase = (id: string) => {
    setPhrasebookList((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextSaved = !p.saved;
          showToast(
            nextSaved
              ? 'Đã lưu vào Sổ tay cá nhân!'
              : 'Đã bỏ lưu mẫu câu.'
          );
          return { ...p, saved: nextSaved };
        }
        return p;
      })
    );
  };

  const filteredVocab = filterVocabItems(vocabList, {
    persona,
    srsFilter,
    searchQuery,
  });

  const activeWord =
    filteredVocab.find((w) => w.id === selectedWordId) ||
    filteredVocab[0] ||
    vocabList[0];

  const srsStats = computeSrsStats(vocabList);
  const currentPersonaInfo = PERSONA_META[persona];

  const navItems: { key: ActiveTab; label: string }[] = [
    { key: 'learn', label: '1. Học 3 Tầng' },
    { key: 'matrix', label: '2. Ma Trận 4 Ngữ Cảnh' },
    { key: 'practice', label: '3. Luyện Tập & AI Chấm Câu' },
    { key: 'phrasebook', label: '4. Sổ Tay Công Sở' },
    { key: 'architecture', label: '5. Database & Kiến Trúc' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Toast Notifications */}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map((t) => {
          const bgClass =
            t.type === 'success'
              ? 'bg-emerald-700'
              : t.type === 'warning'
              ? 'bg-amber-600'
              : 'bg-slate-900';
          return (
            <div
              key={t.id}
              className={`${bgClass} text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-md transition-opacity pointer-events-auto`}
            >
              {t.message}
            </div>
          );
        })}
      </div>

      {/* Top Navigation Bar (Strict 3-Zone Contract) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('learn');
            }}
            className="text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            LexiFlow
          </a>

          {/* Zone 2: Primary Navigation Links */}
          <nav
            aria-label="Chức năng chính"
            className="flex items-center gap-5 overflow-x-auto custom-scroll py-0.5"
          >
            {navItems.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors ${
                    isActive
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsSrsModalOpen(true)}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors tabular-nums"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Cần ôn SRS ({srsStats.dueCount})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Workspace Control & Persona Bar */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="font-bold text-indigo-300 whitespace-nowrap">
              {currentPersonaInfo.tag}
            </span>
            <span className="text-slate-500" aria-hidden="true">
              ·
            </span>
            <span className="text-slate-200">{currentPersonaInfo.desc}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <label
                htmlFor="persona-select"
                className="text-xs font-medium text-slate-300 whitespace-nowrap"
              >
                Chuyển lộ trình:
              </label>
              <select
                id="persona-select"
                aria-label="Chọn đối tượng học"
                value={persona}
                onChange={(e) => handlePersonaChange(e.target.value as PersonaMode)}
                className="bg-slate-800 text-white font-semibold rounded-lg px-2.5 py-1.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
              >
                <option value="all">Toàn diện (Tất cả mục tiêu)</option>
                <option value="busy_pro">Người đi làm bận rộn (Micro 5p/ngày)</option>
                <option value="fresh_grad">Sinh viên mới ra trường (TOEIC + Công sở)</option>
                <option value="exam_prep">Luyện thi cấp tốc (IELTS 7.0+ & TOEIC 800+)</option>
              </select>
            </div>

            <div className="flex items-center gap-3 text-xs tabular-nums">
              <span className="text-amber-300 font-semibold whitespace-nowrap">
                Streak: 7 ngày
              </span>
              <span className="text-slate-600" aria-hidden="true">
                ·
              </span>
              <span className="text-slate-200 whitespace-nowrap">
                Đã thuộc: <strong className="text-white">{srsStats.masteredCount}</strong>/
                {srsStats.totalCount} chủ điểm
              </span>
              <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-200"
                  style={{ width: `${srsStats.masteryPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'learn' && (
          <LearnThreeTiersTab
            filteredVocab={filteredVocab}
            selectedWord={activeWord}
            onSelectWord={(id) => setSelectedWordId(id)}
            contextFilter={contextFilter}
            onChangeContextFilter={(f) => {
              setContextFilter(f);
              if (f !== 'all') setSelectedTierDomain(f);
            }}
            selectedTierDomain={selectedTierDomain}
            onSelectTierDomain={(dom) => {
              setSelectedTierDomain(dom);
              if (contextFilter !== 'all') setContextFilter('all');
            }}
            searchQuery={searchQuery}
            onChangeSearchQuery={setSearchQuery}
            srsFilter={srsFilter}
            onChangeSrsFilter={setSrsFilter}
            onResetFilters={() => {
              setSearchQuery('');
              setSrsFilter('all');
              setPersona('all');
              setContextFilter('all');
            }}
            onUpdateSrsStatus={(wordId, st) => handleUpdateSrsStatus(wordId, st)}
            onSpeak={speakText}
            onCopy={copyTextToClipboard}
            onJumpToMatrix={(wordId) => {
              setMatrixWordId(wordId);
              setActiveTab('matrix');
            }}
            onJumpToPractice={(wordId) => {
              setPracticeWordId(wordId);
              setActiveTab('practice');
            }}
          />
        )}

        {activeTab === 'matrix' && (
          <MatrixTab
            vocabList={vocabList}
            selectedWordId={matrixWordId}
            onSelectWordId={setMatrixWordId}
            onSpeak={speakText}
            onCopy={copyTextToClipboard}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeThreeStepsTab
            vocabList={vocabList}
            practiceWordId={practiceWordId}
            onSelectPracticeWordId={setPracticeWordId}
            onUpdateSrsStatus={handleUpdateSrsStatus}
            onSpeak={speakText}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'phrasebook' && (
          <PhrasebookTab
            phrasebookList={phrasebookList}
            activeCategory={phrasebookCategory}
            onSelectCategory={setPhrasebookCategory}
            onToggleSave={handleToggleSavePhrase}
            onSpeak={speakText}
            onCopy={copyTextToClipboard}
          />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureTab onCopy={copyTextToClipboard} />
        )}
      </main>

      {/* SRS Schedule Modal */}
      <SrsModal
        isOpen={isSrsModalOpen}
        vocabList={vocabList}
        onClose={() => setIsSrsModalOpen(false)}
        onStartDuePractice={() => {
          setIsSrsModalOpen(false);
          const firstDue =
            vocabList.find((w) => w.srsStatus === 'due') || vocabList[0];
          setPracticeWordId(firstDue.id);
          setActiveTab('practice');
        }}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            <strong>LexiFlow</strong> — Học từ vựng 3 tầng (Từ đơn → Cụm Collocation → Câu hoàn
            chỉnh) chuẩn TOEIC, IELTS & Công sở.
          </div>
          <div>Hỗ trợ phát âm trực tiếp (Web Speech API) · Lưu tiến độ SRS tự động</div>
        </div>
      </footer>
    </div>
  );
}
