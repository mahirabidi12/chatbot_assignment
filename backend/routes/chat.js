import express from 'express';
import Groq from 'groq-sdk';
import { getSystemPrompt } from '../prompts/index.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { persona, messages } = req.body;

  if (!persona || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing required fields: persona, messages' });
  }

  const systemPrompt = getSystemPrompt(persona);
  if (!systemPrompt) {
    return res.status(400).json({ error: `Unknown persona: ${persona}` });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on the server.' });
  }

  try {
    const groq = new Groq({ apiKey });

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
    });

    res.json({ content: response.choices[0].message.content });
  } catch (err) {
    console.error('Groq API error:', err.message);
    const status = err.status || 500;
    res.status(status).json({
      error:
        status === 429
          ? 'Rate limit reached. Please wait a moment and try again.'
          : 'Something went wrong talking to the AI. Please try again.',
    });
  }
});

export default router;
