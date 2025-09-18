import axios from 'axios';


// simple localStorage cache with 5-min TTL
const TTL = 5 * 60 * 1000;


function getCache(key) {
try {
const raw = localStorage.getItem(key);
if (!raw) return null;
const obj = JSON.parse(raw);
if (Date.now() - obj.time > TTL) return null;
return obj.value;
} catch { return null; }
}


function setCache(key, value) {
try { localStorage.setItem(key, JSON.stringify({ time: Date.now(), value })); } catch {}
}


export async function fetchCharacters({ search = '', offset = 0, limit = 20 }) {
const key = `/api/characters?search=${search}&offset=${offset}&limit=${limit}`;
const cached = getCache(key);
if (cached) return cached;
const { data } = await axios.get(key);
setCache(key, data);
return data;
}