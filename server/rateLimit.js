import { RateLimiterMemory } from 'rate-limiter-flexible';


const limiter = new RateLimiterMemory({ points: 60, duration: 60 }); // 60 req/min per server


export const rateLimit = async (req, res, next) => {
try {
await limiter.consume(req.ip);
next();
} catch (e) {
res.status(429).json({ error: 'Too many requests. Please slow down.' });
}
};