import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function JobCardSkeleton() {
  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        <Skeleton className="w-32 h-6 mb-6 " />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className=" border-gray-700">
              <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                <Skeleton className="w-12 h-12 rounded-full " />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48 " />
                  <Skeleton className="h-4 w-32 " />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Skeleton className="h-6 w-20 " />
                  <Skeleton className="h-6 w-24 " />
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-6 w-16 " />
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Skeleton className="h-10 w-28 " />
                  <Skeleton className="h-10 w-28 " />
                </div>
              </CardContent>
            </Card>

            <Card className=" border-gray-700">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-32 " />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full " />
                <Skeleton className="h-4 w-2/3  mt-2" />
              </CardContent>
            </Card>

            <Card className=" border-gray-700">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-40 " />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full " />
                <Skeleton className="h-4 w-3/4  mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-6 w-48 " />
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-2 transition-all duration-115 ease-linear hover:bg-lightBgSecondary dark:hover:bg-darkBgSecondary flex flex-col gap-6 h-fit max-h-[10rem] p-4 rounded-xl"
              >
                <div className="flex gap-4 items-center">
                  <Skeleton className="w-16 h-16 rounded-md" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-40" />
                    <div className="text-xs flex gap-1 font-medium items-center text-gray-500">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-6 w-20 rounded-lg" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
