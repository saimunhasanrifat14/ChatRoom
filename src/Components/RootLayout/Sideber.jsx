import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { AiFillMessage } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import { IoLogOut, IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Sideber = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * todo : menuItems array implement
   * @description : this array is used to store the menu items for the sidebar navigation
   */
  const menuItems = [
    { name: "Dashboard", icon: <BiSolidDashboard />, id: 1 },
    { name: "Message", icon: <AiFillMessage />, id: 2 },
    { name: "Notification", icon: <IoNotifications />, id: 3 },
    { name: "Setting", icon: <IoSettingsSharp />, id: 4 },
  ];

  /**
   * todo : handleLogout function implement
   * @param (null)
   * return : null
   * @description : this function is used to sign out the user from the app and redirect to login page
   */
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <>
      <div className="h-full bg-BGWhite flex flex-col justify-between items-center py-8 px-4">
        <div className="w-full">
          <div className="pl-2">
            <h3 className="navlogo text-TextBlack relative font-semibold text-[22px] z-1">
              ChatRoom
            </h3>
          </div>
          <div className="w-full flex flex-col gap-2 mt-15">
            {menuItems.map((item) => (
              <NavLink
                to={`/rootlayout/${item.name}`}
                key={item.id}
                className={({ isActive }) =>
                  isActive
                    ? "SideberActiveMenu flex items-center gap-2 w-full text-TextGray font-semibold cursor-pointer py-2 px-3  rounded-sm transition duration-200 ease-in-out"
                    : "flex items-center gap-2 w-full text-TextGray hover:text-gray-700 cursor-pointer py-2 px-3  rounded-sm transition duration-200 ease-in-out"
                }
              >
                <span className="text-[20px]">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div
          onClick={handleLogout}
          className="flex items-center gap-2 w-full  py-2 px-3 font-semibold text-TextGray cursor-pointer hover:text-red-400"
        >
          <span aria-label="Logout Icon" className="text-[26px] ">
            <IoLogOut />
          </span>
          <span>Log Out</span>
        </div>
      </div>
    </>
  );
};

export default Sideber;
