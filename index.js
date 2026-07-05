import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from "@google/genai";

const app = express();

const port = process.env.PORT || 3000;

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


const SYSTEM_PROMPT = `
Kamu adalah chatbot konsultasi tanaman.

Jawab menggunakan Bahasa Indonesia.

Topik yang boleh dijawab:

- Perawatan tanaman
- Pemupukan
- Penyiraman
- Hama tanaman
- Penyakit tanaman

Jika pertanyaan di luar topik tersebut,
jawab dengan sopan bahwa kamu hanya membantu konsultasi tanaman.
`;

app.post('/api/chat', async (req, res) => {

    try {

        const { conversation } = req.body;

        if (!conversation) {
            return res.status(400).json({
                success: false,
                message: 'Conversation wajib diisi.'
            });
        }

        if (!Array.isArray(conversation)) {
            return res.status(400).json({
                success: false,
                message: 'Conversation harus berupa array.'
            });
        }

        const contents = conversation.map(item => ({
            role: item.role,
            parts: [
                {
                    text: item.text
                }
            ]
        }));

        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash-lite",

            contents,

            config: {
                systemInstruction: SYSTEM_PROMPT,
                temperature: 0.6
            }

        });

        return res.json({

            success: true,

            answer: response.text

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

});