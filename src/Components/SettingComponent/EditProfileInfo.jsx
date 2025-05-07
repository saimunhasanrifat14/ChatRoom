import React from "react";

const EditProfileInfo = () => {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-white p-6 max-w-2xl w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">
            Edit Your Profile Information
          </h2>

          <form className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-1"
                style={{ outlineColor: "#3CAE64", ringColor: "#3CAE64" }}
                placeholder="Enter your name"
              />
            </div>

            {/* Bio Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Bio
              </label>
              <textarea
                rows="3"
                className="w-full border-2 border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-1 resize-none"
                style={{ outlineColor: "#3CAE64", ringColor: "#3CAE64" }}
                placeholder="Write something about yourself"
              ></textarea>
            </div>

            {/* Save Button */}
            <div className="text-right">
              <button
                type="submit"
                className="text-white font-medium py-2 px-6 rounded-xl transition duration-200"
                style={{ backgroundColor: "#3CAE64" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#359a57")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#3CAE64")
                }
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfileInfo;
