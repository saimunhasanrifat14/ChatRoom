import React from "react";
import OutletTop from "../Components/CommonComponent/OutletTop";
import Groups from "../Components/DashboardComponents/Groups";
import Friends from "../Components/DashboardComponents/Friends";
import Chat from "../Components/MessageComponent/Chat";
import { Link, Outlet, useLocation } from "react-router-dom";

const Message = ({ userList }) => {
  const location = useLocation();

  const isChatRoute = location.pathname === "/rootlayout/Message/Chat";

  const menuitem = [
    { id: 1, name: "Friends", path: "/rootlayout/Message/Friends" },
    { id: 2, name: "Groups", path: "/rootlayout/Message/Group" },
  ];

  return (
    <div className="flex flex-col sm:gap-2 gap-0 w-full h-full">
      {!isChatRoute && (
        <div className="h-[9%] flex items-center justify-between w-full">
          <OutletTop userList={userList} Title={"Message"} />
        </div>
      )}

      {!isChatRoute ? (
        <div className="hidden sm:flex h-[91%] flex-col sm:flex-row sm:gap-4 gap-0 items-center w-full">
          <div className="hidden sm:flex h-full sm:w-[33%] w-full flex-col sm:gap-4 gap-0">
            <div className="flex-1 min-h-0 bg-BGWhite sm:rounded-lg rounded-none">
              <Groups />
            </div>
            <div className="flex-1 min-h-0 bg-BGWhite sm:rounded-lg rounded-none">
              <Friends showButton={false} />
            </div>
          </div>
          <div className="h-full sm:w-[67%] w-full bg-BGWhite sm:rounded-lg rounded-none flex flex-col justify-between">
            <Chat />
          </div>
        </div>
      ) : (
        // Show only Chat when route is /Chat
        <div className="h-full w-full bg-BGWhite sm:rounded-lg rounded-none">
          <Chat />
        </div>
      )}

      {!isChatRoute && (
        <div className="flex sm:hidden flex-col bg-BGWhite py-4 h-full">
          <div className="flex gap-3 ml-5 text-TextDarkGray">
            {menuitem.map((item) => (
              <Link key={item.id} to={item.path}>
                {item.name}
              </Link>
            ))}
          </div>
          <div className="h-full">
            <Outlet showname={true}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
