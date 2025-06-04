import React, { useContext, useEffect, useState } from "react";
import { HiKey } from "react-icons/hi";
import { IoMdPhotos } from "react-icons/io";
import { MdDelete, MdEditNote } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import { TbLockFilled } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import SettingListSkeleton from "../../Skeleton/SettingListSkeleton";

const SettingsList = () => {
  // List of user settings with icons and navigation paths.
  const Settings = [
    {
      id: 1,
      name: "Edit Your Profile information",
      icon: <RiEditFill />,
      path: "/rootlayout/Setting/editProfileInfo",
    },
    {
      id: 2,
      name: "Edit Your Profile Picture",
      icon: <IoMdPhotos />,
      path: "/rootlayout/Setting/editProfile",
    },
    {
      id: 3,
      name: "Your Block List",
      icon: <TbLockFilled />,
      path: "/rootlayout/Setting/blockList",
    },
    {
      id: 43,
      name: "Change Your Password",
      icon: <HiKey />,
      path: "/rootlayout/Setting/ChangePassword",
    },
    {
      id: 5,
      name: "Delete Your Account",
      icon: <MdDelete />,
      path: "/rootlayout/Setting/DeleteAccount",
    },
  ];
  // Gets the logged-in user's data and loading state from UserContext.
  const { userList, loading } = useContext(UserContext);

  return (
    <>
      {loading ? (
        <SettingListSkeleton />
      ) : (
        <div className="h-[22%] w-full flex items-center gap-6 mb-6 border-b-2 border-gray-400 pb-6">
          <img
            className="w-30 h-30 object-cover rounded-full"
            src={
              userList?.profile_picture ||
              "https://www.w3schools.com/howto/img_avatar.png"
            }
            alt=""
          />
          <h2 className="text-TextBlack text-[40px] font-semibold">
            {userList?.username || "Your Name"}
          </h2>
        </div>
      )}
      <div className="h-[78%] w-full flex flex-col">
        {Settings.map((item) => (
          <NavLink
            to={item.path}
            key={item.id}
            className={({ isActive }) =>
              isActive
                ? "py-4 w-full flex items-center gap-4 px-3 font-bold border-b-2 border-SidebarRightBorder text-[#38B363] bg-BGGray cursor-pointer rounded-lg"
                : "py-4 w-full flex items-center gap-4 px-3 border-b-2 border-BGWhite cursor-pointer rounded-lg"
            }
          >
            <span className="text-[20px] text-normal text-TextDarkGray">
              {item.icon}
            </span>
            <h2 className="text-[14px] font-semibold text-TextGray">
              {item.name}
            </h2>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default SettingsList;
