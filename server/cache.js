import NodeCache from 'node-cache';


const ttlSeconds = Number(process.env.CACHE_TTL_SECONDS || 21600); // 6h 
export const cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: 120 });


export const cacheMiddleware = (req, res, next) => {
const key = req.originalUrl;
const hit = cache.get(key);
if (hit) {
res.set('X-Cache', 'HIT');
res.set('Cache-Control', 'public, max-age=300'); // allow client to reuse for 5 min
return res.json(hit);
}
res.locals.cacheKey = key;
next();
};


export const setCache = (key, value) => cache.set(key, value);