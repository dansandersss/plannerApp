import React from "react";
import Image from "next/image";
import icons from "@/constants/icons";
import Search from "../ui/SearchInput/Search";

function Navbar() {
  return (
    <>
      <section className="flex justify-between w-full items-center text-black">
        <div className="flex items-center gap-3 pl-[72px]">
          {/* <Image
            className="w-[38px] h-[38px] hover:scale-150 transition-all ease-in-out duration-200 cursor-pointer pl-[72x] hover:rotate-12 rotate-0 hover:mr-2"
            src={icons.logo}
            alt="logo"
          /> */}
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
          <p>Date will go here</p>
        </div>
      </section>
    </>
  );
}

export default Navbar;
