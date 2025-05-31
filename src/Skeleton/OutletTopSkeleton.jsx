import React from "react";

const OutletTopSkeleton = () => {
  return (
    <>
      <div className="flex items-center justify-between w-[100%]">
        <div className="text-[30px] font-semibold flex items-center gap-2 animate-pulse">
        <div className="h-8 w-40 bg-gray-300 rounded"></div>
      </div>

      <div className="flex items-center gap-3 animate-pulse">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      </div>
      </div>
    </>
  );
};

export default OutletTopSkeleton;
