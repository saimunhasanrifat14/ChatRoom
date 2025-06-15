import React, { useContext, useState } from "react";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { UserContext } from "../../Context/UserContext";

const ChangePassword = () => {
  const { userList } = useContext(UserContext);
  const auth = getAuth();
  const user = auth.currentUser;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const [firebaseError, setFirebaseError] = useState("");

  const onSubmit = async (data) => {
    setFirebaseError("");
    clearErrors();

    const { currentPassword, newPassword, confirmPassword } = data;

    // Check if new password matches
    if (newPassword !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "New passwords do not match.",
      });
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      alert("Password updated successfully!");
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        setError("currentPassword", {
          type: "manual",
          message: "Current password is incorrect.",
        });
      } else {
        setFirebaseError("Something went wrong. Please try again.");
      }
    }
  };

  const newPassword = watch("newPassword");

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-BGWhite p-6 max-w-2xl w-full">
        <h2 className="text-xl font-semibold text-TextDarkGray mb-6 sm:border-b-2 border-b-1 border-gray-400 pb-3">
          Change Your Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-TextDarkGray font-medium mb-1">
              Current Password
            </label>
            <input
              type="password"
              {...register("currentPassword", { required: true })}
              className={`bg-BGGray w-full border-2 rounded-xl p-2 text-TextBlack focus:outline-none ${
                errors.currentPassword
                  ? "border-red-500"
                  : "border-SidebarRightBorder"
              }`}
              placeholder="Enter current password"
            />
            {errors.currentPassword?.type === "manual" && (
              <p className="text-red-500 text-sm mt-1">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-TextDarkGray font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword", { required: true })}
              className={`bg-BGGray w-full border-2 rounded-xl p-2 text-TextBlack focus:outline-none ${
                errors.newPassword
                  ? "border-red-500"
                  : "border-SidebarRightBorder"
              }`}
              placeholder="Enter new password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-TextDarkGray font-medium mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: true,
              })}
              className={`bg-BGGray w-full border-2 rounded-xl p-2 text-TextBlack focus:outline-none ${
                errors.confirmPassword
                  ? "border-red-400"
                  : "border-SidebarRightBorder"
              }`}
              placeholder="Re-enter new password"
            />
            {errors.confirmPassword?.type === "manual" && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
            {/* General Firebase error */}
            {firebaseError && (
              <p className="text-red-400 text-sm mt-1">{firebaseError}</p>
            )}
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-buttonsBG text-white font-medium py-2 px-6 rounded-xl transition duration-200 cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
