import { SafeUser } from "@/app/types";
import Categories from "./Categories";
import TypeWriter from "@/app/typewriter/TypeWriter";


import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {
  return ( 
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
      <Container>
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
        >
          <Logo />
         <TypeWriter 
         text={"Hello Balázs"}
         interKeyStrokeDurationInMs={150}/>
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
      </div>
        <Categories />
      </div>
  );
}


export default Navbar;