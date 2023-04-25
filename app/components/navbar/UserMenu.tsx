'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useUploadModal from "@/app/hooks/useUploadModal"

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
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
      if(!currentUser){
        return loginModal.onOpen();
      }

      uploadModal.onOpen();

  }, [currentUser,loginModal,uploadModal])


  return ( 
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div 
          onClick={onUpload}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Saját piac
        </div>
        <div 
        onClick={toggleOpen}
        className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
          {currentUser && (
            <div className="hidden md:block">
            Szia, {currentUser?.name?.split(" ")[1]}
          </div>
          )}

          <AiOutlineMenu />
        </div>
      </div>
      {isOpen && (
        <div 
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem 
                  label="Saját profil" 
                  onClick={() => router.push('/profile')}
                />
                <MenuItem 
                  label="Kedvencek" 
                  onClick={() => router.push('/favorites')}
                />
                
                <MenuItem 
                  label="Saját piac" 
                  onClick={onUpload}
                />
                <hr />
                <MenuItem 
                  label="Kilépés" 
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="Belépés" 
                  onClick={loginModal.onOpen}
                />
                <MenuItem 
                  label="Regisztráció" 
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
   );
}
 
export default UserMenu;