"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMagnifyingGlass,
  faPlus,
  faRightFromBracket,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/context/GlobalProvider";
import { usePathname, useRouter } from "next/navigation";
import { getAllTasks, getCurrentUser, signOut } from "@/lib/appwrite";
import BasicModal from "../Modal/NewModal";
import { links } from "../../constants/linkInfo";
import Search from "../ui/SearchInput/Search";
import { useSidebar } from "./SidebarContext";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const [tasks, setTasks] = useState([]);
  const pathname = usePathname();
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize windowWidth
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getCurrentUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/login");
  };

  const avatarUrl = user?.avatar;

  return (
    <>
      <section
        className={`relative bg-[#FF6767] h-screen transition-all ease-in-out duration-200 border-r-2 rounded-sm lg:rounded-md ${
          isSidebarOpen ? "w-full lg:w-full" : "w-24 lg:w-full"
        }`}
      >
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 top-8 lg:-top-12 flex-col items-center justify-center lg:flex ${
            isSidebarOpen ? "flex" : "hidden"
          } `}
        >
          <div
            className={`bg-white 
            } rounded-full border-white ${
              isSidebarOpen || (!isSidebarOpen && windowWidth >= 1024)
                ? "block"
                : "hidden"
            } border-[4px]`}
          >
            <Image
              src={avatarUrl}
              alt=""
              width={86}
              height={86}
              className="rounded-full"
            />
          </div>
          <div className="text-center">
            <h1 className="text-white text-lg">{user?.username}</h1>
            <p className="text-white text-sm opacity-70">{user?.email}</p>
          </div>
        </div>

        <div
          className={`${
            isSidebarOpen ? "p-6" : "p-4"
          } pt-52 lg:pt-28 mt-0 lg:mt-16 flex flex-col flex-grow justify-between`}
        >
          <nav>
            <ul>
              <li className="flex flex-col relative">
                {links.map((link) => (
                  <Link
                    key={link.forward}
                    className={`flex ${
                      isSidebarOpen ? "" : "justify-center"
                    } items-center gap-4 hover:gap-5 ease-in-out duration-200 transition-all mb-[20px] ${
                      pathname === link.forward
                        ? "text-[#FF6767] p-3 rounded-md bg-white"
                        : "text-white"
                    }`}
                    href={link.forward}
                  >
                    <FontAwesomeIcon
                      style={{ height: "20px" }}
                      icon={link.icon}
                    />
                    {isSidebarOpen ||
                    (!isSidebarOpen && windowWidth >= 1024) ? (
                      <div className="flex items-center justify-between w-full">
                        <p className="text-[14px] md:text-[18px]">
                          {link.text}
                        </p>
                        {link.forward === "/pageTwo" && (
                          <button
                            className="relative bg-white text-[#FF6767] px-2 py-1 rounded-md"
                            onClick={(e) => {
                              e.preventDefault();
                              handleOpenModal();
                            }}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        )}
                      </div>
                    ) : null}
                  </Link>
                ))}
              </li>
            </ul>
            <button
              className="absolute top-0 left-0 text-white text-2xl p-4 rounded-full lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FontAwesomeIcon icon={isSidebarOpen ? faX : faBars} />
            </button>
          </nav>
          <div
            className={` flex lg:hidden justify-center mt-4 items-center gap-2`}
          >
            <FontAwesomeIcon
              onClick={() => setIsSidebarOpen(true)}
              className={` text-white cursor-pointer`}
              icon={faMagnifyingGlass}
            />
            <div className={`${isSidebarOpen ? "flex" : "hidden"}`}>
              <Search />
            </div>
          </div>

          <button
            onClick={logout}
            className="text-white justify-center flex items-center mt-[200px] gap-4 hover:gap-5 transition-all ease-in-out duration-200"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            <p
              className={`${
                isSidebarOpen || (!isSidebarOpen && windowWidth >= 1024)
                  ? "block"
                  : "hidden"
              }`}
            >
              LogOut
            </p>
          </button>
        </div>
      </section>
      <BasicModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Sidebar;
