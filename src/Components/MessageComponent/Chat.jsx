import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoCameraOutline } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useSelector } from "react-redux";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [emojiOpen, setemojiOpen] = useState(false);
  useSelector((store) => console.log(store.friends.value));
  // const { value : user } = useSelector((store) => store.friends);

  const handleEmoji = ({ emoji }) => {
    setMsg((prev) => prev + emoji);
  };

  return (
    <>
      <div className="w-full h-full px-8 flex flex-col  justify-between relative">
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
        {/* Chat part */}
        <div className="chatMain h-[72%] pr-2 py-4 overflow-y-scroll custom-scrollbar">
          {/* left side msg */}
          <div className="flex flex-col items-start justify-start relative group">
            <h2 className="message max-w-[70%] text-wrap p-2 bg-gray-200 rounded-tl-xl rounded-bl-sm rounded-tr-xl rounded-br-xl relative z-10">
              Hello my name is xxxx. what is your name Hello my name is xxxx.
              what is your nameHello my name is xxxx. what is your name
            </h2>
            <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              2 min ago
            </p>
          </div>
          {/* left side msg */}

          {/* right side msg */}
          <div className="flex flex-col items-end justify-end relative group">
            <h2 className="message max-w-[70%] text-wrap p-2 bg-green-500 text-white rounded-tl-xl rounded-bl-xl rounded-br-sm rounded-tr-xl relative z-10">
              Hi my name is xxxx. How are you? Hi my name is xxxx. How are
              you?Hi my name is xxxx. How are you?Hi my name is xxxx. How are
              you?
            </h2>
            <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              5 sec ago
            </p>
          </div>
          {/* right side msg */}
          {/* left side msg */}
          <div className="flex flex-col items-start justify-start relative group">
            <h2 className="message max-w-[70%] text-wrap p-2 bg-gray-200 rounded-tl-xl rounded-bl-sm rounded-tr-xl rounded-br-xl relative z-10">
              Hello my name is xxxx. what is your name Hello my name is xxxx.
              what is your nameHello my name is xxxx. what is your name
            </h2>
            <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              2 min ago
            </p>
          </div>
          {/* left side msg */}

          {/* right side msg */}
          <div className="flex flex-col items-end justify-end relative group">
            <h2 className="message max-w-[70%] text-wrap p-2 bg-green-500 text-white rounded-tl-xl rounded-bl-xl rounded-br-sm rounded-tr-xl relative z-10">
              Hi my name is xxxx. How are you? Hi my name is xxxx. How are
              you?Hi my name is xxxx. How are you?Hi my name is xxxx. How are
              you?
            </h2>
            <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              5 sec ago
            </p>
          </div>
          {/* right side msg */}
          {/* left side msg */}
          <div className="flex flex-col items-start justify-start relative group">
            <h2 className="message max-w-[70%] text-wrap p-2 bg-gray-200 rounded-tl-xl rounded-bl-sm rounded-tr-xl rounded-br-xl relative z-10">
              Hello my name is xxxx. what is your name Hello my name is xxxx.
              what is your nameHello my name is xxxx. what is your name
            </h2>
            <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              2 min ago
            </p>
          </div>
          {/* left side msg */}

          {/* right side msg */}
          <div className="flex flex-col items-end justify-end relative group">
            <h2 className="message max-w-[70%] text-wrap p-2 bg-green-500 text-white rounded-tl-xl rounded-bl-xl rounded-br-sm rounded-tr-xl relative z-10">
              Hi my name is xxxx. How are you? Hi my name is xxxx. How are
              you?Hi my name is xxxx. How are you?Hi my name is xxxx. How are
              you?
            </h2>
            <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              5 sec ago
            </p>
          </div>
          {/* right side msg */}
          {/* left side msg */}
          <div className="flex flex-col items-start justify-start relative group">
            <h2 className="message max-w-[70%] text-wrap p-2 bg-gray-200 rounded-tl-xl rounded-bl-sm rounded-tr-xl rounded-br-xl relative z-10">
              Hello my name is xxxx. what is your name Hello my name is xxxx.
              what is your nameHello my name is xxxx. what is your name
            </h2>
            <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              2 min ago
            </p>
          </div>
          {/* left side msg */}

          {/* right side msg */}
          <div className="flex flex-col items-end justify-end relative group">
            <h2 className="message max-w-[70%] text-wrap p-2 bg-green-500 text-white rounded-tl-xl rounded-bl-xl rounded-br-sm rounded-tr-xl relative z-10">
              Hi my name is xxxx. How are you? Hi my name is xxxx. How are
              you?Hi my name is xxxx. How are you?Hi my name is xxxx. How are
              you?
            </h2>
            <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              5 sec ago
            </p>
          </div>
          {/* right side msg */}
        </div>
        {/* Chat part */}
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
        <div className="absolute z-12 bottom-[11%] right-[12%]">
          <EmojiPicker open={emojiOpen} onEmojiClick={handleEmoji} />
        </div>
      </div>
    </>
  );
};

export default Chat;
