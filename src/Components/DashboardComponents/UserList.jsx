import React, { useEffect, useState } from "react";
import { FaPlus, FaUserClock } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
import UserlistSkeleton from "../../Skeleton/UserListSkeleton";

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
  const [notifications, setnotifications] = useState([]);
  const [allFriends, setallFriends] = useState([]);
  const [friends, setfriends] = useState([]);
  const [pendingRequest, setpendingRequest] = useState(false);
  const [LogedUser, setLogedUser] = useState({});
  const [blockList, setblockList] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * todo : Data fetch from users database
   * @param (null)
   * @description : This function fetches the data from the users database and sets it to the userList state.
   */
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const UserRef = ref(db, "users/");
      onValue(UserRef, (snapshot) => {
        let data = [];
        const currentUid = auth.currentUser.uid;
        snapshot.forEach((item) => {
          const user = item.val();

          if (user.uid === currentUid) {
            setLogedUser({ ...user, userkey: item.key });
            return;
          }
          // Check if already friend
          const isFriend = allFriends.some(
            (friend) =>
              (friend.senderUserId === currentUid &&
                friend.reciverUserId === user.uid) ||
              (friend.reciverUserId === currentUid &&
                friend.senderUserId === user.uid)
          );
          // Check if blocked (either sender or receiver)
          const isBlocked = blockList.some(
            (block) =>
              (block.senderUserId === currentUid &&
                block.reciverUserId === user.uid) ||
              (block.reciverUserId === currentUid &&
                block.senderUserId === user.uid)
          );

          if (!isFriend && !isBlocked) {
            data.push({ ...user, userkey: item.key });
          }
        });
        setUserList(data);
        setLoading(false);
      });
    };

    fetchData();
  }, [allFriends, blockList]);

  /**
   * todo : Data fetch from Notification database
   * @param (null)
   * @description : This function fetches the data from the Notification database and sets it to the notifications state.
   */
  useEffect(() => {
    const fetchData = () => {
      const UserRef = ref(db, "notification/");
      onValue(UserRef, (snapshot) => {
        let data = [];
        snapshot.forEach((item) => {
          if (
            (auth.currentUser.uid === item.val().reciverUserId ||
              LogedUser.uid === item.val().senderId) &&
            item.val().status === "Friend Request"
          ) {
            data.push(auth.currentUser.uid.concat(item.val().reciverUserId));
          }
        });
        setnotifications(data);
      });
    };
    fetchData();
  }, []);

  /**
   * todo : Data fetch from friends database
   * @param (null)
   * @description : This function fetches the data from the friends database and sets it to the notifications state.
   */
  useEffect(() => {
    const fetchData = () => {
      const UserRef = ref(db, "friends/");
      onValue(UserRef, (snapshot) => {
        let data = [];
        let alldata = [];
        snapshot.forEach((item) => {
          if (
            auth.currentUser.uid === item.val().reciverUserId ||
            LogedUser.userUid === item.val().senderUserId
          ) {
            data.push(item.val().senderUserId.concat(item.val().reciverUserId));
          }
          if (
            auth.currentUser.uid === item.val().reciverUserId ||
            auth.currentUser.uid === item.val().senderUserId
          ) {
            alldata.push({ ...item.val(), friendsKey: item.key });
          }
        });
        setfriends(data);
        setallFriends(alldata);
      });
    };
    fetchData();
  }, []);

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
          if (
            blockUser.senderUserId === currentUid ||
            blockUser.reciverUserId === currentUid
          ) {
            data.push({ ...blockUser, blockKey: item.key });
          }
        });
        setblockList(data);
      });
    };
    fetchData();
  }, []);
  console.log("data from block data", blockList);

  /**
   * todo : Handle friend request functionality
   * @param (null)
   * @description : This function fetches the data from the users database and sets it to the userList state.
   */
  const handleFriendRequest = (reciver) => {
    set(push(ref(db, "notification/")), {
      senderUserName: auth.currentUser.displayName,
      senderEmail: auth.currentUser.email,
      senderProfilePicture: auth.currentUser.photoURL,
      senderUserId: auth.currentUser.uid,

      reciverUserName: reciver.username,
      reciverEmail: reciver.email,
      reciverProfilePicture: reciver.profile_picture,
      reciverUserId: reciver.uid,

      senderReciveruid: auth.currentUser.uid.concat(reciver.uid),
      message: `has sent you a friend request`,
      sendAt: moment().format("MMMM Do YYYY, h:mm a"),
      status: "Friend Request",
      acceptButton: "Accept",
      rejectButton: "Reject",
    })
      .then(() => {
        console.log("Notification sent successfully");
        setpendingRequest(true);
      })
      .catch((error) => {
        console.error("Error sending notification: ", error);
      });
  };

  if (loading) {
    return (
      <div className="overflow-hidden">
        <UserlistSkeleton />
      </div>
    );
  }

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
            {userList.length == 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p className="text-lg font-semibold">No users available</p>
                <p className="text-sm text-center max-w-xs mt-1">
                  No users found. Please check back later or try searching for
                  someone.
                </p>
              </div>
            ) : (
              userList?.map((item, index) => (
                <div
                  key={item.uid}
                  className="flex items-center gap-4 py-3 border-b border-b-gray-300 last:border-b-0 "
                >
                  <img
                    src={item.profile_picture}
                    alt={item.username}
                    className="w-12 h-12 rounded-full object-cover "
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {item.username}
                    </h3>
                    <p className="text-gray-500 text-sm">hello</p>
                  </div>

                  {notifications.includes(
                    auth.currentUser.uid.concat(item.uid)
                  ) ? (
                    <button className="bg-[#3cae64] w-18 flex items-center justify-center mr-2 text-white py-2 rounded-lg font-semibold">
                      <FaUserClock />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFriendRequest(item)}
                      className="bg-[#3cae64] mr-2 text-white w-18 py-1 rounded-lg font-semibold cursor-pointer"
                    >
                      Add
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
