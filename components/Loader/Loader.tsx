"use client";
import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import "./loader.css";
import images from "@/constants/images";

const Loader = ({ loadingTime }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const duration = loadingTime * 1000;
    const step = (100 / duration) * 10;
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + step
      );
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, [loadingTime]);
  return (
    <>
      <div className="loader-container bg-newBgColor-7-1 ">
        <div
          className={`flex justify-center items-center loader-content bg-${images.firstGradient} rounded-lg shadow-md`}
        >
          <div className="relative">
            <TailSpin
              visible={true}
              height="396"
              width="396"
              color="#fff"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
            <div
              className={`progressBar absolute bottom-[-50px] left-0 bg-white h-4 rounded-md`}
              style={{ width: `${Math.round(progress)}%` }}
            ></div>
            <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] text-white text-[1.2rem] font-bold">
              {Math.round(progress)}%
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
