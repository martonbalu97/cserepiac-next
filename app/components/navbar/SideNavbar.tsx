'use client'

import React, { useCallback, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
    MdOutlineFavoriteBorder,
  MdOutlineInfo,
  MdOutlineAddBox,
  MdOutlineLogout,
  MdOutlineLogin,
  MdOutlineManageAccounts,
  MdOutlineMarkunreadMailbox
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useUploadModal from "@/app/hooks/useUploadModal";
import { IoMdClose } from "react-icons/io";
import Avatar from "../Avatar";
import { signOut } from "next-auth/react";

interface UserMenuProps {
    currentUser?: SafeUser | null
  }
  

const SideNavbar: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
  
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const uploadModal = useUploadModal();
  
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleOpen = useCallback(() => {
      setIsOpen((value) => !value);
    }, []);
  
    const onUpload = useCallback(() =>{
        
      /*
        if(!currentUser){
          return loginModal.onOpen();
        }
        */
        
  
        uploadModal.onOpen();
        if(isOpen){
            toggleOpen()
        }
  
    }, [currentUser,loginModal,uploadModal])

    const loginModalOpen = useCallback(() =>{
        if(!currentUser){
            return loginModal.onOpen()
        }
    },[currentUser,loginModal])

  return (
    <div>
        <div className="absolute top-2 right-6 inline-flex  items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group"
        onClick={toggleOpen}
        >
          <GiHamburgerMenu
            className="block h-6 w-6"
          />
              
        </div>
        {isOpen &&(
            <div className="lg:border-l-2 p-6 w-full h-screen bg-white z-20 fixed top-0 xs:-left-0 lg:right-0 lg:w-80 focus:right-0 transition-all duration-300">
            <div className="flex flex-col justify-start item-center">
            <button
                  className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  "
                  onClick={toggleOpen}
                >
                  <IoMdClose size={18} />
                </button>
              <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
                Menü
              </h1>
              </div>
              <div className=" my-4 border-b border-gray-100 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-0 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              onClick={loginModalOpen}
              >
                <div className="text-2xl text-gray-600 group-hover:text-white " />
                <Avatar src={currentUser?.image} />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  {currentUser ? currentUser.name?.split(" ")[1]: "Profil"}
                </h3>
              </div>
              
              <div className="flex mb-2 justify-start items-center gap-4 pl-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              onClick={onUpload}
              >
                <MdOutlineAddBox size={30} className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Termék feltöltése
                </h3>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              onClick={onUpload}
              >
                <MdOutlineMarkunreadMailbox size={30} className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Saját piac
                </h3>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              >
                <MdOutlineFavoriteBorder size={30} className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Kedvencek
                </h3>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineInfo size={30} className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Rólunk
                </h3>
              </div>
              </div>
              <div className=" my-4 border-b border-gray-100 pb-4">
                {/* Belépés/regisztráció */}
                {!currentUser ?  (
                    <>
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                    onClick={loginModal.onOpen}
                    >
                      <MdOutlineLogin className="text-2xl text-gray-600 group-hover:text-white " />
                      <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                        Belépés
                      </h3>
                    </div>
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                    onClick={registerModal.onOpen}
                    >
                      <MdOutlineManageAccounts className="text-2xl text-gray-600 group-hover:text-white " />
                      <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                        Regisztráció
                      </h3>
                    </div>
                    </>
                ) : (
                    <>
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                    onClick={() => signOut()}
                    >
                    <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                      <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                        Kilépés
                      </h3>
                    </div>
                    </>
                )}
              </div>
              </div>
              
          )}
    </div>
  );
}

export default SideNavbar;