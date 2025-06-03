import EmojiPicker from "emoji-picker-react";
import React, { useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoCameraOutline } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import NoChatSelected from "./NoChatSelected";
import moment from "moment";
import { useEffect } from "react";
import { uploedCloudinary } from "../../Utilities/Cloudinary.utils";
import { getGridClass } from "../../Lib/sendImage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [emojiOpen, setemojiOpen] = useState(false);
  const db = getDatabase();
  const auth = getAuth();
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);
  const [allUrl, setallUrl] = useState([]);
  const [selectedfiles, setSelectedFiles] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [showFullImages, setShowFullImages] = useState({});
  const [viewImage, setViewImage] = useState(null); // store clicked image URL
  const [showMenu, setShowMenu] = useState(null); // null or msg id

  // Get the user from the Redux store
  const { value: user } = useSelector((store) => store.friends);

  /**
   * todo : handle emoji click
   * Discription: This function handles the emoji click event and appends the selected emoji to the message input
   * @param {Object} emoji - The emoji object containing the selected emoji
   */
  const handleEmoji = ({ emoji }) => {
    setMsg((prev) => prev + emoji);
  };

  /**
   * todo : send message to firebase
   * Discription: This function sends a message to the Firebase Realtime Database
   */
  const handleSendMsg = async () => {
    try {
      let urls = [];

      if (selectedfiles.length > 0) {
        setUploadLoading(true);

        for (let file of selectedfiles) {
          const url = await uploedCloudinary(file);
          urls.push(url);
        }

        await set(push(ref(db, `AllMessage/`)), {
          whoSendMsgUid: auth.currentUser.uid,
          whoSwndMsgUserName: auth.currentUser.displayName,
          whoSwndMsgEmail: auth.currentUser.email,
          whoSendMsgProfile: auth.currentUser.photoURL,
          whoReciveMsgUid: user.userId,
          whoReciveMsgUserName: user.userName,
          whoReciveMsgEmail: user.email,
          whoReciveMsgProfile: user.profilePicture,
          text: urls.length > 0 ? urls : ["image upload failed"],
          sendAt: Date.now(),
        });
        setUploadLoading(false);
      } else {
        await set(push(ref(db, `AllMessage/`)), {
          whoSendMsgUid: auth.currentUser.uid,
          whoSwndMsgUserName: auth.currentUser.displayName,
          whoSwndMsgEmail: auth.currentUser.email,
          whoSendMsgProfile: auth.currentUser.photoURL,
          whoReciveMsgUid: user.userId,
          whoReciveMsgUserName: user.userName,
          whoReciveMsgEmail: user.email,
          whoReciveMsgProfile: user.profilePicture,
          text: msg,
          sendAt: Date.now(),
        });
      }
    } catch (error) {
      console.log("error is", error);
    } finally {
      setMsg("");
      setSelectedFiles([]);
    }
  };

  /**
   * todo : fetching all messages from firebase
   * Discription: This useEffect hook fetches all messages from the Firebase Realtime Database
   */
  useEffect(() => {
    const fetchData = () => {
      const chatRef = ref(db, `AllMessage/`);
      onValue(chatRef, (snapshot) => {
        let data = [];
        snapshot.forEach((item) => {
          if (
            (item.val().whoSendMsgUid === auth.currentUser.uid &&
              item.val().whoReciveMsgUid === user.userId) ||
            (item.val().whoSendMsgUid === user.userId &&
              item.val().whoReciveMsgUid === auth.currentUser.uid)
          ) {
            data.push({ ...item.val(), msgKey: item.key });
          }
        });

        // Sort messages by time (oldest first)
        const sortedData = data.sort((a, b) => a.sendAt - b.sendAt);
        setMessages(sortedData);
      });
    };
    fetchData();
  }, [user]);

  /**
   * todo : scroll to bottom when new message comes
   * Discription: This useEffect hook scrolls to the bottom of the chat when new messages are added
   */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /**
   * todo : handle file change
   * Discription: This function handles the file change event when a user selects a file
   */
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const hendleSendImage = () => {
    fileInputRef.current.click();
  };

  /**
   * todo : toggle image display
   * Discription: This function toggles the display of full images in the chat
   */
  const toggleImageDisplay = (msgId) => {
    setShowFullImages((prev) => ({
      ...prev,
      [msgId]: !prev[msgId],
    }));
  };

  const hendleseeImage = (url) => {
    console.log("url is", url);
  };

  /**
   * todo : if user is not selected then show no chat selected component
   * Discription: This function checks if a user is selected, if not, it returns the NoChatSelected component
   */
  if (Object.keys(user).length === 0) {
    return <NoChatSelected />;
  }

  return (
    <>
      <div className="w-full h-full px-8 flex flex-col  justify-between relative">
        <div className="chatTop h-[12%] border-b-2 border-b-gray-300 flex justify-between items-center">
          <div className="flex items-center gap-6 ">
            <img
              src={
                user
                  ? user.profilePicture
                  : "https://www.w3schools.com/howto/img_avatar.png"
              }
              alt="profile picture"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="">
              <h3 className="font-semibold text-[22px] text-gray-900">
                {user ? user.userName : "user"}
              </h3>
              <p className="text-gray-500 text-sm">
                {navigator.onLine ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          <span className="text-blueColor text-[24px] cursor-pointer">
            <HiOutlineDotsVertical />
          </span>
        </div>

        {/* Chat part */}
        <div className="chatMain flex flex-col gap-1 h-[76%] pr-2 py-4 overflow-y-scroll custom-scrollbar">
          {messages.map((item, index) => {
            const time = new Date(item.sendAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            const prev = messages[index - 1];
            const next = messages[index + 1];
            const isSameSenderAsPrev =
              prev && prev.whoSendMsgUid === item.whoSendMsgUid;
            const isSameSenderAsNext =
              next && next.whoSendMsgUid === item.whoSendMsgUid;

            // Left Side (Others)
            let leftClass = "";
            if (!isSameSenderAsPrev && !isSameSenderAsNext) {
              leftClass =
                "message max-w-[70%] text-wrap py-2 px-3 bg-gray-200 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] rounded-tl-[20px] relative z-10";
            } else if (!isSameSenderAsPrev && isSameSenderAsNext) {
              leftClass =
                "message max-w-[70%] text-wrap py-2 px-3 bg-gray-200 rounded-tr-[20px] rounded-br-[20px] rounded-bl-sm rounded-tl-[20px] relative z-10";
            } else if (isSameSenderAsPrev && isSameSenderAsNext) {
              leftClass =
                "message max-w-[70%] text-wrap py-2 px-3 bg-gray-200 rounded-tr-[20px] rounded-br-[20px] rounded-tl-sm rounded-bl-sm relative z-10";
            } else if (isSameSenderAsPrev && !isSameSenderAsNext) {
              leftClass =
                "message max-w-[70%] text-wrap py-2 px-3 mb-3 bg-gray-200 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] rounded-tl-sm relative z-10";
            }

            // Right Side (My Message)
            let rightClass = "";
            if (!isSameSenderAsPrev && !isSameSenderAsNext) {
              rightClass =
                "message max-w-[70%] text-wrap py-2 px-3 bg-green-500 text-white rounded-tl-[20px] rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px] relative z-10";
            } else if (!isSameSenderAsPrev && isSameSenderAsNext) {
              rightClass =
                "message max-w-[70%] text-wrap py-2 px-3 bg-green-500 text-white rounded-tl-[20px] rounded-bl-[20px] rounded-br-sm rounded-tr-[20px] relative z-10";
            } else if (isSameSenderAsPrev && isSameSenderAsNext) {
              rightClass =
                "message max-w-[70%] text-wrap py-2 px-3 bg-green-500 text-white rounded-tl-[20px] rounded-bl-[20px] rounded-tr-sm rounded-br-sm relative z-10";
            } else if (isSameSenderAsPrev && !isSameSenderAsNext) {
              rightClass =
                "message max-w-[70%] text-wrap py-2 px-3 mb-3  bg-green-500 text-white rounded-tl-[20px] rounded-bl-[20px] rounded-br-[20px] rounded-tr-sm relative z-10";
            }
            const isMyMessage = item.whoSendMsgUid === auth.currentUser.uid;

            return isMyMessage ? (
              <div
                key={index}
                className="flex items-center gap-2 justify-end relative group"
              >
                <p className="text-sm opacity-0 group-hover:opacity-100">
                  {time}
                </p>

                {Array.isArray(item.text) ? (
                  <div className="max-w-[70%]">
                    <div className="flex flex-wrap gap-2 justify-end">
                      {(showFullImages[item.sendAt]
                        ? item.text
                        : item.text.slice(0, 4)
                      ).map((url, idx, arr) => {
                        const isLast =
                          showFullImages[item.sendAt] && idx === arr.length - 1;
                        const isMore =
                          !showFullImages[item.sendAt] &&
                          idx === 3 &&
                          item.text.length > 4;

                        return (
                          <div
                            key={idx}
                            className="relative w-30 h-30 cursor-pointer"
                            onClick={() => {
                              if (isMore || isLast)
                                toggleImageDisplay(item.sendAt);
                            }}
                          >
                            <img
                              src={url}
                              alt={`img-${idx}`}
                              onClick={() => setViewImage(url)}
                              className="w-full h-full cursor-pointer border border-gray-300 shadow-sm object-cover rounded-md"
                            />

                            {/* +More overlay */}
                            {isMore && (
                              <div className="absolute inset-0 cursor-pointer bg-[#00000080] bg-opacity-50 text-white text-lg font-bold flex items-center justify-center rounded-md">
                                +{item.text.length - 4}
                              </div>
                            )}

                            {/* Hover Hide on last image */}
                            {isLast && (
                              <div className="absolute inset-0 bg-[#00000080] bg-opacity-50 hover:bg-opacity-60 text-white text-sm font-semibold flex items-center justify-center rounded-md transition-opacity duration-300 opacity-0 hover:opacity-100">
                                Hide
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <h2 className={rightClass}>{item.text}</h2>
                )}
              </div>
            ) : (
              <div
                key={index}
                className="flex items-center gap-2 justify-start relative group"
              >
                {Array.isArray(item.text) ? (
                  <div className="flex flex-wrap gap-2 max-w-[70%]">
                    {(showFullImages[item.sendAt]
                      ? item.text
                      : item.text.slice(0, 4)
                    ).map((url, i, arr) => {
                      const isLast =
                        showFullImages[item.sendAt] &&
                        i === arr.length - 1 &&
                        item.text.length > 4;

                      return (
                        <div
                          key={i}
                          className="relative w-30 h-30"
                          onClick={() => {
                            if (
                              !showFullImages[item.sendAt] &&
                              i === 3 &&
                              item.text.length > 4
                            ) {
                              toggleImageDisplay(item.sendAt);
                            }
                          }}
                        >
                          <img
                            src={url}
                            alt={`img-${i}`}
                            onClick={() => setViewImage(url)}
                            className="w-full h-full object-cover rounded-lg cursor-pointer border border-gray-300 shadow-sm"
                          />
                          {!showFullImages[item.sendAt] &&
                            i === 3 &&
                            item.text.length > 4 && (
                              <div className="absolute inset-0 bg-[#00000080] bg-opacity-50 text-white font-bold text-lg flex items-center justify-center rounded-lg">
                                +{item.text.length - 4}
                              </div>
                            )}

                          {/* Hover Hide button on last image */}
                          {isLast && (
                            <div
                              className="absolute inset-0 bg-[#00000080] bg-opacity-50 text-white font-bold text-lg flex items-center justify-center rounded-lg opacity-0 hover:opacity-100 cursor-pointer transition"
                              onClick={() => toggleImageDisplay(item.sendAt)}
                            >
                              Hide
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <h2 className={leftClass}>{item.text}</h2>
                )}

                <p className="text-sm opacity-0 group-hover:opacity-100">
                  {time}
                </p>
              </div>
            );
          })}
          <div ref={bottomRef}></div>
        </div>
        {/* Chat part */}

        {/* for view full image */}
        {viewImage && (
          <div className="w-screen h-[100%] fixed inset-0 bg-[#000000b8] flex items-center justify-center z-50">
            <button
              onClick={() => setViewImage(null)}
              className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
            >
              &times;
            </button>
            <img
              src={viewImage}
              alt="fullscreen"
              className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
            />
          </div>
        )}
        {/* for view full image */}

        {/* input part */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="chatBottom w-full h-[12%] flex items-center justify-between gap-5 border-t-2 border-t-gray-300 relative"
        >
          <input
            className="bg-gray-100 py-3 px-4 w-[92%] rounded-lg outline-none"
            placeholder="Type Here"
            type="text"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <div className="flex items-center gap-3 absolute right-[85px] top-[32px] text-[18px] text-gray-600">
            <span
              onClick={() => setemojiOpen(!emojiOpen)}
              className="text-xl cursor-pointer"
            >
              <MdOutlineEmojiEmotions />
            </span>
            <span onClick={hendleSendImage} className="text-xl cursor-pointer">
              <IoCameraOutline />
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          <button
            type="submit"
            onClick={
              !msg && selectedfiles.length === 0
                ? (e) => e.preventDefault() // prevent click if no msg and no file
                : handleSendMsg
            }
            className={`p-4 bg-[#3cae64] text-white rounded-full ${
              !msg && selectedfiles.length === 0
                ? "opacity-50 "
                : "cursor-pointer"
            }`}
          >
            {uploadLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-white" />
            ) : (
              <FaPaperPlane />
            )}
          </button>
        </form>
        {/* input part */}

        {/* emoji part */}
        <div className="absolute z-12 bottom-[11%] right-[12%]">
          <EmojiPicker open={emojiOpen} onEmojiClick={handleEmoji} />
        </div>
        {/* emoji part */}

        {/* selected images */}
        {selectedfiles.length > 0 && (
          <div className="absolute w-full bottom-[12%] left-0 flex flex-wrap gap-2 py-4 px-8 bg-[#e5e5e5e6] z-100">
            {selectedfiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Uploaded ${index}`}
                className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                onClick={() => {
                  setSelectedFiles((prev) =>
                    prev.filter((item) => item !== file)
                  );
                }}
              />
            ))}
          </div>
        )}
        {/* selected images */}
      </div>
    </>
  );
};

export default Chat;
