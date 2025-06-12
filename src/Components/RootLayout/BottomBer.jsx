import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { AiFillMessage } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { IoLogOut, IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
      { name: "Message", icon: <AiFillMessage />, id: 2 },
      { name: "Notification", icon: <IoNotifications />, id: 3 },
      { name: "Dashboard", icon: <BiSolidDashboard />, id: 1 },
    { name: "Setting", icon: <IoSettingsSharp />, id: 4 },
  ];

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
    <div className="fixed bottom-0 left-0 right-0 bg-BGGray flex justify-around items-center z-50">
      {menuItems.map((item) => (
        <NavLink
          to={`/rootlayout/${item.name}`}
          key={item.id}
          className={({ isActive }) =>
            isActive
              ? "text-TextDarkGray text-[24px] py-5 px-3 border-b-4 border-b-BGLightGreen"
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
  );
};

export default Sidebar;
