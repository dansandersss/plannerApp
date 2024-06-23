"use client";
import React, { useEffect, useState } from "react";
import Search from "../ui/SearchInput/Search";

function Navbar() {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const getCurrentDateTime = () => {
      const now = new Date();

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const month = monthNames[now.getMonth()];
      const day = now.getDate();
      const year = now.getFullYear();

      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");

      return `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
    };

    const updateDateTime = () => {
      setCurrentDateTime(getCurrentDateTime());
    };

    updateDateTime();

    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <section className="hidden lg:flex justify-between w-full items-center text-black px-[72px]">
        <div className="flex items-center gap-3">
          <div className="cursor-pointer hover:scale-125 transition-all duration-200 ease-in-out">
            <h1 className="text-[35px] font-bold flex flex-row gap-0 hover:gap-2 transition-all duration-200 ease-in-out">
              Task<span className=" text-newTextColor-7-1">Flow</span>
            </h1>
          </div>
        </div>

        <div>
          <Search />
        </div>

        <div>
          <p>{currentDateTime}</p>
        </div>
      </section>
    </>
  );
}

export default Navbar;
