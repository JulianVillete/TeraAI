'use strict';

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
	console.warn('Warning: OPENROUTER_API_KEY is not set in environment. Set it in .env');
}

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Avoid 404 in browser console for favicon
app.get('/favicon.ico', (_req, res) => {
	return res.status(204).end();
});

app.post('/api/chat', async (req, res) => {
	try {
		const { message } = req.body || {};
		if (!message || typeof message !== 'string') {
			return res.status(400).json({ error: 'Missing message string' });
		}

		const attemptRequest = async () => {
			return await fetch('https://openrouter.ai/api/v1/chat/completions', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${OPENROUTER_API_KEY}`,
					'HTTP-Referer': process.env.HTTP_REFERER || 'http://localhost',
					'X-Title': process.env.X_TITLE || 'LocalDev',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					model: 'deepseek/deepseek-r1:free',
					messages: [{ role: 'user', content: message }]
				})
			});
		};

		const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

		let upstreamResponse = await attemptRequest();
		if (upstreamResponse.status === 429) {
			// simple backoff retries for rate limit
			await sleep(1000);
			upstreamResponse = await attemptRequest();
			if (upstreamResponse.status === 429) {
				await sleep(2000);
				upstreamResponse = await attemptRequest();
			}
		}

		const data = await upstreamResponse.json().catch(() => ({}));
		if (!upstreamResponse.ok) {
			const retryAfter = upstreamResponse.headers.get('retry-after');
			return res.status(upstreamResponse.status).json({
				error: data?.error || `Upstream error ${upstreamResponse.status}`,
				status: upstreamResponse.status,
				retryAfter
			});
		}
		return res.status(200).json(data);
	} catch (err) {
		return res.status(500).json({ error: 'Proxy error', details: String(err && err.message ? err.message : err) });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});


