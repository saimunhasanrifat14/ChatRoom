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
        <div className="h-[9%] flex items-center justify-between w-full">
          <OutletTop userList={userList} Title={"Message"} />
        </div>
        <div className="h-[91%] flex flex-col sm:flex-row sm:gap-4 gap-0 items-center w-full">
          <div className="hidden sm:flex  h-full sm:w-[33%] w-full  flex-col sm:gap-4 gap-0">
            <div className="flex-1 min-h-0  bg-BGWhite sm:rounded-lg rounded-none">
              <Groups />
            </div>
            <div className="flex-1 min-h-0  bg-BGWhite sm:rounded-lg rounded-none">
              <Friends showButton={false} />
            </div>
          </div>
          <div className="h-full sm:w-[67%] w-full bg-BGWhite sm:rounded-lg rounded-none flex flex-col justify-between">
            <Chat />
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
