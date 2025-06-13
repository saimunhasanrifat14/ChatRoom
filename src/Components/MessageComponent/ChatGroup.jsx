import React, { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoCloseCircle } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import Modal from "react-modal";

const Groups = () => {
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
  ];

  const [showMenu, setShowMenu] = useState(false);

  const handleCreateGroup = () => {
    setShowMenu(false);
    openModal();
  };
  const handleSeeYourGroup = () => {
    setShowMenu(false);
    alert("clicked");
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "30%",
      transform: "translate(-50%, -50%)",
      border: "none",
      boxShadow: "0 0px 50px rgba(0, 0, 0, 0.15)",
    },
  };

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="px-5 pb-5 pt-3 h-full rounded-2xl">
        <div className="h-[87%] overflow-auto [&::-webkit-scrollbar]:hidden">
          {UserList?.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 py-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover "
              />
              <div className="flex-1">
                <h3 className="font-semibold text-TextDarkGray">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.message}</p>
              </div>
              <span className="bg-buttonsBG mr-2 text-white px-5 py-1 rounded-lg font-semibold cursor-pointer">
                Join
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* modal part */}
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <div className="w-full flex items-end justify-end ">
            <button
              className="text-[30px] text-red-400 cursor-pointer"
              onClick={closeModal}
            >
              <IoCloseCircle />
            </button>
          </div>
          <form>
            <h2 className="text-center text-[25px] font-semibold mb-5">
              Create Group
            </h2>
            <div className="flex flex-col gap-3 mb-5">
              <div className="w-full">
                <input
                  placeholder="Group Name"
                  name="Name"
                  className="bg-gray-200 py-2 px-3 rounded w-full"
                  type="text"
                />
              </div>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    name="Profile"
                    id="file-upload"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
              <button className="py-3 bg-green-500 text-white rounded cursor-pointer ">
                Create
              </button>
            </div>
          </form>
        </Modal>
        {UserList.map((item) => {
          <div className="flex flex-col justify-center items-center gap-3 bg-gray-200">
            <img
              className="w-50 h-50 rounded-full"
              src={item.profile}
              alt={item.username}
            />
            <h1 className="text-2xl text-black font-bold">{item.username}</h1>
            <p className="text-sm text-gray-500 font-normal">{item.summary}</p>
            <button className="py-5 p-4 bg-blue-700 hover:bg-blue-900 rounded-xl">
              {item.readmore}
            </button>
          </div>;
        })}
      </div>
    </>
  );
};

export default Groups;
