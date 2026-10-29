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
    } catch (error) {
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
