import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const UserList = () => {
  // const UserList = [
  //   {
  //     name: "Raghav",
  //     message: "Dinner?",
  //     image: "https://www.w3schools.com/howto/img_avatar.png",
  //   },
  //   {
  //     name: "Swathi",
  //     message: "Sure!.",
  //     image: "https://www.w3schools.com/howto/img_avatar.png",
  //   },
  //   {
  //     name: "Kiran",
  //     message: "Hi.....",
  //     image: "https://www.w3schools.com/howto/img_avatar.png",
  //   },
  //   {
  //     name: "Raghav Rathe",
  //     message: "Hello.....",
  //     image: "https://www.w3schools.com/howto/img_avatar.png",
  //   },
  //   {
  //     name: "Swathi",
  //     message: "Sure!.",
  //     image: "https://www.w3schools.com/howto/img_avatar.png",
  //   },
  //   {
  //     name: "Kiran",
  //     message: "Hi.....",
  //     image: "https://www.w3schools.com/howto/img_avatar.png",
  //   },
  //   {
  //     name: "Raghav Rathe",
  //     message: "Hello.....",
  //     image: "https://www.w3schools.com/howto/img_avatar.png",
  //   },
  //   {
  //     name: "Swathi",
  //     message: "Sure!.",
  //     image: "https://www.w3schools.com/howto/img_avatar.png",
  //   },
  //   {
  //     name: "Kiran",
  //     message: "Hi.....",
  //     image: "https://www.w3schools.com/howto/img_avatar.png",
  //   },
  //   {
  //     name: "Raghav Rathe",
  //     message: "Hello.....",
  //     image: "https://www.w3schools.com/howto/img_avatar.png",
  //   },
  //   {
  //     name: "Swathi",
  //     message: "Sure!.",
  //     image: "https://www.w3schools.com/howto/img_avatar.png",
  //   },
  //   {
  //     name: "Kiran",
  //     message: "Hi.....",
  //     image: "https://www.w3schools.com/howto/img_avatar.png",
  //   },
  // ];

  const db = getDatabase();
  const auth = getAuth();
  const [userList, setUserList] = useState([]);
  /**
   * todo : Data fetch from users database
   * @param (null)
   * @description : This function fetches the data from the users database and sets it to the userList state.
   */
  useEffect(() => {
    const fetchData = () => {
      const UserRef = ref(db, "users/");
      onValue(UserRef, (snapshot) => {
        let data = [];
        snapshot.forEach((item) => {
          if (auth.currentUser.uid !== item.val().uid) {
            data.push({ ...item.val(), userkey: item.key });
          }
        });
        setUserList(data);
      });
    };
    fetchData();
  }, []);

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
            {userList?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 py-3 border-b border-b-gray-300 last:border-b-0 "
              >
                <img
                  src={item.profile_picture}
                  alt={item.username}
                  className="w-12 h-12 rounded-full object-cover "
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.username}</h3>
                  <p className="text-gray-500 text-sm">hello</p>
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
