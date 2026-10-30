import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use('/public', express.static(path.join(__dirname, 'public')));

  // Live lookup endpoint from Oxford Learner's Dictionaries
  app.get('/api/oxford-lookup', async (req, res) => {
    const rawWord = String(req.query.word || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-\s]/g, '')
      .replace(/\s+/g, '-');

    if (!rawWord) {
      res.status(400).json({ error: 'Vui lòng nhập từ vựng tiếng Anh cần tra cứu.' });
      return;
    }

    const oxfordUrl = `https://www.oxfordlearnersdictionaries.com/definition/english/${encodeURIComponent(
      rawWord
    )}`;

    try {
      const response = await fetch(oxfordUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml',
        },
      });

      if (!response.ok) {
        res.status(404).json({
          error: `Không tìm thấy từ "${rawWord}" trên Oxford Learner's Dictionaries.`,
        });
        return;
      }

      const html = await response.text();
      const phons = [...html.matchAll(/<span class="phon">([^<]+)<\/span>/g)].map(
        (m) => m[1].trim()
      );
      const mp3s = [...html.matchAll(/data-src-mp3="([^"]+)"/g)].map((m) =>
        m[1].trim()
      );
      const defs = [
        ...html.matchAll(/<span class="def"[^>]*>([\s\S]*?)<\/span>/g),
      ]
        .map((m) => m[1].replace(/<[^>]+>/g, '').trim())
        .filter(Boolean);
      const examples = [
        ...html.matchAll(/<span class="x"[^>]*>([\s\S]*?)<\/span>/g),
      ]
        .map((m) => m[1].replace(/<[^>]+>/g, '').trim())
        .filter(Boolean);
      const posMatch = html.match(/<span class="pos"[^>]*>([^<]+)<\/span>/i);
      const cefrMatch = html.match(
        /ox3000-([abc][12])|ox5000-([abc][12])|cefr="([abc][12])"/i
      );

      const ipaUk = phons[0] || '/ˈwɜːd/';
      const ipaUs = phons[1] || ipaUk;
      const audioUk = mp3s.find((u) => u.includes('_gb_')) || '';
      const audioUs = mp3s.find((u) => u.includes('_us_')) || '';
      const posRaw = posMatch ? posMatch[1].trim().toLowerCase() : 'verb';
      const pos =
        posRaw.includes('noun')
          ? 'Noun'
          : posRaw.includes('adj')
          ? 'Adjective'
          : 'Verb';
      const cefr = cefrMatch
        ? (cefrMatch[1] || cefrMatch[2] || cefrMatch[3] || 'B2').toUpperCase()
        : 'B2-C1';

      res.json({
        word: rawWord.replace(/-/g, ' '),
        pos,
        cefr,
        ipaUk,
        ipaUs,
        audioUk,
        audioUs,
        oxfordUrl: response.url || oxfordUrl,
        definitionEn: defs[0] || '',
        examples: examples.slice(0, 4),
      });
    } catch {
      res.status(500).json({
        error: 'Không thể kết nối tới Oxford Learner’s Dictionaries lúc này.',
      });
    }
  });

  app.post('/api/evaluate-sentence', async (req, res) => {
    const {
      word,
      targetChunk,
      userSentence,
      contextMode,
      modeLabel,
      defaultUpgradedSentence,
    } = req.body || {};

    if (!userSentence || typeof userSentence !== 'string') {
      res.status(400).json({ error: 'Vui lòng nhập câu tiếng Anh cần chấm.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      res.status(200).json({ fallback: true });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = `Bạn là chuyên gia huấn luyện từ vựng & viết câu tiếng Anh (TOEIC, IELTS, Giao tiếp Công sở).
Hãy chấm điểm và nâng cấp câu của học viên:
- Từ gốc: "${word}"
- Cụm Collocation mục tiêu: "${targetChunk}"
- Ngữ cảnh mục tiêu: "${modeLabel}" (${contextMode})
- Câu học viên viết: "${userSentence}"
- Câu mẫu tham khảo: "${defaultUpgradedSentence}"

Yêu cầu trả về JSON:
- score: Điểm từ 60 đến 100 dựa trên độ chính xác của cụm từ, ngữ pháp và độ tự nhiên trong ngữ cảnh ${modeLabel}.
- chunkFeedback: Nhận xét ngắn gọn bằng tiếng Việt (1 câu) về cách học viên sử dụng từ "${word}" và cụm "${targetChunk}".
- structureFeedback: Nhận xét ngắn gọn bằng tiếng Việt (1 câu) về cấu trúc ngữ pháp, độ dài và sắc thái câu.
- upgradedSentence: 1 câu tiếng Anh nâng cấp tự nhiên, chuẩn xác nhất theo phong cách ${modeLabel} có chứa cụm "${targetChunk}" hoặc biến thể tự nhiên của nó.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER },
              chunkFeedback: { type: Type.STRING },
              structureFeedback: { type: Type.STRING },
              upgradedSentence: { type: Type.STRING },
            },
            required: ['score', 'chunkFeedback', 'structureFeedback', 'upgradedSentence'],
          },
        },
      });

      const rawText = response.text;
      if (!rawText) {
        res.status(200).json({ fallback: true });
        return;
      }

      const parsed = JSON.parse(rawText.trim());
      res.json({
        fallback: false,
        score: parsed.score,
        chunkFeedback: parsed.chunkFeedback,
        structureFeedback: parsed.structureFeedback,
        upgradedSentence: parsed.upgradedSentence,
      });
    } catch {
      res.status(200).json({ fallback: true });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LexiFlow server running on http://localhost:${PORT}`);
  });
}

startServer();
