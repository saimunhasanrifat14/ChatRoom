import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

const FriendListSkeleton = () => {
  return (
    <>
      <div className="px-5 pb-5 pt-3  h-[43vh] rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="h-[13%] flex justify-between items-center">
          <h2 className="flex items-center gap-3 text-lg font-semibold">
            Friends
          </h2>
          <span className="text-blueColor text-[20px] cursor-pointer">
            <HiOutlineDotsVertical />
          </span>
        </div>

        {/* Loading Skeleton List */}
        <div className="h-[87%] overflow-auto [&::-webkit-scrollbar]:hidden">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 py-3 border-b border-b-gray-300 last:border-b-0 animate-pulse"
            >
              {/* Profile Image */}
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>

              {/* Friend Name + Time */}
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
              </div>

              {/* Block Button */}
              <div className="w-16 h-9 bg-gray-300 rounded-lg mr-2"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FriendListSkeleton;
