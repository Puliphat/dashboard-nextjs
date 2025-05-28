'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/next.svg";
import { signOut } from "next-auth/react";

function Navbar({ session }) {
  return (
    <nav className="shadow-xl">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-6">
           <div>
            <Link href="/">
            <Image src={Logo} alt="Nextjs Logo" width={100} height={100} />
            </Link>
           </div>
          <ul className="flex">
            { !session ?(
              <>
             <li className="text-lg mx-3 cursor-pointer"><Link href="/login">Login</Link></li>
             <li className="text-lg mx-3 cursor-pointer"><Link href="/register">Register</Link></li>
              </>
            ):(
              <li className="text-lg mx-3 cursor-pointer">
              <Link href="/welcome" className="bg-gray-500 text-white border px-3 py-2 rounded-md text-lg my-2 mr-2" >Profile</Link>
              <a onClick={() => signOut()} className="bg-red-500 text-white border px-3 py-2 rounded-md text-lg my-2" >Logout</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
