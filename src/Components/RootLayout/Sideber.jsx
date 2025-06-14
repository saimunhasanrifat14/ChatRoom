import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
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
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
    setShowLogoutModal(true);
  };
  const handleConfirmLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
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
      {showLogoutModal && (
        <div className="fixed bg-[#00000093] inset-0 flex items-center justify-center z-80">
          <div className="bg-BGMainBg w-[280px] h-[150px] rounded-2xl shadow-lg text-center flex flex-col justify-between">
            <div className="flex flex-col items-center  justify-center h-full ">
              <h3 className="font-bold text-lg text-TextBlack">Confirm</h3>
              <p className="text-sm text-TextDarkGray mt-2">
                Are you sure you want to log out?
              </p>
            </div>
            <div className="flex justify-between mt-5 border-t border-ButtonGrayBorder text-sm font-semibold">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="text-TextBlack bg-BGGray w-1/2 py-2 cursor-pointer rounded-bl-2xl hover:bg-ButtonGrayBorder"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="text-TextBlack bg-BGGray w-1/2 py-2 border-l border-ButtonGrayBorder cursor-pointer rounded-br-2xl hover:bg-ButtonGrayBorder "
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sideber;
