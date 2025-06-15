import React, { useState } from "react";
import {
  getAuth,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");

  const onSubmit = async (data) => {
    clearErrors();
    setFirebaseError("");

    const { password } = data;

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      alert("Your account has been deleted.");
      navigate("/signup"); // Redirect to signup page after deletion
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        setError("password", {
          type: "manual",
          message: "Incorrect password.",
        });
      } else {
        setFirebaseError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-BGWhite p-6 max-w-2xl w-full">
        <h2 className="text-xl font-semibold text-TextBlack mb-6 sm:border-b-2 border-b border-gray-200 pb-3">
          Delete Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <p className="text-TextGray">
            Once you delete your account, all of your data will be permanently
            removed. This action cannot be undone. Please proceed with caution.
          </p>

          {/* Password Field */}
          <div>
            <label className="block text-TextDarkGray font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className={`w-full text-TextBlack bg-BGGray border-2 rounded-xl p-2 focus:outline-none ${
                errors.password ? "border-red-400" : "border-SidebarRightBorder"
              }`}
              placeholder="Enter your password to confirm"
            />
            {errors.password?.type === "manual" && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            {/* Firebase error */}
            {firebaseError && (
              <p className="text-red-400 text-sm mt-1">{firebaseError}</p>
            )}
          </div>

          {/* Delete Button */}
          <div className="text-right">
            <button
              type="submit"
              className="text-white bg-red-500 hover:bg-red-600 font-medium py-2 px-6 rounded-xl transition duration-200 cursor-pointer"
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccount;
