import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoCameraOutline } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const Chat = () => {
  return (
    <>
      <div className="w-full h-full px-8 flex flex-col  justify-between">
        <div className="chatTop h-[14%] border-b-2 border-b-gray-300 flex justify-between items-center">
          <div className="flex items-center gap-6 ">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="profile picture"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="">
              <h3 className="font-semibold text-[22px] text-gray-900">
                Swathi{" "}
              </h3>
              <p className="text-gray-500 text-sm">Online</p>
            </div>
          </div>
          <span className="text-blueColor text-[24px] cursor-pointer">
            <HiOutlineDotsVertical />
          </span>
        </div>
        <div className="chatMain h-[72%]"></div>
        <div className="chatBottom w-full h-[14%] flex items-center justify-between gap-5 border-t-2 border-t-gray-300 relative">
          <input
            className="bg-gray-100 py-3 px-4 w-[92%] rounded-lg outline-none"
            placeholder="Type Here"
            type="text"
          />
          <div className="flex items-center gap-2 absolute right-[85px] top-[40px] text-[18px] text-gray-600">
            <span>
              <IoCameraOutline />
            </span>
            <span>
              <MdOutlineEmojiEmotions />
            </span>
          </div>
          <button className="p-4 bg-[#3cae64] text-white rounded-full cursor-pointer">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
