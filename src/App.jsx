import React, { useState } from "react";
import Home from "./Pages/Home";
import "swiper/css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import Dashboard from "./Pages/Dashboard";
import EmailVerification from "./Components/EmailVerification";
import RootLayout from "./Components/RootLayout/RootLayout";
import Message from "./Pages/Message";
import Notification from "./Pages/Notification";
import Setting from "./Pages/Setting";
import EditProfileInfo from "./Components/SettingComponent/EditProfileInfo";
import EditProfile from "./Components/SettingComponent/EditProfile";
import ChangePassword from "./Components/SettingComponent/ChangePassword";
import BlockList from "./Components/SettingComponent/BlockList";
import DeleteAccount from "./Components/SettingComponent/DeleteAccount";
import DefaltComponent from "./Components/SettingComponent/DefaltComponent";
import Friends from "./Components/DashboardComponents/Friends";
import Groups from "./Components/DashboardComponents/Groups";
import Chat from "./Components/MessageComponent/Chat";
import ChatFriend from "./Components/MessageComponent/ChatFriend";
import ChatGroup from "./Components/MessageComponent/ChatGroup";
import PrivateRoute from "./Components/Routes/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route index element={<SignUp />} />
        <Route path="*" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/EmailVerification" element={<EmailVerification />} />

        {/* private routes */}
        {/* <Route element={<PrivateRoute />}> */}
          <Route path="/rootlayout" element={<RootLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Message" element={<Message />}>
              <Route index element={<ChatFriend />} />
              <Route path="Friends" element={<ChatFriend />} />
              <Route path="Group" element={<ChatGroup />} />
              <Route path="Chat" element={<Chat />} />
            </Route>
            <Route path="Notification" element={<Notification />} />
            <Route path="Setting" element={<Setting />}>
              <Route index element={<DefaltComponent />} />
              <Route path="editProfileInfo" element={<EditProfileInfo />} />
              <Route path="editProfile" element={<EditProfile />} />
              <Route path="ChangePassword" element={<ChangePassword />} />
              <Route path="blockList" element={<BlockList />} />
              <Route path="DeleteAccount" element={<DeleteAccount />} />
            </Route>
          </Route>
        {/* </Route> */}
      </Routes>
    </Router>
  );
};

export default App;
