import React from "react";

const ProfileSkeleton = () => {
  return (
    <>
      <div className="w-full h-[41vh] p-10 flex gap-7 animate-pulse">
        {/* Profile Image */}
        <div className="w-[25%]">
          <div className="w-full aspect-square rounded-full bg-gray-300"></div>
        </div>

        {/* User Details */}
        <div className="flex flex-col justify-between w-[75%]">
          {/* Username & Bio */}
          <div className="flex flex-col gap-4">
            <div className="h-[55px] w-3/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
          </div>

          {/* Friends & Groups Info */}
          <div className="flex items-center gap-8">
            <div className="w-32 h-6 bg-gray-300 rounded"></div>
            <div className="w-32 h-6 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSkeleton;
