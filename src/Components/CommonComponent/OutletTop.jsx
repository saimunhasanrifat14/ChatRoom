import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const OutletTop = ({ Title, userList }) => {
  const navigate = useNavigate();

  return (
    <>
      <h2 className="text-[30px]  font-semibold flex items-center gap-2">
        {Title}
      </h2>
      <div className="flex items-center gap-3">
        <Link
          to={"/rootlayout/Notification"}
          className="p-2 rounded-full text-gray-600 bg-white text-[25px] cursor-pointer"
        >
          <IoIosNotifications />
        </Link>
        <img
          onClick={() => navigate("/rootlayout/Dashboard")}
          className="w-10 h-10 rounded-full cursor-pointer"
          src={
            userList?.profile_picture ||
            "https://www.w3schools.com/howto/img_avatar.png"
          }
          alt="Your Profile Picture"
        />
      </div>
    </>
  );
};

export default OutletTop;
