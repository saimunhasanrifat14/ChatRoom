import React, { useContext, useEffect, useRef, useState } from "react";
import { uploedCloudinary } from "../../Utilities/Cloudinary.utils";
import { getDatabase, onValue, ref, update } from "firebase/database";
import { UserContext } from "../../Context/UserContext";
import { getAuth } from "firebase/auth";

const EditProfile = () => {
  // All hook
  const [profile, setprofile] = useState();
  const [profileError, setprofileError] = useState("");
  const [saveLoading, setsaveLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const db = getDatabase();
  const auth = getAuth();
  const fileInputRef = useRef(null);
  const [notifications, setnotifications] = useState([]);

  const [senderFL, setsenderFL] = useState([]);
  const [reciverFL, setreciverFL] = useState([]);

  // Gets the logged-in user's data and loading state from UserContext.
  const { userList, loading } = useContext(UserContext);

  /**
   * todo : Data fetch from friends database
   * @param (null)
   * @description : This function fetches the data from the friends database and sets it to the friends state.
   */
  useEffect(() => {
    const fetchData = () => {
      const UserRef = ref(db, "friends/");
      onValue(UserRef, (snapshot) => {
        let senderdata = [];
        let reciverdata = [];
        snapshot.forEach((item) => {
          if (auth.currentUser.uid === item.val().senderUserId) {
            senderdata.push({ ...item.val(), friendKey: item.key });
          }
          if (auth.currentUser.uid === item.val().reciverUserId) {
            reciverdata.push({ ...item.val(), friendKey: item.key });
          }
        });
        setsenderFL(senderdata);
        setreciverFL(reciverdata);
      });
    };
    fetchData();
  }, []);

  /**
   * todo : Data fetch from Notification database
   * @param (null)
   * @description : This function fetches the data from the Notification database and sets it to the notifications state.
   */
  useEffect(() => {
    const fetchData = () => {
      const UserRef = ref(db, "notification/");
      onValue(UserRef, (snapshot) => {
        let data = [];
        snapshot.forEach((item) => {
          if (auth.currentUser.uid === item.val().senderUserId) {
            data.push({ ...item.val(), notificationKey: item.key });
          }
        });
        setnotifications(data);
      });
    };
    fetchData();
  }, []);

  /**
   * @function handleUpdateProfile
   * @description Uploads profile image to Cloudinary and updates the user's profile in Firebase.
   * @returns {void}
   */
  const handleUpdateProfile = async () => {
    if (!profile) {
      setprofileError("Please select a profile picture first.");
      return;
    }
    try {
      setLoading(true);
      const profileUrl = await uploedCloudinary(profile);
      // If upload failed, throw an error
      if (!profileUrl) {
        throw new Error("Upload failed");
      }
      // Update the user's profile picture in the database
      const updateData = { profile_picture: profileUrl };

      // update the notification with the new profile picture
      const notificationupdateData = { senderProfilePicture: profileUrl };

      // Update the profile picture in friends and
      const senderFLupdate = { senderProfilePicture: profileUrl };
      const reciverFLudate = { reciverProfilePicture: profileUrl };

      await update(ref(db, `users/${userList.userkey}`), updateData);

      // Update the notification with the new profile picture
      for (const notification of notifications) {
        await update(
          ref(db, `notification/${notification.notificationKey}`),
          notificationupdateData
        );
      }
      // Update all sender records
      for (const sender of senderFL) {
        await update(ref(db, `friends/${sender.friendKey}`), senderFLupdate);
      }
      // Update all receiver records
      for (const receiver of reciverFL) {
        await update(ref(db, `friends/${receiver.friendKey}`), reciverFLudate);
      }

      setsaveLoading(true);
      setTimeout(() => {
        setsaveLoading(false);
      }, 2000);

      setprofile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setprofileError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * @description Set the selected file to state and clear previous error.
   * @param {Event}
   * @returns {void}
   */
  const handleInputChange = (event) => {
    const file = event.target.files[0];
    setprofile(file);
    setprofileError("");
  };

  return (
    <>
      <div className="flex items-center justify-center h-full w-full py-10 px-4">
        <div className="flex flex-col justify-center h-full w-full max-w-md p-6">
          <h2 className="text-xl font-semibold text-center text-TextDarkGray mb-6">
            Update Your Profile
          </h2>
          {/* Upload Box */}
          <label
            // htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-BGGray border-buttonsBG hover:border-[#359a57] transition duration-200 mb-6"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-buttonsBG"
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
                <span className="font-semibold text-[#3CAE64]">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, JPEG, GIF (max 800×400px)
              </p>

              {/* Show selected file name */}
              {profile && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected file:{" "}
                  <span className="font-semibold text-buttonsBG">
                    {profile.name}
                  </span>
                </p>
              )}

              {/* Error message */}
              {profileError && (
                <p className="text-red-400 font-normal text-[14px]">
                  {profileError}
                </p>
              )}
            </div>

            <input
              id="file-upload"
              type="file"
              name="Profile"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleInputChange}
            />
          </label>
          {/* Submit Button */}
          <div className="text-right">
            <button
              type="button"
              className="bg-buttonsBG hover:bg-[#359a57] text-white font-medium py-2 w-50 rounded-xl transition duration-200 cursor-pointer"
              onClick={handleUpdateProfile}
            >
              {saveLoading
                ? "Updated"
                : Loading
                ? "Loading"
                : "Update Profile Photo"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
