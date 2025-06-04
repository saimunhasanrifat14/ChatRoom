import React from "react";
import Profile from "../Components/DashboardComponents/Profile";
import UserList from "../Components/DashboardComponents/UserList";
import Friends from "../Components/DashboardComponents/Friends";
import Groups from "../Components/DashboardComponents/Groups";
import OutletTop from "../Components/CommonComponent/OutletTop";

const Dashboard = ({ userList }) => {
  return (
    <>
      <div className="flex flex-col gap-2 w-full h-full">
        <div className="h-[10%] flex items-center justify-between w-full">
          <OutletTop userList={userList} Title={"My Profile"} />
        </div>
        <div className="h-[90%] flex gap-4 items-center w-full">
          <div className="w-[67%] h-full flex flex-col gap-4">
            <div className="h-[50%] bg-BGWhite rounded-xl ">
              <Profile userList={userList} />
            </div>
            <div className="h-[50%] w-full flex items-center gap-4 ">
              <div className="h-full w-[50%] bg-BGWhite rounded-xl ">
                <Groups />
              </div>
              <div className="h-full w-[50%] bg-BGWhite rounded-xl ">
                <Friends showButton={true} />
              </div>
            </div>
          </div>
          <div className="w-[33%] h-full rounded-xl bg-BGWhite">
            <UserList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
