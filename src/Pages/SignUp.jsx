import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import banner from ".././assets/singupPageIMG/benner.jpg";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import app from "../../Database/Firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const inputDetails = [
    {
      id: 1,
      name: "FullName",
      placeholder: "Your Full Name",
      label: "Full Name",
      type: "text",
    },
    {
      id: 2,
      name: "Email",
      placeholder: "you@example.com",
      label: "Email",
      type: "email",
    },
    {
      id: 3,
      name: "Password",
      placeholder: "••••••••",
      label: "Password",
      type: "password",
    },
  ];
  // for user dada store
  const [logininfo, setlogininfo] = useState({
    FullName: "",
    Email: "",
    Password: "",
  });
  // for erorr handling
  const [logininfoError, setlogininfoError] = useState({
    FullNameError: "",
    EmailError: "",
    PasswordError: "",
  });

  const auth = getAuth(app);
  const navigate = useNavigate();
  const db = getDatabase();
  const [eye, seteye] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * todo : password eye function implement
   * @param ({event})
   * return : null
   */
  const handleEye = () => {
    seteye(!eye);
  };

  /**
   * todo : handleInput function implement
   * @param ({event})
   * return : null
   */
  const handleInput = (event) => {
    const { name, value } = event.target;
    setlogininfo({
      ...logininfo,
      [name]: value,
    });
    setlogininfoError((prev) => ({
      ...prev,
      [`${name}Error`]: "",
    }));
  };

  /**
   * todo : handleSubmit function implement
   * @param (null)
   * return : null
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const { FullName, Email, Password } = logininfo;
    if (!FullName) {
      setlogininfoError({
        ...logininfoError,
        FullNameError: "FullName Missing",
      });
    } else if (!Email) {
      setlogininfoError({
        ...logininfoError,
        EmailError: "Email missing",
      });
    } else if (!Password) {
      setlogininfoError({
        ...logininfoError,
        PasswordError: "Password missing",
      });
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, Email, Password)
        .then((userinfo) => {
          updateProfile(auth.currentUser, {
            displayName: logininfo.FullName || "User",
            photoURL: "https://www.w3schools.com/howto/img_avatar.png",
          });
          console.log("successfully registered");
          setlogininfo({
            ...logininfo,
            FullName: "",
            Email: "",
            Password: "",
          });
          navigate("/EmailVerification");
        })
        .then(() => {
          sendEmailVerification(auth.currentUser);
          set(push(ref(db, "users/")), {
            username:
              auth.currentUser.displayName || logininfo.FullName || "User",
            email: auth.currentUser.email || logininfo.Email || "",
            profile_picture:
              auth.currentUser.photoURL ||
              "https://www.w3schools.com/howto/img_avatar.png",
            uid: auth.currentUser.uid || "",
            bio: "Add your bio...... Hi! My name is [Your Name]. I’m a [your first role, e.g., student] and also a passionate [your second role, e.g., developer]. I enjoy learning [your interests] and improving my skills through practice and real projects.",
          });
        })
        .catch((err) => {
          console.log("error is", err.code);
          if (err.code === "auth/email-already-in-use") {
            setlogininfoError({
              ...logininfoError,
              EmailError: "This email is already registered.",
            });
          } else if (err.code === "auth/weak-password") {
            setlogininfoError({
              ...logininfoError,
              PasswordError: "Password should be at least 6 characters long.",
            });
          } else if (err.code === "auth/invalid-email") {
            setlogininfo({
              ...logininfoError,
              EmailError: "Please enter a valid email.",
            });
          } else {
            setlogininfo({
              ...logininfoError,
              EmailError: "Something went wrong. Please try again.",
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="w-full h-screen flex">
        <div className="w-[60%] h-full flex items-center justify-center">
          <div className="min-h-screen w-[380px] flex items-center justify-center bg-white">
            <div className="w-full flex flex-col gap-8">
              {/* Heading */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Get started with easily registert
                </h2>
                <p className="text-gray-400 text-[16px] mt-1">
                  Free register and you can enjoy it
                </p>
              </div>

              {/* Sign Up Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {inputDetails.map((item, index) => (
                  <div key={index} className="relative">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
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
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none relative focus:ring-green-500 focus:border-green-500 text-sm"
                      />
                    ) : (
                      // for other inputs
                      <input
                        onChange={handleInput}
                        name={item.name}
                        type={item.type}
                        id={item.id}
                        placeholder={item.placeholder}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none relative focus:ring-green-500 focus:border-green-500 text-sm"
                      />
                    )}
                    {/* for password eye */}
                    {item.name === "Password" && logininfo.Password !== "" ? (
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
                    {logininfoError[`${item.name}Error`] && (
                      <span className="text-red-500 text-[12px]">
                        {logininfoError[`${item.name}Error`]}
                      </span>
                    )}
                  </div>
                ))}

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md cursor-pointer"
                >
                  {loading ? "Loading..." : "Sign Up"}
                </button>
              </form>
              {/* navigate to login page */}
              <p className="text-sm text-gray-500 mt-1 text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-[40%} h-full flex items-center justify-center">
          <img className="w-full h-full" src={banner} alt="" />
        </div>
      </div>
    </>
  );
};

export default SignUp;
