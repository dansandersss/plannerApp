"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/context/GlobalProvider";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser, signOut } from "@/lib/appwrite";
import BasicModal from "../Modal/NewModal";
import { links } from "../../constants/linkInfo";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const router = useRouter();

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
      <section className="relative bg-[#FF6767] h-screen border-r-2 rounded-md">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-12 flex flex-col items-center justify-center">
          <div className="bg-white rounded-full border-white border-[4px]">
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

        <div className="p-8 pt-28 mt-16 flex flex-col flex-grow justify-between">
          <nav>
            <ul>
              <li className="flex-col flex relative">
                {links.map((link) => (
                  <Link
                    key={link.forward}
                    className={`flex items-center gap-4 hover:gap-5 ease-in-out duration-200 transition-all mb-[20px] ${
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
                    <div className="flex items-center justify-between w-full">
                      <p className="text-[18px]">{link.text}</p>
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
                  </Link>
                ))}
              </li>
            </ul>
          </nav>
          <button
            onClick={logout}
            className="text-white flex items-center mt-[200px] gap-4 hover:gap-5 transition-all ease-in-out duration-200"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            <p>LogOut</p>
          </button>
        </div>
      </section>
      <BasicModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Sidebar;
