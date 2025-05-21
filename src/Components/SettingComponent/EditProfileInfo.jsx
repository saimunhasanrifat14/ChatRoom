import { getAuth } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { data } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const EditProfileInfo = () => {
  // Gets the logged-in user's data and loading state from UserContext.
  const { userList, loading } = useContext(UserContext);
  const db = getDatabase();
  const [saveLoading, setsaveLoading] = useState(false);

  // for input value store
  const [userNewData, setuserNewData] = useState({
    Name: "",
    Bio: "",
  });
  // for velidation error
  const [userNewDataError, setuserNewDataError] = useState({
    NameError: "",
    BioError: "",
  });

  /**
   * todo : Handle input Change functionality
   * @param (event)
   */
  const handleinput = (event) => {
    const { value, name } = event.target;
    // set the input value on userNewData state
    setuserNewData({
      ...userNewData,
      [name]: value,
    });
    // with onChange error state update
    setuserNewDataError((prev) => ({
      ...prev,
      [`${name}Error`]: "",
    }));
  };

  /**
   * todo : Handle error functionality
   * @param (null)
   */
  const validation = () => {
    const errors = {};
    // Checking if the input is empty throw a error
    for (let each in userNewData) {
      if (userNewData[each] === "") {
        errors[`${each}Error`] = `${each} Missing`;
      }
    }
    setuserNewDataError((prev) => ({
      ...prev,
      ...errors,
    }));
  };

  /**
   * todo : Handle new profile data save functionality
   * @param (event)
   */
  const handleSaveNewData = (event) => {
    // stop rerendering
    event.preventDefault();
    if (userNewData.Name === "" || userNewData.Bio === "") {
      validation();
    } else {
      // update new data on firebase
      let updateData = {
        username: userNewData.Name,
        bio: userNewData.Bio,
      };
      update(ref(db, `users/${userList.userkey}`), updateData)
        .then(() => {
          setsaveLoading(true);
          setTimeout(() => {
            setsaveLoading(false);
          }, 1000);
        })
        .catch((err) => {
          console.log("error from updata data", err);
        });
    }
  };

  /**
   * todo : set userList data to usernewdata state
   * @param (null)
   */
  useEffect(() => {
    const user = userList;
    if (user?.username && user?.bio) {
      setuserNewData((prev) => ({
        ...prev,
        Name: user.username,
        Bio: user.bio,
      }));
    }
  }, [userList]);

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
                value={userNewData.Name}
                onChange={handleinput}
                name="Name"
                type="text"
                className={
                  userNewDataError.NameError !== ""
                    ? "w-full border-2 border-red-400 placeholder:text-red-400 rounded-xl p-2 focus:outline-none"
                    : "w-full border-2 border-gray-300 placeholder:text-gray-500 rounded-xl p-2 focus:outline-none"
                }
                placeholder="Enter your name"
              />
            </div>

            {/* Bio Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Bio
              </label>
              <textarea
                value={userNewData.Bio}
                onChange={handleinput}
                name="Bio"
                rows="4"
                className={
                  userNewDataError.BioError !== ""
                    ? "w-full border-2 border-red-400 placeholder:text-red-400 rounded-xl p-2 focus:outline-none  resize-none"
                    : "w-full border-2 border-gray-300 placeholder:text-gray-500 rounded-xl p-2 focus:outline-none  resize-none"
                }
                placeholder="Write something about yourself"
              ></textarea>
            </div>

            {/* Save Button */}
            <div className="text-right">
              <button
                type="submit"
                className="text-white bg-[#3CAE64] text-center font-medium py-2 w-40 rounded-xl transition duration-200 cursor-pointer hover:bg-[#4e8c64]"
                onClick={handleSaveNewData}
              >
                {saveLoading ? "Saved" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfileInfo;
