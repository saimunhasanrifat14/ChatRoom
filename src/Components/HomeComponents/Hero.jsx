import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import Nav from "./Nav";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import sliderimg from "../../assets/HomePageIMG/profile.jpg"


const Hero = () => {
  return (
    <>
      <div>
        <div className="absolute top-0 left-0 z-10 w-full">
          <Nav />
        </div>
        <div>
          <div className="h-[100vh] w-full flex items-center justify-between px-15 relative">
            <div className="w-[50%] flex flex-col gap-7">
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
                <button className="bg-black text-white pl-4 p-1 rounded-3xl flex items-center cursor-pointer">
                  Try out!{" "}
                  <span className="p-2 text-[22px] ml-2 bg-white rounded-full text-black">
                    <MdOutlineArrowOutward />
                  </span>
                </button>
                <button className="bg-gray-100 pl-4 p-1 rounded-3xl flex items-center cursor-pointer">
                  Learn more{" "}
                  <span className="p-2 text-[22px] ml-2 bg-white rounded-full ">
                    <MdOutlineArrowOutward />
                  </span>
                </button>
              </div>
            </div>
            <div className="w-[40%] h-full flex">
              <div className="w-[50%] h-full overflow-hidden">
                <Swiper
                  direction="vertical"
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                  }}
                  speed={2000} // long speed for smoothness
                  loop={true}
                  allowTouchMove={true}
                  slidesPerView={3}
                  spaceBetween={0}
                  className="h-full w-ful flex flex-col gap-5"
                >
                  <SwiperSlide>
                    <div className="text-white text-2xl my-4 p-10"><div className="py-5"><img className="w-[100%] h-[240px] rounded-3xl" src={sliderimg} alt="" /></div></div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="text-white text-2xl my-4 p-10"><div className="py-5"><img className="w-[100%] h-[240px] rounded-3xl" src={sliderimg} alt="" /></div></div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="text-white text-2xl my-4 p-10"><div className="py-5"><img className="w-[100%] h-[240px] rounded-3xl" src={sliderimg} alt="" /></div></div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="text-white text-2xl my-4 p-10"><div className="py-5"><img className="w-[100%] h-[240px] rounded-3xl" src={sliderimg} alt="" /></div></div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="text-white text-2xl my-4 p-10"><div className="py-5"><img className="w-[100%] h-[240px] rounded-3xl" src={sliderimg} alt="" /></div></div>
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
                  }}
                  speed={2000}
                  loop={true}
                  allowTouchMove={true}
                  slidesPerView={3}
                  spaceBetween={0}
                  className="h-full w-full"
                  style={{
                    transform: "rotate(180deg)", // Flip the second swiper vertically to go bottom to top
                    transformOrigin: "center", // Ensure the rotation happens around the center
                  }}
                >
                  <SwiperSlide>
                    <div className="text-white text-2xl p-10 "><div className="py-5"><img className="w-[100%] h-[240px] rounded-3xl" src={sliderimg} alt="" /></div></div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="text-white text-2xl p-10"><div className="py-5"><img className="w-[100%] h-[240px] rounded-3xl" src={sliderimg} alt="" /></div></div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="text-white text-2xl p-10"><div className="py-5"><img className="w-[100%] h-[240px] rounded-3xl" src={sliderimg} alt="" /></div></div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="text-white text-2xl p-10"><div className="py-5"><img className="w-[100%] h-[240px] rounded-3xl" src={sliderimg} alt="" /></div></div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="text-white text-2xl p-10"><div className="py-5"><img className="w-[100%] h-[240px] rounded-3xl" src={sliderimg} alt="" /></div></div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
