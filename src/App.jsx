import React from 'react';
import Home from './Components/Home'
import 'swiper/css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import Dashboard from './Components/Dashboard';
import EmailVerification from './Components/EmailVerification';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/EmailVerification" element={<EmailVerification/>}/>
      </Routes>
    </Router>
  )
}

export default App