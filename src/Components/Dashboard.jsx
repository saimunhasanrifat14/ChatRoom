import { getAuth } from "firebase/auth";
import { get } from "firebase/database";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosNotifications } from "react-icons/io";
import { SlArrowDown } from "react-icons/sl";
import { Link } from "react-router-dom";
import Profile from "./DashboardComponents/Profile";
import UserList from "./DashboardComponents/UserList";
import Friends from "./DashboardComponents/Friends";
import Groups from "./DashboardComponents/Groups";
import OutletTop from "./CommonComponent/OutletTop";

const Dashboard = () => {
  const auth = getAuth();
  return (
    <>
      <div className="flex flex-col gap-2 w-full h-full">
        <div className="h-[9%] flex items-center justify-between w-full">
          <OutletTop Title={"My Profile"} />
        </div>
        <div className="h-[91%] flex gap-6 items-center w-full">
          <div className="w-[67%] h-full flex flex-col gap-6">
            <div className="h-[50%] bg-white rounded-xl ">
              <Profile />
            </div>
            <div className="h-[50%] w-full flex items-center gap-6 ">
              <div className="h-full w-[50%] bg-[#ffffff] rounded-xl ">
                <Groups />
              </div>
              <div className="h-full w-[50%] bg-[#ffffff] rounded-xl ">
                <Friends />
              </div>
            </div>
          </div>
          <div className="w-[33%] h-full rounded-xl bg-[#ffffff]">
            <UserList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
