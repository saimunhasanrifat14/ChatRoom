import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import banner from ".././assets/singupPageIMG/benner.jpg";
import {
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../../Database/Firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  child,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  set,
} from "firebase/database";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../Context/ThemeProvider";

const LogIn = () => {
  const [eye, seteye] = useState(false);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const db = getDatabase();
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // for user data
  const [UserLoginInfo, setUserLoginInfo] = useState({
    Email: "",
    Password: "",
  });
  // for error handling
  const [UserLoginInfoError, setUserLoginInfoError] = useState({
    EmailError: "",
    PasswordError: "",
    Error: "",
  });

  /**
   * todo : password eye function implement
   * @param (null)
   * return : null
   * @description : This function is used to handle the eye icon click event.
   */
  const handleEye = () => {
    seteye(!eye);
  };

  /**
   * todo : input details for login form
   * @param (null)
   * @return : velue
   * @description : This function is used to handle the input change event of the form.
   */
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
   * @param {event} event - The event object containing the input field's name and value.
   * @description : This function is used to handle the input change event of the form.
   * @return : velue
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
   * @description : This function is used to handle the submit event of the form.
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
      setLoading(true);
      signInWithEmailAndPassword(auth, Email, Password)
        .then((userinfo) => {
          console.log(userinfo);
          if (auth.currentUser.emailVerified) {
            navigate("/rootlayout/Dashboard");
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
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  /**
   * todo : handleLoginWithGoodle function implement
   * @param (null)
   * return : null
   * @description : This function is used to login with google account.
   */
  const handleLoginWithGoodle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const snapshot = await get(child(ref(db), "users"));
      let isMatch = false;

      if (snapshot.exists()) {
        const usersData = Object.values(snapshot.val());
        isMatch = usersData.some((item) => item.email === user.email);
      }

      if (!isMatch) {
        await set(push(ref(db, "users/")), {
          username: user.displayName,
          email: user.email,
          profile_picture:
            user.photoURL || "https://www.w3schools.com/howto/img_avatar.png",
          uid: user.uid,
          bio: "Add your bio...... Hi! My name is [Your Name]. I’m a [your first role, e.g., student] and also a passionate [your second role, e.g., developer]. I enjoy learning [your interests] and improving my skills through practice and real projects.",
        });
      }
      navigate("/rootlayout/Dashboard");
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      setUserLoginInfoError({
        ...UserLoginInfoError,
        Error: "Google Sign-in Error",
      });
    }
  };

  return (
    <>
      <div className="w-[100%] h-screen bg-BGWhite relative">
        <div className="w-full px-10 flex items-center justify-between absolute top-4 left-0 z-50">
          <div className="flex items-center">
            <h3 className="navlogo text-TextBlack relative font-semibold text-[22px]">
              ChatRoom
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <button
                className="p-3 rounded-full bg-BGGray text-TextBlack text-xl cursor-pointer"
                onClick={toggleTheme}
              >
                {theme === "light" ? <MdLightMode /> : <MdDarkMode />}
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center ">
          <div className=" w-[380px] flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-7">
              {/* Heading */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-TextDarkGray">
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
                  <div key={index} className="relative">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-TextGray"
                    >
                      {item.label}
                    </label>
                    {item.type == "password" ? (
                      // for password input
                      <input
                        onChange={handleInput}
                        name={item.name}
                        type={eye ? "text" : "password"}
                        id={item.id}
                        placeholder={item.placeholder}
                        className="mt-1 w-full px-3 py-2 text-TextGray border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm placeholder:text-TextGray"
                      />
                    ) : (
                      // for other inputs
                      <input
                        onChange={handleInput}
                        name={item.name}
                        type={item.type}
                        id={item.id}
                        placeholder={item.placeholder}
                        className="mt-1 w-full px-3 py-2 text-TextGray border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm placeholder:text-TextGray"
                      />
                    )}
                    {/* for password eye */}
                    {item.name === "Password" &&
                    UserLoginInfo.Password !== "" ? (
                      <span
                        onClick={handleEye}
                        className="absolute right-[12px] top-[34px] cursor-pointer text-[17px] text-gray-600"
                      >
                        {eye ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    ) : (
                      ""
                    )}
                    {/* for velidation */}
                    {UserLoginInfoError[`${item.name}Error`] && (
                      <span className="text-red-500 text-[12px]">
                        {UserLoginInfoError[`${item.name}Error`]}
                      </span>
                    )}
                  </div>
                ))}

                {/* Options Row */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm text-TextGray">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-green-600 border-gray-300 rounded cursor-pointer"
                    />
                    <span className="ml-2">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-green-600  hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md cursor-pointer"
                >
                  {loading ? "Loading..." : "Sign In"}
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
                  <button
                    onClick={handleLoginWithGoodle}
                    className="flex items-center justify-center w-1/2 border border-gray-300 rounded-md py-2  cursor-pointer"
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="w-5 h-5 mr-2"
                    />
                    <span className="text-sm text-TextGray">Google</span>
                  </button>
                  <button
                    // onClick={handleLoginWithFacebook}
                    className="flex items-center justify-center w-1/2 border border-gray-300 rounded-md py-2 cursor-pointer"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                      alt="GitHub"
                      className="w-5 h-5 mr-2"
                    />
                    <span className="text-sm text-TextGray">Facebook</span>
                  </button>
                </div>
              </div>

              {/* Bottom Link */}
              <p className="text-center text-sm text-TextGray mt-4">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-green-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
