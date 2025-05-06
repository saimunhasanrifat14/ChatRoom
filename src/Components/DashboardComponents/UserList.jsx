import React from "react";
import { FaPlus } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";

const UserList = () => {
  const UserList = [
    {
      name: "Raghav",
      message: "Dinner?",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
      name: "Swathi",
      message: "Sure!.",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
      name: "Kiran",
      message: "Hi.....",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
      name: "Raghav Rathe",
      message: "Hello.....",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
      name: "Swathi",
      message: "Sure!.",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
      name: "Kiran",
      message: "Hi.....",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
      name: "Raghav Rathe",
      message: "Hello.....",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
      name: "Swathi",
      message: "Sure!.",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
      name: "Kiran",
      message: "Hi.....",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
      name: "Raghav Rathe",
      message: "Hello.....",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
      name: "Swathi",
      message: "Sure!.",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
      name: "Kiran",
      message: "Hi.....",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
  ];
  return (
    <>
      <div className="h-[100%] flex flex-col justify-between">
        <div className="px-5 pb-5 pt-3 h-full rounded-2xl">
          <div className="h-[6%] flex justify-between items-center">
            <h2 className="flex items-center gap-3 text-lg font-semibold">
              Users
            </h2>
            <span className="text-blueColor text-[20px] cursor-pointer">
              <HiOutlineDotsVertical />
            </span>
          </div>
          <div className="h-[94%] overflow-auto [&::-webkit-scrollbar]:hidden">
            {UserList?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 py-3 border-b border-b-gray-300 last:border-b-0 "
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover "
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.message}</p>
                </div>
                <button className="bg-[#3cae64] mr-2 text-white px-5 py-1 rounded-lg font-semibold cursor-pointer">
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
