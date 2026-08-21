export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="mb-4 h-4 w-32 rounded bg-slate-200" />
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="h-48 w-full shrink-0 rounded-md bg-slate-200 sm:w-80" />
        <div className="flex-1 space-y-3">
          <div className="h-8 w-1/2 rounded bg-slate-200" />
          <div className="h-4 w-1/3 rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-2/3 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
