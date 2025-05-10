import React, { useEffect, useState } from "react";
import { FaPlus, FaUserFriends } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
const Friends = () => {
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
  ];
  const db = getDatabase();
  const auth = getAuth();
  const [friendsList, setfriendsList] = useState([]);

  /**
   * todo : Data fetch from friends database
   * @param (null)
   * @description : This function fetches the data from the friends database and sets it to the friendsList state.
   */
  useEffect(() => {
    const fetchData = () => {
      const UserRef = ref(db, "friends/");
      onValue(UserRef, (snapshot) => {
        let data = [];
        snapshot.forEach((item) => {
          if (
            auth.currentUser.uid !== item.val().uid &&
            auth.currentUser.uid === item.val().reciverUserId
          ) {
            data.push({ ...item.val(), friendsKey: item.key });
          }
        });
        setfriendsList(data);
      });
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="px-5 pb-5 pt-3 h-[100%] rounded-2xl">
        <div className="h-[13%] flex justify-between items-center">
          <h2 className="flex items-center gap-3 text-lg font-semibold">
            Friends
          </h2>
          <span className="text-blueColor text-[20px] cursor-pointer">
            <HiOutlineDotsVertical />
          </span>
        </div>
        <div className="h-[87%] overflow-auto [&::-webkit-scrollbar]:hidden">
          {friendsList?.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 py-3 border-b border-b-gray-300 last:border-b-0 "
            >
              <img
                src={item.senderProfilePicture}
                alt={item.senderUserName}
                className="w-12 h-12 rounded-full object-cover "
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {item.senderUserName}
                </h3>
                <p className="text-gray-500 text-sm">{item.acceptAt}</p>
              </div>
              <span className="bg-[#3cae64] mr-2 text-white px-5 py-2 rounded-lg font-semibold cursor-pointer">
                <FaUserFriends />
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Friends;
