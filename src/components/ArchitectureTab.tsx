import React from 'react';
import { Copy, Database, Code2 } from 'lucide-react';
import { POSTGRESQL_SCHEMA_CODE, JSON_PAYLOAD_EXAMPLE } from '../data/vocabData';

interface ArchitectureTabProps {
  onCopy: (text: string, label: string) => void;
}

export const ArchitectureTab: React.FC<ArchitectureTabProps> = ({ onCopy }) => {
  const schemaEntities = [
    {
      step: 'Bảng 1 · Core Entity',
      title: 'words (Từ gốc)',
      desc: 'Lưu từ vựng nguyên bản, phiên âm IPA, file audio UK/US, từ loại (POS), mức độ CEFR (A2–C2) và nghĩa cốt lõi.',
      fields: 'id, lemma, pos, ipa_us, ipa_uk, core_meaning_vi, cefr_level',
      accentClass: 'text-indigo-600',
    },
    {
      step: 'Bảng 2 · 1-N với words',
      title: 'word_chunks (Cụm từ)',
      desc: 'Lưu các Collocations, Phrasal Verbs, Idioms gắn với từ gốc kèm cấu trúc ngữ pháp và tần suất xuất hiện.',
      fields: 'id, word_id, chunk_text, pattern, meaning_vi, register_tag',
      accentClass: 'text-purple-600',
    },
    {
      step: 'Bảng 3 · 1-N với chunks',
      title: 'context_sentences (Câu)',
      desc: 'Lưu câu hoàn chỉnh phân loại theo 4 luồng (toeic, ielts, office, daily), bản dịch, highlight vị trí cụm và ghi chú band/tone.',
      fields: 'id, chunk_id, domain_type, sentence_en, sentence_vi, usage_note',
      accentClass: 'text-emerald-600',
    },
    {
      step: 'Bảng 4 · Học tập & AI',
      title: 'user_srs_progress',
      desc: 'Theo dõi tiến độ nhớ của từng user ở cấp độ Cụm/Câu (thuật toán SM-2: interval_days, easiness_factor, next_review_at).',
      fields: 'user_id, chunk_id, step_completed, interval_days, next_review_at',
      accentClass: 'text-amber-600',
    },
  ];

  return (
    <section aria-label="Thiết Kế Cơ Sở Dữ Liệu và Kiến Trúc Hệ Thống" className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200">
        <span className="text-xs font-bold text-indigo-600">
          Tài liệu kỹ thuật dành cho Developer / Product Owner
        </span>
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
          Thiết Kế Cơ Sở Dữ Liệu (Database Schema) & Luồng Hệ Thống
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
          Cấu trúc bảng quan hệ chuẩn hóa giúp quản lý 1 từ gốc liên kết với nhiều Cụm từ
          (Chunks/Collocations) và biến thiên theo 4 ngữ cảnh (TOEIC, IELTS, Công sở, Đời thường),
          kèm thuật toán Spaced Repetition (SM-2).
        </p>
      </div>

      {/* Visual Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {schemaEntities.map((entity) => (
          <div
            key={entity.title}
            className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between"
          >
            <div>
              <div className={`text-xs font-bold ${entity.accentClass}`}>{entity.step}</div>
              <h3 className="text-base font-extrabold text-slate-900 mt-1">{entity.title}</h3>
              <p className="text-xs text-slate-600 mt-1">{entity.desc}</p>
            </div>
            <div className="mt-3 text-[11px] font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-slate-700">
              {entity.fields}
            </div>
          </div>
        ))}
      </div>

      {/* SQL Schema & JSON API Payload */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden border border-slate-800">
          <div className="px-4 py-3 bg-slate-800/90 flex items-center justify-between border-b border-slate-700">
            <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              PostgreSQL Schema (Chuẩn hóa 3 Tầng + SRS)
            </span>
            <button
              type="button"
              onClick={() => onCopy(POSTGRESQL_SCHEMA_CODE, 'mã SQL Schema')}
              className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
            >
              <Copy className="w-3 h-3" />
              Copy SQL
            </button>
          </div>
          <pre className="p-4 text-xs font-mono overflow-x-auto custom-scroll leading-relaxed text-slate-200">
            {POSTGRESQL_SCHEMA_CODE}
          </pre>
        </div>

        <div className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden border border-slate-800">
          <div className="px-4 py-3 bg-slate-800/90 flex items-center justify-between border-b border-slate-700">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              Cấu trúc JSON trả về cho Giao diện Học 3 Tầng
            </span>
            <button
              type="button"
              onClick={() => onCopy(JSON_PAYLOAD_EXAMPLE, 'cấu trúc JSON')}
              className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
            >
              <Copy className="w-3 h-3" />
              Copy JSON
            </button>
          </div>
          <pre className="p-4 text-xs font-mono overflow-x-auto custom-scroll leading-relaxed text-slate-200">
            {JSON_PAYLOAD_EXAMPLE}
          </pre>
        </div>
      </div>
    </section>
  );
};
