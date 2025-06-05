import React from 'react'

const NotifacationSkeleton = () => {
  return (
    <>
  <div className="flex flex-col gap-4 w-full h-[96vh]">
    {/* Topbar skeleton */}
    <div className="h-[8%] flex items-center justify-between w-full animate-pulse">
      <div className="h-8 w-40 bg-gray-300 rounded"></div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      </div>
    </div>

    {/* Notification list skeleton */}
    <div className="h-[92%] flex gap-6 items-center w-full bg-BGWhite rounded-lg">
      <div className="flex flex-col gap-4 w-full h-full p-6 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 p-4 bg-BGGray rounded-lg animate-pulse"
          >
            {/* Left side */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
              <div className="flex flex-col gap-2">
                <div className="w-40 h-4 bg-gray-300 rounded"></div>
                <div className="w-28 h-3 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Right buttons */}
            <div className="flex items-center gap-2">
              <div className="w-20 h-8 bg-gray-300 rounded-lg"></div>
              <div className="w-20 h-8 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</>

  )
}

export default NotifacationSkeleton