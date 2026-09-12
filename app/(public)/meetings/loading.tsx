// app/meetings/loading.tsx
export default function MeetingsLoading() {
  return (
    <div className="w-full py-12 flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 border-4 border-[#8da393] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm font-semibold tracking-widest text-[#5b6e60] uppercase animate-pulse">
        Loading meeting records...
      </p>
    </div>
  );
}
