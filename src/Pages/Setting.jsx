import React from "react";
import OutletTop from "../Components/CommonComponent/OutletTop";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdDelete, MdEditNote } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdPhotos } from "react-icons/io";
import { FaKey } from "react-icons/fa";
import { TbLockFilled } from "react-icons/tb";
import { HiKey } from "react-icons/hi";
import { RiEditFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import SettingsList from "../Components/SettingComponent/SettingsList";

const Setting = ({ userList }) => {
  return (
    <>
      <div className="flex flex-col gap-2 w-full h-full">
        <div className="h-[9%] flex items-center justify-between w-full">
          <OutletTop userList={userList} Title={"Settings"} />
        </div>
        <div className="h-[91%] w-full flex gap-4 items-center">
          <div className="h-full w-[50%] bg-white rounded-lg p-6">
            <SettingsList userList={userList} />
          </div>
          <div className="h-full w-[50%] bg-white rounded-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
