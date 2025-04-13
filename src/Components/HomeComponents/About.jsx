import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import FacebookLogo from "../../assets/HomePageIMG/Facebook.png";
import InstagrapLogo from "../../assets/HomePageIMG/Instagram.png";
import WhatsappLogo from "../../assets/HomePageIMG/Whatsapp.png";
import TwitterLogo from "../../assets/HomePageIMG/Twitter.png";
import LinkdenLogo from "../../assets/HomePageIMG/Linkden.png";
import TelegramLogo from "../../assets/HomePageIMG/Telegram.png";
import MessengerLogo from "../../assets/HomePageIMG/Messenger.png";
import SnapchatLogo from "../../assets/HomePageIMg/Snapchat.png";
import { MdOutlineArrowOutward } from "react-icons/md";

const About = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-between">
        <div className="w-[50%] flex items-center justify-center relative overflow-hidden">
          <div className="aboutLogo w-[750px] h-[750px] flex items-center justify-center rounded-full z-1 relative">
            <h3 className="aboutLogoText text-[28px] font-semibold w-[270px] h-[270px] rounded-full bg-white flex items-center justify-center border-solid border-gray-100 border-[35px] shadow-[0_0px_50px_rgba(0,0,0,0.20)]">
              ChatRoom
            </h3>
            <div className="aboutFirstIcon w-full h-full">
              <span className="instagramIcon">
                <img className="w-11 h-11" src={InstagrapLogo} alt="" />
              </span>
              <span className="snapchatIcon">
                <img className="w-11 h-11" src={SnapchatLogo} alt="" />
              </span>
              <span className="whatsappIcon">
                <img className="w-11 h-11" src={WhatsappLogo} alt="" />
              </span>
            </div>
            <div className="aboutSecondIcon w-[80%] h-[80%]">
              <span className="facebookIcon">
                <img className="w-11 h-11" src={FacebookLogo} alt="" />
              </span>
              <span className="twitterIcon">
                <img className="w-11 h-11" src={TwitterLogo} alt="" />
              </span>
              <span className="telegramIcon">
                <img className="w-11 h-11" src={TelegramLogo} alt="" />
              </span>
              <span className="messangerIcon">
                <img className="w-11 h-11" src={MessengerLogo} alt="" />
              </span>
              <span className="linkdenIcon">
                <img className="w-11 h-11" src={LinkdenLogo} alt="" />
              </span>
            </div>
            <div className="aboutTherdIcon w-[60%] h-[60%]"></div>
          </div>
        </div>
        <div className="w-[50%] flex items-center">
          <div className="flex flex-col gap-7 items-start">
            <h1 className=" text-[50px]">All in one App</h1>
            <p className="w-[450px]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
              dolore sed voluptatum eveniet nemo sapiente deleniti voluptate
              voluptas maxime at totam dolor dolorum minima, nobis quaerat in
              aut magnam quam.
            </p>
            <div className="flex gap-5">
              <button className="bg-black text-white pl-4 p-1 rounded-3xl flex items-center cursor-pointer">
                Try out!{" "}
                <span className="p-1 text-[22px] ml-2 bg-white rounded-full text-black">
                  <MdOutlineArrowOutward />
                </span>
              </button>
              <button className="bg-gray-100 pl-4 p-1 rounded-3xl flex items-center cursor-pointer">
                Learn more{" "}
                <span className="p-1 text-[22px] ml-2 bg-white rounded-full ">
                  <MdOutlineArrowOutward />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
