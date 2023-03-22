import React, { useState } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { WiDaySprinkle, WiCloudyWindy } from "react-icons/wi";
import { AiOutlineEye } from "react-icons/ai";
import { BiLeaf } from "react-icons/bi";
const Location = ({
  latitude,
  longitude,
  main,
  city,
  tempC,
  tempF,
  humidity,
  country,
  wind,
  visibility,
  aqi,
}) => {
  const [isCelcius, setCelcius] = useState(true);
  const [temperature, setTemperature] = useState(tempC);
  const handleClick = () => {
    if (isCelcius) {
      setTemperature(tempC);
    } else {
      setTemperature(tempF);
    }
    setCelcius(!isCelcius);
  };
  var message = "";
  var desc = "";
  if (aqi === 1) {
    message = "Good";
    desc = "The air quality is ideal for most individuals";
  } else if (aqi === 2) {
    message = "Fair";
    desc = "Sensitive groups may experience minor symptoms from long exposure";
  } else if (aqi === 3) {
    message = "Moderate";
    desc = "Unhealty for sensitve groups - reduce time spent outside";
  } else if (aqi === 4) {
    message = "Poor";
    desc = "Healthy individuals may experience difficulty in breathing";
  } else {
    message = "Very Poor";
    desc =
      "Healthy individuals may experience difficulty in breathing, Consider stay indoors";
  }
  return (
    <div className="text-white w-full md:w-9/12 lg:w-5/12 container">
      {/* <div className="container mx-auto p-12">
        <form className="flex items-center flex-col">
          <div className="w-10/12 flex flex-row items-center rounded-full h-full bg-white/60 text-black">
            <input
              type="text"
              className="text-black w-10/12 flex flex-row h-9 bg-white/0 outline-none p-4 rounded-full placeholder:text-slate-500"
              placeholder="Search"
            />
            <AiOutlineSearch className="text-slate-500" />
          </div>
        </form>
      </div> */}

      <div className="container">
        <div className=" inline-flex">
          <div>
            <h1 className="font-sans text-[9rem] ml-6 font-semibold lg:text-[8rem]">
              {temperature ? temperature : tempF}
            </h1>
          </div>
          <div className="pt-4">
            <p className="text-4xl lg:text-3xl">{isCelcius ? "°F" : "°C"}</p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-medium lg:text-2xl">{main}</h2>
          <h2 className="text-3xl font-medium lg:text-2xl">
            {city}&nbsp;{country}
          </h2>
        </div>
      </div>
      <div className="button mt-3 p-3">
        <button
          className="p-3 w-20 h-9 inline-flex  border-2 border-slate-200 items-center justify-center outline-none font-medium text-xl"
          onClick={handleClick}
        >
          {isCelcius ? "C" : "C"}&nbsp;
          {isCelcius ? <BsToggleOff size={19} /> : <BsToggleOn />}
        </button>
      </div>
      <div className="flex justify-around mt-9 mb-9 items-center lg:mt-6 lg:mb-6">
        <div>
          <WiDaySprinkle size={60} />
          <p>{humidity}&nbsp;%</p>
        </div>
        <div>
          <AiOutlineEye size={60} />
          <p>{visibility}&nbsp;mi</p>
        </div>
        <div>
          <WiCloudyWindy size={60} />
          <p>{wind}&nbsp;Km/hr</p>
        </div>
      </div>
      <div className="flex aqi p-8 h-[45%] lg:h-[40%]">
        <div className="flex items-center  flex-col justify-around p-5 bg-[#A0A0A0]/50 w-full h-full rounded-2xl ">
          <div className="flex items-center">
            <BiLeaf size={30} />
            <h1 className="text-2xl ml-4">Air Quality Index</h1>
          </div>
          <div className="flex items-center justify-around">
            <h1 className="text-8xl">{aqi}</h1>
            <p className="text-3xl ml-8 pt-11">{message}</p>
          </div>
          <div>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
