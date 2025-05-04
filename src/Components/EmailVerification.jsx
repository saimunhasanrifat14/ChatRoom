import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { MdOutlineMailOutline } from "react-icons/md";

const EmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handleCheckVerification = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified) {
        navigate("/rootlayout");
      } else {
        setErrorMsg("Your email is not verified yet!");
      }
    } catch (error) {
      setErrorMsg("Your email is not verified yet!");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {})
      .catch((error) => {
        if(error.code === "auth/too-many-requests") {
          setErrorMsg("Failed! Please wait 5 minute and try again.");
        }
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white px-4">
      <div className="max-w-xl w-full p-8 text-center bg-white rounded-3xl shadow-xl ">
        <div className="flex justify-center mb-6 z-10">
          <span className="bg-[#2ecc71] p-4 rounded-full shadow-md text-[50px] text-white">
            <MdOutlineMailOutline />
          </span>
        </div>
        {errorMsg !== "" ? (
          <p className="text-2xl font-bold text-red-500 mb-2">{errorMsg}</p>
        ) : (
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Check your Email, please!
          </h2>
        )}
        <p className="mb-2 text-[#888888]">
          We’ve already sent out the verification link. Please check it <br />{" "}
          and confirm it’s really you.
        </p>
        <button
          onClick={handleCheckVerification}
          className="bg-[#4ebe75] text-white font-semibold py-2 px-6 rounded-full hover:bg-green-700 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Checking..." : "Done!"}
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Didn’t get e-mail?{" "}
          <span
            className="text-green-600 hover:underline hover:text-green-700 cursor-pointer"
            onClick={handleResend}
          >
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
