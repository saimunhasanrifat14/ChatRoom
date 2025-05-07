import React, { useEffect, useState } from "react";
import { HiKey } from "react-icons/hi";
import { IoMdPhotos } from "react-icons/io";
import { MdDelete, MdEditNote } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import { TbLockFilled } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const SettingsList = () => {
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

  const auth = getAuth();
  const [userList, setUserList] = useState([]);

  /**
   * todo : Data fetch from users database
   * @param (null)
   * @description : This function fetches the data from the users database and sets it to the userList state.
   */
  useEffect(() => {
    const fetchData = () => {
      const db = getDatabase();
      const userRep = ref(db, "users/");
      onValue(userRep, (snapshot) => {
        let data = {};
        snapshot.forEach((item) => {
          if (auth.currentUser.uid === item.val().uid) {
            data = { ...item.val(), userkey: item.key };
          }
        });
        setUserList(data);
      });
    };
    fetchData();
  }, []);
  
  return (
    <>
      <div className="h-[22%] w-full flex items-center gap-6 mb-6 border-b-2 border-gray-200 pb-6">
        <img
          className="h-full rounded-full"
          src={userList.profile_picture || "https://www.w3schools.com/howto/img_avatar.png"}
          alt=""
        />
        <h2 className="text-[40px] font-semibold">{userList.username || "Your Name"}</h2>
      </div>
      <div className="h-[78%] w-full flex flex-col">
        {Settings.map((item) => (
          <NavLink
            to={item.path}
            key={item.id}
            className={({ isActive }) =>
              isActive
                ? "h-[10%] w-full flex items-center gap-4 px-3 font-bold border-b-2 border-[#9d9d9d] text-[#38B363] bg-[#f4f4f4] cursor-pointer rounded-lg"
                : "h-[10%] w-full flex items-center gap-4 px-3 border-b-2 border-[#ffffff] cursor-pointer rounded-lg"
            }
          >
            <span className="text-[20px] text-normal text-gray-600">
              {item.icon}
            </span>
            <h2 className="text-[14px] font-semibold text-gray-600">
              {item.name}
            </h2>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default SettingsList;
