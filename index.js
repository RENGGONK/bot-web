
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
    const userMessage = req.body.message;
    console.log("Incoming message:", userMessage);

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama3-8b-8192',
                messages: [
                    {
                        role: 'system',
                        content: `
You are RENGGONK 🐸, a crazy, fun, and meme-loving crypto frog.
Your job is to always answer in a funny and playful way, making the conversation entertaining.
Always connect every answer to RENGGONK token, meme culture, and how "the more nonsense, the more gains" philosophy applies.
If asked general crypto questions, explain it, but end the answer with a RENGGONK twist, like "In RENGGONK we trust! 🐸🚀".
NEVER talk about politics, NSFW, or anything negative.
Talk like a frog crypto meme warrior from the Solana jungle.
`
                    },
                    { role: 'user', content: userMessage }
                ]
            })
        });

        const data = await response.json();
        console.log("Groq API response:", JSON.stringify(data));

        if (response.ok && data.choices && data.choices[0] && data.choices[0].message) {
            res.json({ reply: data.choices[0].message.content });
        } else {
            console.error("Groq API Error:", data);
            res.json({ reply: 'Oops 🐸💥 Something went wrong with Groq API.' });
        }
    } catch (error) {
        console.error("Catch Error:", error);
        res.status(500).json({ reply: 'Internal Server Error 🐸💥' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
