import React from "react";
import OutletTop from "./CommonComponent/OutletTop";

const Notification = () => {
  const Notificationdata = [
    {
      id: 1,
      senderName: "John Doe",
      senderProfile: "https://www.w3schools.com/howto/img_avatar.png",
      message: "Shakil Ahmed accepted your friend request.",
      time: "2 hours ago",
    },
    {
      id: 2,
      senderName: "Tanbir Ahmed",
      senderProfile: "https://www.w3schools.com/howto/img_avatar.png",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "3 hours ago",
    },
    {
      id: 3,
      senderName: "Alex Smith",
      senderProfile: "https://www.w3schools.com/howto/img_avatar.png",
      message: "Shakil Ahmed sent you a friend request.",
      acceptButton: "Accept",
      rejectbutton: "Reject",
      time: "4 hours ago",
    },
    {
      id: 4,
      senderName: "Shakil Ahmed",
      senderProfile: "https://www.w3schools.com/howto/img_avatar.png",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "5 hours ago",
    },
    {
      id: 5,
      senderName: "Hasan Mahmud",
      senderProfile: "https://www.w3schools.com/howto/img_avatar.png",
      message: "Alex smith sent you a friend request.",
      acceptButton: "Accept",
      rejectbutton: "Reject",
      time: "6 min ago",
    },
    {
      id: 6,
      senderName: "Hasan Mahmud",
      senderProfile: "https://www.w3schools.com/howto/img_avatar.png",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      acceptButton: "Accept",
      rejectbutton: "Reject",
      time: "7 hours ago",
    },
    {
      id: 7,
      senderName: "Hasan Mahmud",
      senderProfile: "https://www.w3schools.com/howto/img_avatar.png",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "14 min ago",
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-2 w-full h-full">
        <div className="h-[9%] flex items-center justify-between w-full">
          <OutletTop Title="Notifications" />
        </div>
        <div className="h-[91%] flex gap-6 items-center w-full bg-white rounded-lg">
          <div className="flex flex-col gap-4 w-full h-full p-6 overflow-y-auto [&::-webkit-scrollbar]:hidden">
            {Notificationdata?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 p-4 bg-gray-100 rounded-lg "
              >
                <div className="flex items-center gap-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={item.senderProfile}
                    alt={`profile of ${item.senderName}`}
                  />
                  <div className="flex flex-col">
                    <span className="font-normal text-gray-600">
                      {item.message}
                    </span>
                    <span className="font-normal text-sm text-gray-600">
                      {item.time}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.acceptButton && (
                    <button className="ml-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 cursor-pointer">
                      {item.acceptButton}
                    </button>
                  )}
                  {item.rejectbutton && (
                    <button className="ml-auto bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 cursor-pointer">
                      {item.rejectbutton}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
