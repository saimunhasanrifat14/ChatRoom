import React from "react";
import Sideber from "./Sideber";
import { Outlet } from "react-router-dom";

const RootLayout = ({ userList }) => {
  return (
    <>
      <div className="flex flex-row w-full bg-BGMainBg h-screen">
        <div className="w-[17%] h-full bg-white border-r-2 border-r-SidebarRightBorder ">
          <Sideber />
        </div>
        <div className="w-[83%] h-full  rounded-lg p-4">
          <Outlet userList={userList} />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
