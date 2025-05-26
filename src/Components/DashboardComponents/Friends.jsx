import React, { useEffect, useState } from "react";
import { FaPlus, FaUserFriends } from "react-icons/fa";
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
import FriendAction from "../../features/slices/friendslice";
import { useDispatch } from "react-redux";

const Friends = ({ showButton }) => {
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
  const dispatch = useDispatch();


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
          const friend = item.val();
          const currentUid = auth.currentUser.uid;
          if (
            friend.status === "accepted" &&
            (friend.senderUserId === currentUid ||
              friend.reciverUserId === currentUid)
          ) {
            data.push({ ...friend, friendsKey: item.key });
          }
        });
        setfriendsList(data);
      });
    };
    fetchData();
  }, []);

  /**
   * todo : Block Friend
   * @param {Object} item - Friend data object.
   * @description : Blocks a user by saving block data to "block/" database, then removes the friend from "friends/".
   */
  const handleBlockBtn = (item) => {
    const currentUserId = auth.currentUser.uid;

    let senderData, receiverData;

    if (currentUserId === item.senderUserId) {
      senderData = {
        userName: item.senderUserName,
        email: item.senderEmail,
        profilePicture: item.senderProfilePicture,
        userId: item.senderUserId,
      };
      receiverData = {
        userName: item.reciverUserName,
        email: item.reciverEmail,
        profilePicture: item.reciverProfilePicture,
        userId: item.reciverUserId,
      };
    } else {
      senderData = {
        userName: item.reciverUserName,
        email: item.reciverEmail,
        profilePicture: item.reciverProfilePicture,
        userId: item.reciverUserId,
      };
      receiverData = {
        userName: item.senderUserName,
        email: item.senderEmail,
        profilePicture: item.senderProfilePicture,
        userId: item.senderUserId,
      };
    }

    set(push(ref(db, "block/")), {
      sendAt: moment().format("MMMM Do YYYY, h:mm a"),
      status: "blocked",

      senderUserName: auth.currentUser.displayName,
      senderEmail: auth.currentUser.email,
      senderProfilePicture: auth.currentUser.photoURL,
      senderUserId: auth.currentUser.uid,

      reciverUserName: receiverData.userName,
      reciverEmail: receiverData.email,
      reciverProfilePicture: receiverData.profilePicture,
      reciverUserId: receiverData.userId,
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log("error from block", err);
      });

    const reference = ref(db, `friends/${item.friendsKey}`);
    remove(reference);
  };

  const handlefriendinfo = (friendInfo) => {
    console.log("Friend Info:", friendInfo);
    let userobject = {};
    if (auth.currentUser.uid === friendInfo.senderUserId) {
      userobject = {
        userName: friendInfo.reciverUserName,
        email: friendInfo.reciverEmail,
        profilePicture: friendInfo.reciverProfilePicture,
        userId: friendInfo.reciverUserId,
      };
    }
    if(auth.currentUser.uid === friendInfo.reciverUserId){
      userobject = {
        userName: friendInfo.senderUserName,
        email: friendInfo.senderEmail,  
        profilePicture: friendInfo.senderProfilePicture,
        userId: friendInfo.senderUserId,
      }
    }
    console.log("userobject", userobject);
    dispatch(FriendAction(userobject));
  };
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
          {friendsList?.map((item, index) => {
            const currentUid = auth.currentUser.uid;
            const isSender = item.senderUserId === currentUid;

            const friendName = isSender
              ? item.reciverUserName
              : item.senderUserName;
            const friendPhoto = isSender
              ? item.reciverProfilePicture
              : item.senderProfilePicture;

            return (
              <div
                onClick={() => handlefriendinfo(item)}
                key={item.friendsKey}
                className="flex items-center gap-4 py-3 border-b border-b-gray-300 last:border-b-0 cursor-pointer"
              >
                <img
                  src={friendPhoto}
                  alt={friendName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{friendName}</h3>
                  <p className="text-gray-500 text-sm">{item.sendAt}</p>
                </div>
                {showButton ? (
                  <button
                    onClick={() => handleBlockBtn(item)}
                    className="bg-red-400 mr-2 text-white px-5 py-1 rounded-lg font-semibold cursor-pointer"
                  >
                    BLock
                  </button>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Friends;
