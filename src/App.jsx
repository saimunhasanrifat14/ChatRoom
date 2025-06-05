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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<SignUp />} />
        <Route path="*" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/rootlayout" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Message" element={<Message />} />
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
        <Route path="/EmailVerification" element={<EmailVerification />} />
      </Routes>
    </Router>
  );
};

export default App;
