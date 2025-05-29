import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoCameraOutline } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useSelector } from "react-redux";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import NoChatSelected from "./NoChatSelected";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [emojiOpen, setemojiOpen] = useState(false);
  const db = getDatabase();
  const auth = getAuth();

  const { value: user } = useSelector((store) => store.friends);
  console.log("user", user);

  const handleEmoji = ({ emoji }) => {
    setMsg((prev) => prev + emoji);
  };

  const rightsidemsg = [
    {
      time: "2:30",
      message:
        "Hi my name is xxxx. How are you? Hi my name is xxxx. How are youHi my name is xxxx. How are you?Hi my name is xxxx.",
    },
    {
      time: "2:30",
      message:
        "Hi my name is xxxx. How are you? Hi my How are youHi my name is xxxx. How are you?Hi my name is xxxx. How are",
    },
    {
      time: "2:30",
      message: "Hi my name is xxxx. How are you? Hi my",
    },
    {
      time: "2:30",
      message: "Hi my name is xxxx. How are you?Hi my name is xxxx. How are",
    },
  ];
  const leftsidemsg = [
    {
      time: "2:30",
      message:
        "Hi my name is xxxx. How are you? Hi my name is xxxx. How are youHi my name is xxxx. How are you?Hi my name is xxxx.",
    },
    {
      time: "2:30",
      message:
        "Hi my name is xxxx. How are you? Hi my How are youHi my name is xxxx. How are you?Hi my name is xxxx. How are",
    },
  ];

  if (Object.keys(user).length === 0) {
    return <NoChatSelected />;
  }
  return (
    <>
      <div className="w-full h-full px-8 flex flex-col  justify-between relative">
        <div className="chatTop h-[14%] border-b-2 border-b-gray-300 flex justify-between items-center">
          <div className="flex items-center gap-6 ">
            <img
              src={
                user
                  ? user.profilePicture
                  : "https://www.w3schools.com/howto/img_avatar.png"
              }
              alt="profile picture"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="">
              <h3 className="font-semibold text-[22px] text-gray-900">
                {user ? user.userName : "user"}
              </h3>
              <p className="text-gray-500 text-sm">
                {navigator.onLine ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          <span className="text-blueColor text-[24px] cursor-pointer">
            <HiOutlineDotsVertical />
          </span>
        </div>

        {/* Chat part */}
        <div className="chatMain flex flex-col gap-4 h-[72%] pr-2 py-4 overflow-y-scroll custom-scrollbar">
          {/* left side msg */}
          <div className="flex flex-col gap-[3px]">
            {leftsidemsg.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 justify-start relative group"
              >
                <h2
                  className={
                    index === rightsidemsg.length - 1
                      ? "message max-w-[70%] text-wrap p-2 bg-gray-200 rounded-tr-3xl rounded-br-3xl rounded-bl-sm rounded-tl-md relative z-10"
                      : index === 0
                      ? "message max-w-[70%] text-wrap p-2 bg-gray-200 rounded-tr-3xl rounded-br-3xl rounded-bl-sm rounded-tl-3xl relative z-10"
                      : "message max-w-[70%] text-wrap p-2 bg-gray-200 rounded-tr-3xl rounded-br-3xl rounded-tl-md rounded-bl-md relative z-10"
                  }
                >
                  {item.message}
                </h2>
                <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.time}
                </p>
              </div>
            ))}
          </div>
          {/* left side msg */}

          {/* right side msg */}
          <div className="flex flex-col gap-[3px]">
            {rightsidemsg?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 justify-end relative group"
              >
                <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.time}
                </p>
                <h2
                  className={
                    index === rightsidemsg.length - 1
                      ? "message max-w-[70%] text-wrap py-2 px-3 bg-green-500 text-white rounded-tl-3xl rounded-bl-3xl rounded-br-sm rounded-tr-md relative z-10"
                      : index === 0
                      ? "message max-w-[70%] text-wrap py-2 px-3 bg-green-500 text-white rounded-tl-3xl rounded-bl-3xl rounded-br-sm rounded-tr-3xl relative z-10"
                      : "message max-w-[70%] text-wrap py-2 px-3 bg-green-500 text-white rounded-tl-3xl rounded-bl-3xl rounded-tr-md rounded-br-md relative z-10"
                  }
                >
                  {item.message}
                </h2>
              </div>
            ))}
          </div>
          {/* right side msg */}
        </div>
        {/* Chat part */}

        {/* input part */}
        <div className="chatBottom w-full h-[14%] flex items-center justify-between gap-5 border-t-2 border-t-gray-300 relative">
          <input
            className="bg-gray-100 py-3 px-4 w-[92%] rounded-lg outline-none"
            placeholder="Type Here"
            type="text"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <div className="flex items-center gap-3 absolute right-[85px] top-[40px] text-[18px] text-gray-600">
            <span
              onClick={() => setemojiOpen(!emojiOpen)}
              className="text-xl cursor-pointer"
            >
              <MdOutlineEmojiEmotions />
            </span>
            <span className="text-xl cursor-pointer">
              <IoCameraOutline />
            </span>
          </div>
          <button className="p-4 bg-[#3cae64] text-white rounded-full cursor-pointer">
            <FaPaperPlane />
          </button>
        </div>
        {/* input part */}
        {/* emoji part */}
        <div className="absolute z-12 bottom-[11%] right-[12%]">
          <EmojiPicker open={emojiOpen} onEmojiClick={handleEmoji} />
        </div>
        {/* emoji part */}
      </div>
    </>
  );
};

export default Chat;
