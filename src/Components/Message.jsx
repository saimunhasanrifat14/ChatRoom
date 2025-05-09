import React from "react";
import OutletTop from "./CommonComponent/OutletTop";
import Groups from "./DashboardComponents/Groups";
import Friends from "./DashboardComponents/Friends";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Chat from "./MessageComponent/Chat";

const Message = ({ userList }) => {
  return (
    <>
      <div className="flex flex-col gap-2 w-full h-full">
        <div className="h-[10%] flex items-center justify-between w-full">
          <OutletTop userList={userList} Title={"Message"} />
        </div>
        <div className="h-[90%] flex gap-4 items-center w-full">
          <div className="h-full w-[33%] flex flex-col gap-4">
            <div className="flex-1 min-h-0  bg-white rounded-lg">
              <Groups />
            </div>
            <div className="flex-1 min-h-0  bg-white rounded-lg">
              <Friends />
            </div>
          </div>
          <div className="h-full w-[67%] bg-white rounded-lg flex flex-col justify-between">
            <Chat />
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
