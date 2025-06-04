import React from "react";
import OutletTop from "../Components/CommonComponent/OutletTop";
import Groups from "../Components/DashboardComponents/Groups";
import Friends from "../Components/DashboardComponents/Friends";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Chat from "../Components/MessageComponent/Chat";

const Message = ({ userList }) => {
  return (
    <>
      <div className="flex flex-col gap-2 w-full h-full">
        <div className="h-[10%] flex items-center justify-between w-full">
          <OutletTop userList={userList} Title={"Message"} />
        </div>
        <div className="h-[90%] flex gap-4 items-center w-full">
          <div className="h-full w-[33%] flex flex-col gap-4">
            <div className="flex-1 min-h-0  bg-BGWhite rounded-lg">
              <Groups />
            </div>
            <div className="flex-1 min-h-0  bg-BGWhite rounded-lg">
              <Friends showButton={false} />
            </div>
          </div>
          <div className="h-full w-[67%] bg-BGWhite rounded-lg flex flex-col justify-between">
            <Chat />
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
