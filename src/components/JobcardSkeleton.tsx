import { Skeleton } from '@/components/ui/skeleton';

export default function JobCardSkeleton() {
  return (
    <section className="grid gap-5 border p-3 rounded-lg">
      <div className="grid gap-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
      <Skeleton className="h-10 w-28" />
      <Skeleton className="h-16 w-full" />
    </section>
  );
}
