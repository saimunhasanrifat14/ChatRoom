import React from "react";

const SettingListSkeleton = () => {
  return (
    <>
      <div className="h-[22%] w-full flex items-center gap-6 mb-6 border-b-2 border-gray-200 pb-6 animate-pulse">
        {/* Profile picture skeleton */}
        <div className="w-[120px] h-[120px] bg-gray-300 rounded-full"></div>

        {/* Username skeleton */}
        <div className="h-10 w-[200px] bg-gray-300 rounded"></div>
      </div>
    </>
  );
};

export default SettingListSkeleton;
