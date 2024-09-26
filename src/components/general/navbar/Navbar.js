
import Image from "next/image";
import logoImage from "../../../../public/logo.png";
import Link from "next/link";
import { useState } from "react";
import { gsap } from 'gsap';
import { useUser } from "@/config/UserContext";
import { useBurgerMenu } from "@/config/BurgerMenuContext";
export default () => {
    const {user} = useUser();
    const { handleBurgerClick, isOpenMenuBurguer } = useBurgerMenu();
    const classNameBurguerMenu = "w-full h-[2px] rounded-2xl bg-infinity-white-snow transition-transform duration-300 ease-in-out";

    return (
        <div className={"w-full h-auto py-6 bg-infinity-black-carbon flex flex-row justify-between items-center px-5 md:px-10 drop-shadow-md shadow-sm sticky top-0 z-20"}>
            <ul className="w-auto h-full flex flex-row items-center" >
                <Link href={"/admin"}>
                    <li className="text-infinity-white-standard hover:text-infinity-pink-lightPink transition duration-700 underline underline-offset-8 hidden lg:flex">
                        GESTIONA TU AGENDA
                    </li>

                    {user && <div
                        className="flex flex-col items-center justify-center gap-[3px] lg:hidden burger p-2 w-8 h-8 bg-infinity-pink-softPink hover:bg-infinity-pink-salmonPink text-infinity-white-snow rounded-full"
                        onClick={handleBurgerClick}
                    >
                        <div className={`${classNameBurguerMenu} ${isOpenMenuBurguer ? 'rotate-[-45deg] translate-y-[5px]' : ''}`}></div>
                        <div className={`${classNameBurguerMenu} ${isOpenMenuBurguer ? 'opacity-0' : ''}`}></div>
                        <div className={`${classNameBurguerMenu} ${isOpenMenuBurguer ? 'rotate-[45deg] translate-y-[-5px]' : ''}`}></div>
                    </div>}
                </Link>



            </ul>
            <div className="flex md:hidden">
                <Image
                    width={150}
                    alt="Logo INFINITY"
                    src={logoImage}
                    className="rounded-md"
                />

            </div>
            <div className="hidden md:flex">
                <Image
                    width={200}
                    alt="Logo INFINITY"
                    src={logoImage}
                    className="rounded-md"
                />

            </div>


        </div>
    );
}
