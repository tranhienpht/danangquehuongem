/* eslint-disable */
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Google Generative AI with API Key from .env
const apiKey = process.env.VITE_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;

if (!apiKey) {
    console.error("CRITICAL ERROR: API Key is missing. Please check .env file.");
} else {
    console.log("API Key loaded successfully.");
}

const genAI = new GoogleGenerativeAI(apiKey);

app.post('/api/chat', async (req, res) => {
    try {
        const { message, modelName, systemInstruction } = req.body;
        console.log(`Received chat request: "${message}" using model ${modelName || 'gemini-2.5-flash'}`);

        // Get Generative Model
        const model = genAI.getGenerativeModel({
            // Fallback to gemini-2.5-flash since 1.5 is no longer supported on this account
            model: modelName || "gemini-2.5-flash",
            systemInstruction: systemInstruction || "Bạn là một trợ lý AI hữu ích.",
        });

        // Generate Content
        const result = await model.generateContent(message);
        const text = result.response.text();

        console.log("Successfully generated response.");
        res.json({ text });

    } catch (error) {
        console.error("Error from Google API:", error);
        res.status(500).json({ error: error.message || 'Lỗi hệ thống khi gọi AI' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🤖 AI Backend Server running on port ${PORT}`);
    console.log(`🌐 Test sending POST to http://localhost:${PORT}/api/chat`);
    console.log(`=========================================`);
});
