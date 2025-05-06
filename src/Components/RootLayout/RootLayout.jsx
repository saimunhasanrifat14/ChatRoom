import React from "react";
import Navber from "./Sideber";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <div className="flex flex-row gap-4 w-full h-screen bg-gray-100 p-4">
        <div className="w-[17%] h-full bg-white shadow-lg rounded-lg">
          <Navber />
        </div>
        <div className="w-[83%] h-full bg-white shadow-lg rounded-lg ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
