import React from "react";
import Sideber from "./Sideber";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <div className="flex flex-row w-full bg-[#e4e4e4] h-screen">
        <div className="w-[17%] h-full bg-white border-r-2 border-r-gray-300 ">
          <Sideber />
        </div>
        <div className="w-[83%] h-full  rounded-lg p-6">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
