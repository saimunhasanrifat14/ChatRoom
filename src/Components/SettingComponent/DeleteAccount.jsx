import React from "react";

const DeleteAccount = () => {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-BGWhite p-6 max-w-2xl w-full">
          <h2 className="text-xl font-semibold text-TextBlack mb-6 sm:border-b-2 border-b-1 border-gray-200 pb-3">
            Delete Your Account
          </h2>

          <div className="space-y-4">
            <p className="text-TextGray">
              Once you delete your account, all of your data will be permanently
              removed. This action cannot be undone. Please proceed with
              caution.
            </p>

            {/* Confirm Password Field (Optional but recommended) */}
            <div>
              <label className="block text-TextDarkGray font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full text-TextBlack bg-BGGray  border-2 border-SidebarRightBorder rounded-xl p-2 focus:outline-none focus:ring-1"
                style={{ outlineColor: "#EF4444", ringColor: "#EF4444" }}
                placeholder="Enter your password to confirm"
              />
            </div>

            {/* Delete Button */}
            <div className="text-right">
              <button
                type="button"
                className="text-white bg-red-400 font-medium py-2 px-6 rounded-xl transition duration-200 cursor-pointer"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
