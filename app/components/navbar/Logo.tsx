'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import log from '@/public/images/logo.png'

const Logo = () => {
  const router = useRouter();

  return ( 
    <Image
      onClick={() => router.push('/')}
      className="hidden md:block cursor-pointer" 
      src={log}
      height="200" 
      width="200" 
      alt="Logo" 
    />
   );
}
 
export default Logo;
