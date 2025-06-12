import React, { useEffect, useState } from "react";
import OutletTop from "../Components/CommonComponent/OutletTop";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
import NotifacationSkeleton from "../Skeleton/NotifacationSkeleton";

const Notification = ({ userList }) => {
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
  const db = getDatabase();
  const auth = getAuth();
  const [NotificationFetchdata, setNotificationFetchdata] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * todo : Data fetch from Notification database
   * @param (null)
   * @description : This function fetches the data from the Notification database and sets it to the NotificationFetchdata state.
   */
  useEffect(() => {
    const fetchNotificationData = () => {
      setLoading(true);
      const DataRef = ref(db, "notification/");
      onValue(DataRef, (snapshot) => {
        let data = [];
        snapshot.forEach((item) => {
          if (auth.currentUser.uid === item.val().reciverUserId) {
            data.push({ ...item.val(), notificationKey: item.key });
          }
        });
        setNotificationFetchdata(data);
        setLoading(false);
      });
    };
    fetchNotificationData();
  }, []);

  /**
   * todo : Accept Friend Request
   * @param {Object} item - Friend request data.
   * @description : Accepts a friend request, updates "friends/", sends a notification, and removes the original one.
   */
  const handleAcceptBtn = (item) => {
    // Accept a friend request and save the friend info to the database (excluding UI-specific data)
    const { acceptButton, rejectButton, ...filteredItem } = item;
    set(push(ref(db, "friends/")), {
      ...filteredItem,
      sendAt: moment().format("MMMM Do YYYY, h:mm a"),
      senderReciveruid: auth.currentUser.uid.concat(item.senderUserId),
      status: "accepted",
    })
      .then(() => {
        console.log("Friend request accepted");
      })
      .catch((err) => {
        console.log("error is ", err);
      });

    // Notify the original sender that their friend request has been accepted
    set(push(ref(db, "notification/")), {
      reciverUserId: item.senderUserId,
      senderProfilePicture: item.reciverProfilePicture,
      senderUserName: item.reciverUserName,
      message: `has accepted your friend request`,
      sendAt: moment().format("MMMM Do YYYY, h:mm a"),
    })
      .then(() => {
        console.log("Message successfully send");
      })
      .catch((err) => {
        console.log("error is ", err);
      });

    const reference = ref(db, `notification/${item.notificationKey}`);
    remove(reference);
  };

  /**
   * todo : Accept Friend Request
   *  @param {Object} item - Friend request data.
   * @description : Remove a specific notification from the database using its unique key.
   */
  const handlerefectBtn = (item) => {
    const reference = ref(db, `notification/${item.notificationKey}`);
    remove(reference);
  };

  if (loading) {
    return (
      <div className="overflow-hidden">
        <NotifacationSkeleton />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-0 sm:gap-2 w-full h-full">
        <div className="h-[9%] flex items-center justify-between w-full">
          <OutletTop userList={userList} Title="Notifications" />
        </div>
        <div className="h-[91%] flex gap-6 items-center w-full bg-BGWhite rounded-none sm:rounded-lg">
          <div className="flex flex-col gap-0 mt-4 sm:mt-0 sm:gap-4 w-full h-full p-0 sm:p-6 overflow-y-auto [&::-webkit-scrollbar]:hidden">
            {NotificationFetchdata?.length == 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p className="text-lg font-semibold">No notifications yet</p>
                <p className="text-sm text-center max-w-xs mt-1">
                  You don’t have any notifications right now. Stay active and
                  we’ll let you know when something happens!
                </p>
              </div>
            ) : (
              NotificationFetchdata?.map((item) => (
                <div
                  key={item.notificationKey}
                  className="flex items-center justify-between gap-0 sm:gap-4 p-4 bg-transparent sm:bg-BGGray rounded-lg "
                >
                  <div className="flex items-center gap-4">
                    <img
                      className="w-14 h-14 rounded-full"
                      src={item.senderProfilePicture}
                      alt={`Sender Profile Picture`}
                    />
                    <div className="flex flex-col">
                      <span className="font-normal leading-[20px] text-TextDarkGray">
                        <span className="font-bold ">
                          {item.senderUserName}
                        </span>{" "}
                        {item.message}
                      </span>
                      <span className="font-normal text-sm text-gray-500">
                        {item.sendAt}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.acceptButton ? (
                      <button
                        onClick={() => handleAcceptBtn(item)}
                        className="ml-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 cursor-pointer"
                      >
                        {item.acceptButton}
                      </button>
                    ) : (
                      ""
                    )}
                    {item.rejectButton ? (
                      <button
                        onClick={() => handlerefectBtn(item)}
                        className="ml-auto bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 cursor-pointer"
                      >
                        {item.rejectButton}
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
