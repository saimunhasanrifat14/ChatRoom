import React from "react";
import Profile from "../Components/DashboardComponents/Profile";
import UserList from "../Components/DashboardComponents/UserList";
import Friends from "../Components/DashboardComponents/Friends";
import Groups from "../Components/DashboardComponents/Groups";
import OutletTop from "../Components/CommonComponent/OutletTop";

const Dashboard = ({ userList }) => {
  return (
    <>
      <div className="flex flex-col gap-0 sm:gap-2 w-full h-full">
        <div className="h-[9%]  w-full">
          <OutletTop userList={userList} Title={"My Profile"} />
        </div>
        <div className="h-[91%] flex flex-col sm:flex-row gap-0 sm:gap-4 items-center w-full">
          <div className="w-[100%] sm:w-[67%]  h-full flex flex-col gap-0 sm:gap-4">
            <div className="h-[50%] bg-BGWhite rounded-none sm:rounded-xl border-b-2 sm:border-b-0 border-SidebarRightBorder">
              <Profile userList={userList} />
            </div>
            <div className="h-[50%] w-full flex flex-col-reverse sm:flex-row items-center gap-0 sm:gap-4 ">
              <div className="h-full w-[100%] sm:w-[50%] bg-BGWhite rounded-none sm:rounded-xl border-b-2 sm:border-b-0 border-SidebarRightBorder">
                <Groups />
              </div>
              <div className="h-full w-[100%] sm:w-[50%] bg-BGWhite rounded-none sm:rounded-xl border-b-2 sm:border-b-0 border-SidebarRightBorder">
                <Friends showButton={true} />
              </div>
            </div>
          </div>
          <div className="w-[100%] sm:w-[33%] h-full rounded-none sm:rounded-xl bg-BGWhite">
            <UserList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
