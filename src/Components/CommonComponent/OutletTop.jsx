import React from "react";
import { IoIosNotifications } from "react-icons/io";

const OutletTop = ({ Title }) => {
  return (
    <>
      <h2 className="text-[30px]  font-semibold flex items-center gap-2">
        {Title}
      </h2>
      <div className="flex items-center gap-3">
        <span className="p-2 rounded-full text-gray-600 bg-white text-[25px] cursor-pointer">
          <IoIosNotifications />
        </span>
        <img
          className="w-10 h-10 rounded-full cursor-pointer"
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="Your Profile Picture"
        />
      </div>
    </>
  );
};

export default OutletTop;
