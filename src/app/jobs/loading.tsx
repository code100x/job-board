import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className="container flex gap-5 pt-5 mt-10">
      <div className="hidden sm:block border  rounded-lg w-[310px] p-4 h-screen">
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-6 w-3/4 mb-4" />
        <div className="h-6 w-3/4 mb-4"></div>
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-6 w-3/4 mb-4" />
      </div>

      <div className="grow">
        <Skeleton className="h-10 w-1/2 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
