import { Card, CardContent } from '@/components/ui/card';
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
          {[1, 2, 3, 4, 5].map((job) => (
            <Card key={job} className=" border shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Skeleton className="w-12 h-12 rounded-full " />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="w-48 h-6 " />
                    <Skeleton className="w-32 h-4 " />
                    <div className="flex flex-wrap gap-4">
                      <Skeleton className="w-20 h-6 " />
                      <Skeleton className="w-20 h-6 " />
                      <Skeleton className="w-32 h-6 " />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5, 6].map((skill) => (
                        <Skeleton key={skill} className="w-16 h-4 " />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
