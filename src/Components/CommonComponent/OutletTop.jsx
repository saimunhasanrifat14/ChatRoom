import React, { useContext } from "react";
import { IoIosNotifications } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import OutletTopSkeleton from "../../Skeleton/OutletTopSkeleton";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../../Context/ThemeProvider";



const OutletTop = ({ Title }) => {
  const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();


  // Gets the logged-in user's data and loading state from UserContext.
  const { userList, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="w-[100%] overflow-hidden">
        <OutletTopSkeleton />
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center justify-between w-full h-full px-5 py-3 sm:p-3">
        <h2 className="text-[20px] sm:text-[30px] text-TextBlack  font-semibold flex items-center gap-2">
        {Title}
      </h2>
      <div className="flex items-center gap-3">
        <Link
          to={"/rootlayout/Notification"}
          className="p-2 rounded-full text-gray-600 bg-white text-[22px] sm:text-[25px] cursor-pointer"
        >
          <IoIosNotifications />
        </Link>
        <button
              className="p-3 rounded-full bg-white text-gray-600 text-sm sm:text-xl cursor-pointer"
              onClick={toggleTheme}
            >
              {theme === "light" ? <MdLightMode /> : <MdDarkMode />}
            </button>
        <img
          onClick={() => navigate("/rootlayout/Dashboard")}
          className="w-10 h-10 sm:block hidden object-cover rounded-full cursor-pointer"
          src={
            userList?.profile_picture ||
            "https://www.w3schools.com/howto/img_avatar.png"
          }
          alt="Your Profile Picture"
        />
      </div>
      </div>
    </>
  );
};

export default OutletTop;
