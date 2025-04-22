import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import banner from ".././assets/singupPageIMG/benner.jpg";
import {
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../../Database/Firebase.config";

const LogIn = () => {
  const [UserLoginInfo, setUserLoginInfo] = useState({
    Email: "",
    Password: "",
  });
  const [UserLoginInfoError, setUserLoginInfoError] = useState({
    EmailError: "",
    PasswordError: "",
    Error: "",
    EmailVerification: "",
  });

  const auth = getAuth(app);
  const navigate = useNavigate();

  const inputDetails = [
    {
      id: 1,
      name: "Email",
      type: "email",
      placeholder: "you@example.com",
      label: "Full Name",
    },
    {
      id: 2,
      name: "Password",
      type: "password",
      placeholder: "••••••••",
      label: "Email address",
    },
  ];

  /**
   * todo : handleInput function implement
   * @param (null)
   * return : velue
   */
  const handleInput = (event) => {
    const { name, value } = event.target;
    setUserLoginInfo({
      ...UserLoginInfo,
      [name]: value,
    });

    setUserLoginInfoError({
      ...UserLoginInfoError,
      [`${name}Error`]: "",
    });
  };

  /**
   * todo : handleSubmit function implement
   * @param (null)
   * return : null
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const { Email, Password } = UserLoginInfo;
    if (!Email) {
      setUserLoginInfoError({
        ...UserLoginInfoError,
        EmailError: "Email Missing",
      });
    } else if (!Password) {
      setUserLoginInfoError({
        ...UserLoginInfoError,
        PasswordError: "Password Missing",
      });
    } else {
      signInWithEmailAndPassword(auth, Email, Password)
        .then((userinfo) => {
          console.log(userinfo);
          if (auth.currentUser.emailVerified) {
            navigate("/dashboard");
          } else {
            sendEmailVerification(auth.currentUser).then(() => {});
            navigate("/EmailVerification");
          }
        })
        .catch((err) => {
          console.log(err.code);
          if (err.code === "auth/network-request-failed") {
            setUserLoginInfoError({
              ...UserLoginInfoError,
              Error: "Network error! try again.",
            });
          } else if (err.code === "auth/invalid-email") {
            setUserLoginInfoError({
              ...UserLoginInfoError,
              EmailError: "Invalid email format.",
            });
          } else {
            setUserLoginInfoError({
              ...UserLoginInfoError,
              Error: "Something went wrong. Please try again.",
            });
          }
        });
    }
  };

  return (
    <>
      <div className="w-full h-screen flex">
        <div className="w-[60%] h-full flex items-center justify-center">
          <div className=" w-[380px] flex items-center justify-center bg-white px-4">
            <div className="max-w-md w-full space-y-7">
              {/* Heading */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Sign in to your account
                </h2>
                {UserLoginInfoError.Error !== "" ? (
                  <span className="text-red-500 text-[14px]">
                    {UserLoginInfoError.Error}
                  </span>
                ) : (
                  <p className="text-sm text-gray-500 mt-1">
                    Not a member?{" "}
                    <Link
                      to="/signup"
                      className="font-medium text-green-600 hover:text-green-500"
                    >
                      Start a 14 day free trial
                    </Link>
                  </p>
                )}
              </div>

              {/* Sign In Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {inputDetails.map((item, index) => (
                  <div key={index}>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {item.label}
                    </label>
                    <input
                      onChange={handleInput}
                      name={item.name}
                      type={item.type}
                      id={item.id}
                      placeholder={item.placeholder}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
                    />
                    {UserLoginInfoError[`${item.name}Error`] && (
                      <span className="text-red-500 text-[12px]">
                        {UserLoginInfoError[`${item.name}Error`]}
                      </span>
                    )}
                  </div>
                ))}

                {/* Options Row */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-green-600 border-gray-300 rounded cursor-pointer"
                    />
                    <span className="ml-2">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-green-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md cursor-pointer"
                >
                  Sign in
                </button>
              </form>

              {/* Social Login Buttons */}
              <div className="">
                {/* Divider */}
                <div className="flex items-center justify-center gap-2">
                  <hr className="flex-grow border-gray-300" />
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    Or sign up with
                  </span>
                  <hr className="flex-grow border-gray-300" />
                </div>
                <div className="flex space-x-4 mt-4">
                  <button className="flex items-center justify-center w-1/2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 cursor-pointer">
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="w-5 h-5 mr-2"
                    />
                    <span className="text-sm">Google</span>
                  </button>
                  <button className="flex items-center justify-center w-1/2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 cursor-pointer">
                    <img
                      src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                      alt="GitHub"
                      className="w-6 h-6 mr-2"
                    />
                    <span className="text-sm">GitHub</span>
                  </button>
                </div>
              </div>

              {/* Bottom Link */}
              <p className="text-center text-sm text-gray-500 mt-4">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-green-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-[40%] h-full">
          <img className="w-full h-full" src={banner} alt="" />
        </div>
      </div>
    </>
  );
};

export default LogIn;
