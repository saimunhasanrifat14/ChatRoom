import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import Nav from "./Nav";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import sliderimg from "../../assets/HomePageIMG/profile.jpg";
import image1 from "../../assets/HomePageIMG/image1.jpg";
import image2 from "../../assets/HomePageIMG/image2.jpg";
import image3 from "../../assets/HomePageIMG/image3.jpg";
import image4 from "../../assets/HomePageIMG/image4.jpg";
import image5 from "../../assets/HomePageIMG/image5.jpg";

import img1 from "../../assets/HomePageIMG/img1.jpg";
import img2 from "../../assets/HomePageIMG/img2.jpg";
import img3 from "../../assets/HomePageIMG/img3.jpg";
import img4 from "../../assets/HomePageIMG/img4.jpg";
import img5 from "../../assets/HomePageIMG/img5.jpg";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div>
        <div className="absolute top-0 left-0 z-10 w-full">
          <Nav />
        </div>
        <div>
          <div className="h-[100vh] w-full flex items-center justify-between px-20 relative">
            <div className="w-[60%] flex items-center justify-between">
              <div className="flex flex-col gap-7">
                <h1 className="text-[70px] leading-[75px]">
                  Empower <br /> Connections <br /> with ChatRoom
                </h1>
                <p className="w-[50%]">
                  Lorem ipsum dolor,{" "}
                  <span className="text-gray-500">sit amet consectetur</span>{" "}
                  adipisicing elit. Ipsa ipsam dolor cumque{" "}
                  <span className="text-[#80cf9c]"> expedita</span>{" "}
                </p>
                <div className="flex gap-5">
                  <Link to={"/signup"} className="bg-black text-white pl-4 p-1 rounded-3xl flex items-center cursor-pointer">
                    Try out!{" "}
                    <span className="p-2 text-[22px] ml-2 bg-white rounded-full text-black">
                      <MdOutlineArrowOutward />
                    </span>
                  </Link>
                  <button className="bg-gray-100 pl-4 p-1 rounded-3xl flex items-center cursor-pointer">
                    Learn more{" "}
                    <span className="p-2 text-[22px] ml-2 bg-white rounded-full ">
                      <MdOutlineArrowOutward />
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-[40%] h-full flex items-center justify-between">
              <div className="w-full h-full flex">
                <div className="w-[50%] h-full overflow-hidden">
                  <Swiper
                    direction="vertical"
                    modules={[Autoplay]}
                    autoplay={{
                      delay: 0,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    speed={2000} // long speed for smoothness
                    loop={true}
                    allowTouchMove={true}
                    slidesPerView={3}
                    spaceBetween={0}
                    className="h-full w-ful "
                  >
                    <SwiperSlide>
                      <div className="text-white  my-4 p-10">
                        <div className="py-5">
                          <img
                            className="w-[100%] h-[240px] rounded-3xl"
                            src={image1}
                            alt=""
                          />
                          <button className="bg-black  sliderButton w-[65%] text-white p-1 pl-5 rounded-3xl flex items-center justify-between cursor-pointer">
                            Learn more{" "}
                            <span className="p-1 text-[22px] ml-2 bg-white rounded-full text-black cursor-pointer">
                              <MdOutlineArrowOutward />
                            </span>
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="text-white my-4 p-10">
                        <div className="py-5">
                          <img
                            className="w-[100%] h-[240px] rounded-3xl"
                            src={image2}
                            alt=""
                          />
                          <button className="bg-black  sliderButton w-[65%] text-white p-1 pl-5 rounded-3xl flex items-center justify-between cursor-pointer">
                            Learn more{" "}
                            <span className="p-1 text-[22px] ml-2 bg-white rounded-full text-black cursor-pointer">
                              <MdOutlineArrowOutward />
                            </span>
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="text-white  my-4 p-10">
                        <div className="py-5">
                          <img
                            className="w-[100%] h-[240px] rounded-3xl"
                            src={image3}
                            alt=""
                          />
                          <button className="bg-black  sliderButton w-[65%] text-white p-1 pl-5 rounded-3xl flex items-center justify-between cursor-pointer">
                            Learn more{" "}
                            <span className="p-1 text-[22px] ml-2 bg-white rounded-full text-black cursor-pointer">
                              <MdOutlineArrowOutward />
                            </span>
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="text-white  my-4 p-10">
                        <div className="py-5">
                          <img
                            className="w-[100%] h-[240px] rounded-3xl"
                            src={image4}
                            alt=""
                          />
                          <button className="bg-black  sliderButton w-[65%] text-white p-1 pl-5 rounded-3xl flex items-center justify-between cursor-pointer">
                            Learn more{" "}
                            <span className="p-1 text-[22px] ml-2 bg-white rounded-full text-black cursor-pointer">
                              <MdOutlineArrowOutward />
                            </span>
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="text-white my-4 p-10">
                        <div className="py-5">
                          <img
                            className="w-[100%] h-[240px] rounded-3xl"
                            src={image5}
                            alt=""
                          />
                          <button className="bg-black  sliderButton w-[65%] text-white p-1 pl-5 rounded-3xl flex items-center justify-between cursor-pointer">
                            Learn more{" "}
                            <span className="p-1 text-[22px] ml-2 bg-white rounded-full text-black cursor-pointer">
                              <MdOutlineArrowOutward />
                            </span>
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="w-[50%] h-full overflow-hidden">
                  <Swiper
                    direction="vertical"
                    modules={[Autoplay]}
                    autoplay={{
                      delay: 0,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    speed={2000}
                    loop={true}
                    allowTouchMove={true}
                    slidesPerView={3}
                    spaceBetween={0}
                    className="h-full w-full"
                    style={{
                      transform: "rotate(180deg)",
                      transformOrigin: "center",
                    }}
                  >
                    <SwiperSlide>
                      <div className="p-10 ">
                        <div className="py-5">
                          <img
                            className="w-[100%] h-[240px] rounded-3xl"
                            src={img1}
                            alt=""
                          />
                          <button className="bg-black  sliderRightButton w-[65%] text-white p-1 pl-5 rounded-3xl flex items-center justify-between cursor-pointer">
                            Learn more{" "}
                            <span className="p-1 text-[22px] ml-2 bg-white rounded-full text-black cursor-pointer">
                              <MdOutlineArrowOutward />
                            </span>
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="p-10">
                        <div className="py-5">
                          <img
                            className="w-[100%] h-[240px] rounded-3xl"
                            src={img2}
                            alt=""
                          />
                          <button className="bg-black  sliderRightButton w-[65%] text-white p-1 pl-5 rounded-3xl flex items-center justify-between cursor-pointer">
                            Learn more{" "}
                            <span className="p-1 text-[22px] ml-2 bg-white rounded-full text-black cursor-pointer">
                              <MdOutlineArrowOutward />
                            </span>
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="p-10">
                        <div className="py-5">
                          <img
                            className="w-[100%] h-[240px] rounded-3xl"
                            src={img3}
                            alt=""
                          />
                          <button className="bg-black  sliderRightButton w-[65%] text-white p-1 pl-5 rounded-3xl flex items-center justify-between cursor-pointer">
                            Learn more{" "}
                            <span className="p-1 text-[22px] ml-2 bg-white rounded-full text-black cursor-pointer">
                              <MdOutlineArrowOutward />
                            </span>
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="p-10">
                        <div className="py-5">
                          <img
                            className="w-[100%] h-[240px] rounded-3xl"
                            src={img4}
                            alt=""
                          />
                          <button className="bg-black  sliderRightButton w-[65%] text-white p-1 pl-5 rounded-3xl flex items-center justify-between cursor-pointer">
                            Learn more{" "}
                            <span className="p-1 text-[22px] ml-2 bg-white rounded-full text-black cursor-pointer">
                              <MdOutlineArrowOutward />
                            </span>
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="p-10">
                        <div className="py-5">
                          <img
                            className="w-[100%] h-[240px] rounded-3xl"
                            src={img5}
                            alt=""
                          />
                          <button className="bg-black  sliderRightButton w-[65%] text-white p-1 pl-5 rounded-3xl flex items-center justify-between cursor-pointer">
                            Learn more{" "}
                            <span className="p-1 text-[22px] ml-2 bg-white rounded-full text-black cursor-pointer">
                              <MdOutlineArrowOutward />
                            </span>
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-3 bg-gray-100 p-2 rounded-3xl">
                  <span className="p-3 rounded-full bg-white text-black flex items-center justify-center cursor-pointer">
                    <FaFacebookF />
                  </span>
                  <span className="p-3 rounded-full bg-white text-black flex items-center justify-center cursor-pointer">
                    <FaInstagram />
                  </span>
                  <span className="p-3 h-10 rounded-full bg-white text-black flex items-center justify-center cursor-pointer">
                    <FaLinkedinIn />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
