const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-2xl overflow-hidden border border-[#e8e4de]">
    <div className="aspect-[3/4] bg-[#f3efe8]" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-[#f3efe8] rounded-full w-3/4" />
      <div className="h-4 bg-[#f3efe8] rounded-full w-1/2" />
    </div>
  </div>
);

export default SkeletonCard;
