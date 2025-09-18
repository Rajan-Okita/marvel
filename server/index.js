import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';
import md5 from 'md5';
import { cacheMiddleware, setCache } from './cache.js';
import { rateLimit } from './rateLimit.js';


const app = express();
app.use(cors());
app.use(morgan('dev'));


const { MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY } = process.env;
if (!MARVEL_PUBLIC_KEY || !MARVEL_PRIVATE_KEY) {
console.error('Missing Marvel keys in .env');
process.exit(1);
}


const MARVEL_BASE = 'https://gateway.marvel.com/v1/public';


// Helper to sign every Marvel request
function withAuthParams(params = {}) {
const ts = Date.now().toString();
const hash = md5(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);
return { ...params, ts, apikey: MARVEL_PUBLIC_KEY, hash };
}


// Proxy: /api/characters
app.get('/api/characters', rateLimit, cacheMiddleware, async (req, res) => {
try {
const { search = '', offset = '0', limit = '20' } = req.query;


const params = withAuthParams({
limit,
offset,
orderBy: 'name',
...(search ? { nameStartsWith: search } : {})
});


const { data } = await axios.get(`${MARVEL_BASE}/characters`, { params });


// cache and set headers
setCache(req.originalUrl, data);
res.set('X-Cache', 'MISS');
res.set('Cache-Control', 'public, max-age=300'); // 5 min client cache hint
res.json(data);
} catch (err) {
const status = err.response?.status || 500;
res.status(status).json({ error: err.message, status });
}
});



app.get('/api/health', (_, res) => res.json({ ok: true }));


const port = Number(process.env.PORT || 5174);
app.listen(port, () => console.log(`Marvel proxy running on http://localhost:${port}`));