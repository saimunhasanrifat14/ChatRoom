import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { IoLogOut, IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { name: "Message", icon: <AiFillMessage />, id: 2 },
    { name: "Notification", icon: <IoNotifications />, id: 3 },
    { name: "Dashboard", icon: <BiSolidDashboard />, id: 1 },
    { name: "Setting", icon: <IoSettingsSharp />, id: 4 },
  ];

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
      <div className="fixed bottom-0 left-0 right-0 bg-BGGray flex justify-around items-center z-50">
        {menuItems.map((item) => (
          <NavLink
            to={`/rootlayout/${item.name}`}
            key={item.id}
            className={({ isActive }) =>
              isActive
                ? "text-[#38b363] text-[24px] py-5 px-3 border-b-4 border-b-[#38b363] rounded-sm"
                : "text-TextGray text-[24px] py-5 px-3"
            }
          >
            {item.icon}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="text-TextGray text-[24px] hover:text-red-400 py-5 px-3"
        >
          <IoLogOut />
        </button>
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

export default Sidebar;
