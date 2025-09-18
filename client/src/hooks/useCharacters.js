import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchCharacters } from '../api';


export function useCharacters() {
const [items, setItems] = useState([]);
const [search, setSearch] = useState('');
const [offset, setOffset] = useState(0);
const [hasMore, setHasMore] = useState(true);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);


const pageSize = 24;


const resetAndLoad = useCallback(async () => {
setItems([]); setOffset(0); setHasMore(true); setError(null);
setLoading(true);
try {
const data = await fetchCharacters({ search, offset: 0, limit: pageSize });
setItems(data.data.results);
setHasMore(data.data.count + 0 < data.data.total);
setOffset(pageSize);
} catch (e) { setError(e?.message || 'Failed to load'); }
finally { setLoading(false); }
}, [search]);


const loadMore = useCallback(async () => {
if (!hasMore || loading) return;
setLoading(true);
try {
const data = await fetchCharacters({ search, offset, limit: pageSize });
setItems(prev => [...prev, ...data.data.results]);
setHasMore(offset + data.data.count < data.data.total);
setOffset(prev => prev + pageSize);
} catch (e) { setError(e?.message || 'Failed to load'); }
finally { setLoading(false); }
}, [search, offset, hasMore, loading]);


// debounce search input
const debounceRef = useRef();
const onSearchChange = useCallback((val) => {
clearTimeout(debounceRef.current);
debounceRef.current = setTimeout(() => setSearch(val.trim()), 300);
}, []);


useEffect(() => { resetAndLoad(); }, [resetAndLoad]);


return { items, hasMore, loading, error, loadMore, onSearchChange };
}