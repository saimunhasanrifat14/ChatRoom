import React from "react";

const NoChatSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 rounded-lg">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2950/2950651.png"
        alt="Start Chatting"
        className="w-24 h-24 mb-4 opacity-60"
      />
      <h2 className="text-xl font-semibold text-gray-600 mb-2">
        No Conversation Selected
      </h2>
      <p className="text-gray-500">Select a friend to start chatting 💬</p>
    </div>
  );
};

export default NoChatSelected;
