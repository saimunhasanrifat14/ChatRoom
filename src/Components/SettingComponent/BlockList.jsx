import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";

const BlockList = () => {
  const blockedUsers = [
    {
      name: "Raghav",
      message: "Blocked for spamming",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
      name: "Swathi",
      message: "Blocked due to inactivity",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
      name: "Kiran",
      message: "Blocked for inappropriate content",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
      name: "Raghav",
      message: "Blocked for spamming",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
      name: "Swathi",
      message: "Blocked due to inactivity",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
  ];
  const db = getDatabase();
  const auth = getAuth();
  const [blockList, setblockList] = useState([]);

  /**
   * todo : Data fetch from friends database
   * @param (null)
   * @description : This function fetches the data from the friends database and sets it to the friendsList state.
   */
  useEffect(() => {
    const fetchData = () => {
      const UserRef = ref(db, "block/");
      onValue(UserRef, (snapshot) => {
        let data = [];
        snapshot.forEach((item) => {
          const blockUser = item.val();
          const currentUid = auth.currentUser.uid;
          if (blockUser.senderUserId === currentUid)
            data.push({ ...blockUser, blockKey: item.key });
        });
        setblockList(data);
      });
    };
    fetchData();
  }, []);

  // Unblocks a user by removing their entry from the Firebase block list
  const handleUnblockBtn = (item) => {
    const reference = ref(db, `block/${item.blockKey}`);
    remove(reference);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="px-5 pb-5 pt-3 h-full rounded-2xl bg-white">
        <div className="h-[8%] flex justify-between items-center pb-2">
          <h2 className="flex items-center gap-3 text-lg font-semibold text-black">
            Blocked Users
          </h2>
          <span className="text-blueColor text-[20px] cursor-pointer">
            <HiOutlineDotsVertical />
          </span>
        </div>
        <div className="h-[92%] overflow-auto [&::-webkit-scrollbar]:hidden">
          {blockList.map((user, index) => (
            <div
              key={index}
              className="flex items-center gap-4 py-3 border-b border-b-gray-300 last:border-b-0"
            >
              <img
                src={user.reciverProfilePicture}
                alt={user.reciverUserName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {user.reciverUserName}
                </h3>
                <p className="text-gray-500 text-sm">{user.sendAt}</p>
              </div>
              <button
                onClick={() => handleUnblockBtn(user)}
                className="bg-[#EF4444] hover:bg-[#dc2626] text-white px-5 py-1 rounded-lg font-semibold cursor-pointer"
              >
                Unblock
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockList;
