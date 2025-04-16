// WatchPageSkeleton.jsx
import React from "react";

const WatchPageSkeleton = () => {
  return (
    <div className="flex flex-col w-full animate-pulse">
      <div className="px-5 flex w-full">
        {/* Video Skeleton */}
        <div className="bg-gray-300 w-[1200px] h-[600px] rounded-lg" />
        {/* LiveChat Skeleton */}
        <div className="ml-5 flex-1 space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-300 h-5 rounded-md w-full" />
          ))}
        </div>
      </div>

      {/* Comments Skeleton */}
      <div className="m-5 space-y-4 w-[1200px]">
        <div className="h-6 bg-gray-300 w-32 rounded" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="w-10 h-10 rounded-full bg-gray-300" />
            <div className="flex flex-col gap-2 w-full">
              <div className="w-1/4 h-4 bg-gray-300 rounded" />
              <div className="w-3/4 h-4 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchPageSkeleton;
