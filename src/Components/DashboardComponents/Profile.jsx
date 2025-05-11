import React, { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const Profile = ({ userList }) => {
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
      <div className="w-full h-full p-10 flex gap-7">
        <div className="w-[25%]">
          <img
            className="w-full rounded-full"
            src={
              userList?.profile_picture ||
              "https://www.w3schools.com/howto/img_avatar.png"
            }
            alt="Your profile"
          />
        </div>
        <div className="flex flex-col justify-between w-[75%]">
          <div className="flex flex-col gap-4">
            <h1 className="text-[50px] leading-[55px] font-semibold">
              {userList?.username || "Username"}
            </h1>
            <p className="text-gray-600">{userList?.bio}</p>
          </div>
          <div className="flex items-center gap-8">
            <p className="flex items-center gap-2 text-gray-600">
              <span>
                <FaUserFriends />
              </span>
              Friends{" "}
              <span className="font-bold text-black">
                {friendsList ? friendsList.length : "0"}
              </span>{" "}
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              {" "}
              <span className="text-[20px]">
                {" "}
                <MdGroups />
              </span>
              Groups <span className="font-bold text-black">3</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
