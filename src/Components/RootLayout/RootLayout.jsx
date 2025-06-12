import React from "react";
import Sideber from "./Sideber";
import { Outlet, useLocation } from "react-router-dom";
import BottomBer from "./BottomBer";

const RootLayout = ({ userList }) => {
  const location = useLocation(); 
  const isChatRoute = location.pathname === "/rootlayout/Message/Chat";
  return (
    <>
      <div className="flex flex-row w-full bg-BGMainBg h-screen sm:h-screen">
        <div className="w-[17%] h-full hidden sm:block bg-white border-r-2 border-r-SidebarRightBorder ">
          <Sideber />
        </div>
        {!isChatRoute && (
          <div className="block sm:hidden">
            <BottomBer />
          </div>
        )}
        <div className="w-[100%] sm:w-[83%] h-full  rounded-lg p-0 sm:p-4">
          <Outlet userList={userList} />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
