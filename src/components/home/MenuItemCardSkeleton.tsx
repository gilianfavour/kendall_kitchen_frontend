export default function MenuItemCardSkeleton() {
  return (
    <div
      className="rounded-lg overflow-hidden bg-white border border-[#e8ddd0] shadow-sm"
      aria-hidden="true"
    >
      <div className="h-52 bg-[#f0e6d3] animate-pulse" />
      <div className="p-4 space-y-2.5">
        <div className="h-3 w-16 rounded bg-[#e8ddd0] animate-pulse" />
        <div className="h-4 w-3/4 rounded bg-[#e8ddd0] animate-pulse" />
        <div className="h-3 w-full rounded bg-[#e8ddd0] animate-pulse" />
        <div className="h-3 w-4/5 rounded bg-[#e8ddd0] animate-pulse" />
        <div className="flex justify-between pt-2 border-t border-[#f0e6d3]">
          <div className="h-4 w-20 rounded bg-[#e8ddd0] animate-pulse" />
          <div className="h-4 w-16 rounded bg-[#e8ddd0] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
