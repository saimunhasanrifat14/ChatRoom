import React, { useState } from "react";
import { Link } from "react-router-dom";
import banner from ".././assets/singupPageIMG/benner.jpg";

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
      label: "Email address",
      type: "password",
    },
  ];

  const [logininfo, setlogininfo] = useState({
    FullName: "",
    Email: "",
    Password: "",
  });
  
  const [logininfoError, setlogininfoError] = useState({
    FullNameError: "",
    EmailError: "",
    PasswordError: "",
  });

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
    } else {
      setlogininfoError({
        ...logininfoError,
        PasswordError: "Password missing",
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
                {inputDetails.map((item) => (
                  <div>
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
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
                >
                  Sign up
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
