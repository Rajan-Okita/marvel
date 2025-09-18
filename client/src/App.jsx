import { useEffect, useRef } from 'react';
import CharacterCard from './components/CharacterCard.jsx';
import SkeletonCard from './components/SkeletonCard.jsx';
import { useCharacters } from './hooks/useCharacters.js';


export default function App() {
const { items, hasMore, loading, error, loadMore, onSearchChange } = useCharacters();
const sentinelRef = useRef(null);


// infinite scroll
useEffect(() => {
const el = sentinelRef.current;
if (!el) return;
const io = new IntersectionObserver((entries) => {
entries.forEach((e) => { if (e.isIntersecting) loadMore(); });
}, { rootMargin: '600px' });
io.observe(el);
return () => io.disconnect();
}, [loadMore]);



return (
	<div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 text-white">
		<div className="max-w-7xl mx-auto p-4">
			{/* Hero Section with Logo Background */}
			<section 
				className="flex flex-col items-center justify-center py-16 w-full hero-section"
				style={{ 
					backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg')", 
					backgroundSize: "25%", 
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backgroundBlendMode: "soft-light",
					paddingTop: "6rem",
					paddingBottom: "6rem"
				}}
			>
			</section>
			
			{/* Title Section */}

			<section className="py-8 w-full border-b border-zinc-800/50">
				<h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-red-500 mb-2 text-center mx-auto max-w-3xl">Marvel Characters Explorer</h1>
				<p className="text-zinc-400 text-center mx-auto max-w-xl">Discover your favorite Marvel characters. Browse, search, and learn more about the heroes and villains from the Marvel universe.</p>
			</section>
			
			{/* Search Section */}
			<section className="flex justify-center w-full py-6 border-y border-zinc-800/50">
				<div className="w-full sm:w-[32rem] md:w-[40rem] lg:w-[48rem] mx-auto">
					<input
						type="search"
						placeholder="Search characters…"
						onChange={(e) => onSearchChange(e.target.value)}
						className="w-full px-6 py-5 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-500 text-2xl placeholder-white"
					/>
				</div>
			</section>

			{error && (
				<div className="bg-red-900/40 border border-red-800 text-red-200 p-3 rounded-xl mb-3">
					{String(error)}
				</div>
			)}

			{/* Characters Grid */}
			<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
				{items.map((c) => (<CharacterCard key={c.id} c={c} />))}
				{loading && Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
			</section>

			{hasMore && <div ref={sentinelRef} className="h-10" />}

			<footer className="mt-12 text-xs text-zinc-500 text-center">
				Data provided by Marvel. © 2025 MARVEL
			</footer>
		</div>
	</div>
);
}