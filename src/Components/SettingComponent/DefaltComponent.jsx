import React from "react";

const DefaltComponent = () => {
  return (
    <>
      <div className="h-full flex flex-col items-center justify-center text-center p-10 text-gray-600">
        <h2 className="text-2xl font-semibold mb-2">Welcome to Settings</h2>
        <p className="max-w-md">
          Please select an option from the left side panel to edit your profile,
          manage privacy, or update your account settings.
        </p>
      </div>
    </>
  );
};

export default DefaltComponent;
