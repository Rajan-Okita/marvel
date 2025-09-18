export default function SkeletonCard() {
return (
<div className="bg-zinc-900 rounded-2xl animate-pulse">
<div className="w-full aspect-[3/4] bg-zinc-800" />
<div className="p-3">
<div className="h-3 bg-zinc-800 rounded w-2/3 mb-2"/>
<div className="h-3 bg-zinc-800 rounded w-5/6"/>
</div>
</div>
);
}