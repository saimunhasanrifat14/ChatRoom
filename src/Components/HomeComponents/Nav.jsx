import React from "react";
import { MdDarkMode, MdLightMode, MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTheme } from "../../Context/ThemeProvider";

const Nav = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className="flex justify-between py-3 px-20 backdrop-blur-lg shadow-[0_10px_25px_rgba(0,0,0,0.10)] ">
        <div className="flex items-center">
          <h3 className="navlogo text-TextBlack relative font-semibold text-[22px]">
            ChatRoom
          </h3>
        </div>
        <div className="flex items-center">
          <ul className="flex gap-5 bg-BGGray text-TextBlack py-2 px-7 rounded-3xl">
            <li>About</li>
            <li>Features</li>
            <li>Benefits</li>
            <li>Plan</li>
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <Link
              to={"/signup"}
              className="bg-BGGray text-TextBlack pl-4 p-1 rounded-3xl flex items-center"
            >
              Try out!{" "}
              <span className="p-2 text-[22px] ml-2 bg-BGLightGreen rounded-full ">
                <MdOutlineArrowOutward />
              </span>
            </Link>
          </div>
          <div>
            <button
              className="p-3 rounded-full bg-BGBlack text-TextWhite text-xl cursor-pointer"
              onClick={toggleTheme}
            >
              {theme === "light" ? <MdLightMode /> : <MdDarkMode />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
