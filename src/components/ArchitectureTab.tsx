import React from 'react';
import { VocabItem, PhrasebookItem } from '../types';
import { SQL_SCHEMA_TEXT } from '../data/vocabData';

interface ArchitectureTabProps {
  currentWord: VocabItem;
  allWords: VocabItem[];
  phrasebook: PhrasebookItem[];
  onToast: (msg: string) => void;
}

export const ArchitectureTab: React.FC<ArchitectureTabProps> = ({
  currentWord,
  allWords,
  phrasebook,
  onToast,
}) => {
  const jsonPayload = JSON.stringify(
    {
      status: 'success',
      api_version: 'v2.5',
      word_data: currentWord,
    },
    null,
    2
  );

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_TEXT).then(() => {
      onToast('Đã sao chép vào bộ nhớ tạm!');
    });
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonPayload).then(() => {
      onToast('Đã sao chép vào bộ nhớ tạm!');
    });
  };

  const handleExportJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(
        JSON.stringify(
          {
            exportedAt: new Date().toISOString(),
            totalWords: allWords.length,
            words: allWords,
            phrasebook,
          },
          null,
          2
        )
      );
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', 'lexiflow_vocabulary_backup.json');
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    onToast('Đã tải xuống file lexiflow_vocabulary_backup.json!');
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              🗄️ Thiết Kế Cơ Sở Dữ Liệu (Database Schema) &amp; JSON API
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cấu trúc bảng quan hệ PostgreSQL/Supabase chuẩn hóa cho mô hình Từ → Cụm → Câu → 4 Ngữ Cảnh &amp; thuật toán SRS SM-2.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleCopySql}
              className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-700 text-white text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
            >
              📋 Copy SQL
            </button>
            <button
              onClick={handleCopyJson}
              className="px-3 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition cursor-pointer"
            >
              📋 Copy JSON
            </button>
            <button
              onClick={handleExportJson}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition cursor-pointer"
            >
              ⬇️ Xuất dữ liệu (.json)
            </button>
          </div>
        </div>

        {/* Visual Entity Relationship Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="text-xs font-extrabold text-brand-700 dark:text-brand-400 font-mono mb-1">
              1. words (Tầng 1)
            </div>
            <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-0.5 font-mono">
              <li>🔑 id (UUID PK)</li>
              <li>• headword, pos, cefr_level</li>
              <li>• ipa_us, ipa_uk</li>
              <li>• core_meaning_vi / en</li>
              <li>• exam_trap_tip</li>
            </ul>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="text-xs font-extrabold text-indigo-700 dark:text-indigo-400 font-mono mb-1">
              2. collocations (Tầng 2)
            </div>
            <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-0.5 font-mono">
              <li>🔑 id (UUID PK)</li>
              <li>🔗 word_id (FK -&gt; words)</li>
              <li>• context_type (ENUM 4)</li>
              <li>• chunk_en, chunk_vi</li>
              <li>• formality_score (1-100)</li>
            </ul>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 font-mono mb-1">
              3. context_sentences (Tầng 3)
            </div>
            <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-0.5 font-mono">
              <li>🔑 id (UUID PK)</li>
              <li>🔗 collocation_id (FK)</li>
              <li>• sentence_en, sentence_vi</li>
              <li>• grammar_structure_note</li>
              <li>• register_nuance</li>
            </ul>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="text-xs font-extrabold text-amber-700 dark:text-amber-400 font-mono mb-1">
              4. user_srs_progress
            </div>
            <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-0.5 font-mono">
              <li>🔑 user_id + word_id</li>
              <li>• srs_stage (0..5)</li>
              <li>• ease_factor (FLOAT)</li>
              <li>• interval_days (INT)</li>
              <li>• next_review_at</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              PostgreSQL Schema (DDL)
            </span>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-xl text-[11px] font-mono overflow-x-auto leading-relaxed max-h-96 custom-scrollbar">
              {SQL_SCHEMA_TEXT}
            </pre>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Cấu trúc JSON API trả về 1 Từ vựng 3 Tầng (Live Data)
            </span>
            <pre className="bg-slate-950 text-emerald-300 p-4 rounded-xl text-[11px] font-mono overflow-x-auto leading-relaxed max-h-96 custom-scrollbar">
              {jsonPayload}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
