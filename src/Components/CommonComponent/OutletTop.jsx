import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const OutletTop = ({ Title }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [userList, setUserList] = useState([]);
   /**
   * todo : Data fetch from users database
   * @param (null)
   * @description : This function fetches the data from the users database and sets it to the userList state.
   */
  useEffect(() => {
    const fetchData = () => {
      const db = getDatabase();
      const userRep = ref(db, "users/");
      onValue(userRep, (snapshot) => {
        let data = {};
        snapshot.forEach((item) => {
          if (auth.currentUser.uid === item.val().uid) {
            data = { ...item.val(), userkey: item.key };
          }
        });
        setUserList(data);
      });
    };
    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-[30px]  font-semibold flex items-center gap-2">
        {Title}
      </h2>
      <div className="flex items-center gap-3">
        <Link
          to={"/rootlayout/Notification"}
          className="p-2 rounded-full text-gray-600 bg-white text-[25px] cursor-pointer"
        >
          <IoIosNotifications />
        </Link>
        <img
          onClick={() => navigate("/rootlayout/Dashboard")}
          className="w-10 h-10 rounded-full cursor-pointer"
          src={
            userList.profile_picture ||
            "https://www.w3schools.com/howto/img_avatar.png"
          }
          alt="Your Profile Picture"
        />
      </div>
    </>
  );
};

export default OutletTop;
