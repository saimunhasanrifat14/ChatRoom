import React, { useEffect, useState } from "react";
import Home from "./Components/Home";
import "swiper/css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogIn";
import Dashboard from "./Components/Dashboard";
import EmailVerification from "./Components/EmailVerification";
import RootLayout from "./Components/RootLayout/RootLayout";
import UserList from "./Components/DashboardComponents/UserList";
import Friends from "./Components/DashboardComponents/Friends";
import FriendRequest from "./Components/DashboardComponents/Groups";
import Message from "./Components/Message";
import Notification from "./Components/Notification";
import Setting from "./Components/Setting";
import EditProfileInfo from "./Components/SettingComponent/EditProfileInfo";
import EditProfile from "./Components/SettingComponent/EditProfile";
import ChangePassword from "./Components/SettingComponent/ChangePassword";
import BlockList from "./Components/SettingComponent/BlockList";
import DeleteAccount from "./Components/SettingComponent/DeleteAccount";
import DefaltComponent from "./Components/SettingComponent/DefaltComponent";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, set, push } from "firebase/database";

const App = () => {
  const [userList, setUserList] = useState([]);
  const db = getDatabase();
  const auth = getAuth();
  /**
   * todo : Data fetch from users database
   * @param (null)
   * @description : This function fetches the data from the users database and sets it to the userList state.
   */
  useEffect(() => {
    const fetchData = () => {
      const UserRef = ref(db, "users/");
      onValue(UserRef, (snapshot) => {
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
    <Router>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/rootlayout" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="Dashboard" element={<Dashboard userList={userList} />} />
          <Route path="Message" element={<Message userList={userList} />} />
          <Route
            path="Notification"
            element={<Notification userList={userList} />}
          />
          <Route path="Setting" element={<Setting userList={userList} />}>
            <Route index element={<DefaltComponent />} />
            <Route
              path="editProfileInfo"
              element={<EditProfileInfo userList={userList} />}
            />
            <Route path="editProfile" element={<EditProfile />} />
            <Route path="ChangePassword" element={<ChangePassword />} />
            <Route path="blockList" element={<BlockList />} />
            <Route path="DeleteAccount" element={<DeleteAccount />} />
          </Route>
        </Route>
        <Route path="/EmailVerification" element={<EmailVerification />} />
      </Routes>
    </Router>
  );
};

export default App;
