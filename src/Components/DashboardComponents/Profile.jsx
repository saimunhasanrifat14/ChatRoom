import React, { useContext, useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { UserContext } from "../../Context/UserContext";
import ProfileSkeleton from "../../Skeleton/ProfileSkeleton";

const Profile = () => {
  // all hook and veriable
  const db = getDatabase();
  const auth = getAuth();
  const [friendsList, setfriendsList] = useState([]);

  // Gets the logged-in user's data and loading state from UserContext.
  const { userList, loading } = useContext(UserContext);

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
            auth.currentUser.uid === item.val().reciverUserId ||
            auth.currentUser.uid === item.val().senderUserId
          ) {
            data.push({ ...item.val(), friendsKey: item.key });
          }
        });
        setfriendsList(data);
      });
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="overflow-hidden">
        <ProfileSkeleton />
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-full p-10 flex gap-7">
        <div className="w-[25%]">
          <img
            className="w-full object-cover h-auto aspect-square rounded-full"
            src={
              userList?.profile_picture ||
              "https://www.w3schools.com/howto/img_avatar.png"
            }
            alt="Your profile"
          />
        </div>
        <div className="w-[75%] flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-[50px] text-TextBlack leading-[55px] font-semibold">
              {userList?.username || "Username"}
            </h1>
            <p className="text-TextGray">{userList?.bio}</p>
          </div>
          <div className="flex items-center gap-8">
            <p className="flex items-center gap-2 text-TextGray">
              <span>
                <FaUserFriends />
              </span>
              Friends{" "}
              <span className="font-bold text-TextBlack">
                {friendsList ? friendsList.length : "0"}
              </span>{" "}
            </p>
            <p className="flex items-center gap-2 text-TextGray">
              {" "}
              <span className="text-[20px]">
                {" "}
                <MdGroups />
              </span>
              Groups <span className="font-bold text-TextBlack">3</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
