import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

const UserlistSkeleton = () => {
  return (
    <>
      <div className="h-[87vh] flex flex-col justify-between overflow-hidden">
        <div className="px-5 pb-5 pt-3 h-full rounded-2xl">
          {/* Top Header */}
          <div className="h-[5%] flex justify-between items-center">
            <h2 className="text-TextBlack flex items-center gap-3 text-lg font-semibold">
              Users
            </h2>
            <span className="text-TextBlack text-[20px] cursor-pointer">
              <HiOutlineDotsVertical />
            </span>
          </div>

          {/* Skeleton List */}
          <div className="h-[95%] overflow-auto [&::-webkit-scrollbar]:hidden">
            {[...Array(11)].map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 py-3 border-b border-b-gray-300 last:border-b-0 animate-pulse"
              >
                {/* Profile Image Placeholder */}
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>

                {/* Username and text */}
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                </div>

                {/* Button Placeholder */}
                <div className="w-14 h-9 bg-gray-300 rounded-lg mr-2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserlistSkeleton;
