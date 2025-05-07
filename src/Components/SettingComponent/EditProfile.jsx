import React from "react";

const EditProfile = () => {
  return (
    <>
      <div className="flex items-center justify-center h-full w-full py-10 px-4">
      <div className="flex flex-col justify-center h-full w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Update Your Profile</h2>

        {/* Upload Box */}
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-[#3CAE64] hover:border-[#359a57] transition duration-200 mb-6"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-[#3CAE64]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-600">
              <span className="font-semibold text-[#3CAE64]">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, JPEG, GIF (max 800×400px)</p>
          </div>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="button"
            className="bg-[#3CAE64] hover:bg-[#359a57] text-white font-medium py-2 px-6 rounded-xl transition duration-200"
          >
            Update Profile Photo
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default EditProfile;
