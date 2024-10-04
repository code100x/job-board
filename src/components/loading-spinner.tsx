'use client';

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="size-6 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
    </div>
  );
};
