'use client';

import Image from "next/image";
import { IoHomeOutline } from "react-icons/io5";
import { IoDocumentOutline } from "react-icons/io5";
import { RiPagesLine } from "react-icons/ri";
import { RiTeamLine } from "react-icons/ri";

import Link from "next/link";
export default function SideBar() {
    return (
        <div className="w-[15%] bg-black text-white p-4 flex flex-col gap-16 items-center">
            <div className=" flex justify-center">
                <Image src={'/images/ned_logo.jpg'} alt="ned logo" width={100} height={100}/>
            </div>
            <div className="flex flex-col gap-4">
                <Link className="flex gap-2 items-center" href={'/'}> <IoHomeOutline /> Home</Link>
                {/* <Link className="flex gap-2 items-center" href={'/report'}> <IoDocumentOutline /> Report</Link> */}
                <Link className="flex gap-2 items-center" href={'/about-us'}> <RiPagesLine /> About Us</Link>
                <Link className="flex gap-2 items-center" href={'/team'}> <RiTeamLine /> Team</Link>
            </div>
        </div>
    )
}