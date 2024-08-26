import { Skeleton } from './ui/skeleton';

const Loader = () => {
  return (
    <div className="flex flex-col gap-4 my-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col md:flex-row  px-6  border-2 rounded-xl py-4 md:items-center gap-3 space-x-4"
        >
          <Skeleton className=" h-24 w-24  rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 lg:w-[250px]" />
            <Skeleton className="h-4  w-[200px] lg:w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
