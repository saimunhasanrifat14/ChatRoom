import React from 'react';
import Home from './Components/Home'
import 'swiper/css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import Dashboard from './Components/Dashboard';
import EmailVerification from './Components/EmailVerification';
import RootLayout from './Components/RootLayout/RootLayout';
import UserList from './Components/DashboardComponents/UserList';
import Friends from './Components/DashboardComponents/Friends';
import FriendRequest from './Components/DashboardComponents/FriendRequest';
import Message from './Components/Message';
import Notification from './Components/Notification';
import Setting from './Components/Setting';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Home/>}/>
        <Route index element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/rootlayout" element={<RootLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='Dashboard' element={<Dashboard/>}/>
          <Route path="Message" element={<Message/>}/>
          <Route path='Notification' element={<Notification/>}/>
          <Route path='Setting' element={<Setting/>}/>
        </Route>
        <Route path="/EmailVerification" element={<EmailVerification/>}/>

      </Routes>
    </Router>
  )
}

export default App