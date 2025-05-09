import React, { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { MdGroups } from "react-icons/md";

const Profile = ({ userList }) => {
  return (
    <>
      <div className="w-full h-full p-10 flex gap-7">
        <div className="w-[25%]">
          <img
            className="w-full rounded-full"
            src={
              userList[0]?.profile_picture ||
              "https://www.w3schools.com/howto/img_avatar.png"
            }
            alt="Your profile"
          />
        </div>
        <div className="flex flex-col justify-between w-[75%]">
          <div className="flex flex-col gap-4">
            <h1 className="text-[50px] leading-[55px] font-semibold">
              {userList[0]?.username || "Username"}
            </h1>
            <p className="text-gray-600">{userList[0]?.bio}</p>
          </div>
          <div className="flex items-center gap-8">
            <p className="flex items-center gap-2 text-gray-600">
              <span>
                <FaUserFriends />
              </span>
              Friends <span className="font-bold text-black">12</span>{" "}
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              {" "}
              <span className="text-[20px]">
                {" "}
                <MdGroups />
              </span>
              Groups <span className="font-bold text-black">3</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
