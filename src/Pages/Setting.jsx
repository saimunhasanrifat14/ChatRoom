import React, { useState } from "react";
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
import { GoChevronLeft } from "react-icons/go";

const Setting = ({ userList }) => {
  const [showOutlet, setShowOutlet] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:gap-2 gap-0 w-full h-full">
        <div className="h-[9%] flex items-center justify-between w-full">
          <OutletTop Title={"Settings"} />
        </div>

        <div className="h-[91%] w-full flex gap-4 items-center">
          {/* Desktop view */}
          <div className="h-full sm:w-[50%] w-full bg-BGWhite sm:rounded-lg rounded-none p-6 sm:block hidden">
            <SettingsList userList={userList} />
          </div>
          <div className="h-full sm:w-[50%] w-full bg-BGWhite rounded-lg hidden sm:block">
            <Outlet />
          </div>

          {/* Mobile view */}
          <div className="block sm:hidden w-full h-full">
            {!showOutlet ? (
              <div className="h-full sm:w-[50%] w-full bg-BGWhite sm:rounded-lg rounded-none p-4">
                <SettingsList onSelect={() => setShowOutlet(true)} />
              </div>
            ) : (
              <div className="w-full h-full relative bg-BGWhite rounded-none">
                <button
                  onClick={() => setShowOutlet(false)}
                  className="mb-2 text-[16px] text-TextDarkGray absolute top-4 left-3 flex items-center gap-1"
                >
                  <span className="text-xl"><GoChevronLeft /></span> Back
                </button>
                <Outlet />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
