export default function CharacterCard({ c }) {
const img = `${c.thumbnail?.path}.${c.thumbnail?.extension}`.replace('http://', 'https://');
return (
<article className="bg-zinc-900 rounded-2xl overflow-hidden shadow-md transition hover:scale-[1.01]">
<img src={img} alt={c.name} className="w-full aspect-[3/4] object-cover" loading="lazy" />
<div className="p-3">
<h3 className="font-semibold text-sm line-clamp-1">{c.name}</h3>
{c.description && (
<p className="text-xs text-zinc-400 mt-1 line-clamp-2">{c.description}</p>
)}
</div>
</article>
);
}