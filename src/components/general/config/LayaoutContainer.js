import Navbar from "@/components/general/navbar/Navbar";
import { WhatsappLogo } from "@phosphor-icons/react"
import {useRouter} from "next/router";
export default ({ children }) => {
    const router = useRouter();
    const currentPath = router.pathname;
    return (
        <div
            className={`flex w-screen min-h-screen h-auto lg:h-screen flex-col bg-infinity-white-alabaster relative`}
        >   
            <Navbar />
            {(currentPath !== "/admin") && (
                <button className="fixed bottom-6 right-6 w-12 h-12 rounded-full cursor-pointer z-10">
                    <div className="relative h-12 w-12 flex justify-center items-center rounded-full">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-infinity-pink-salmonPink opacity-75 transition duration-700"></span>
                        <WhatsappLogo className="w-12 h-12 rounded-full text-infinity-white-snow bg-infinity-pink-salmonPink p-2" />
                    </div>
                </button>
            )}
            <div className="w-full grow flex flex-col items-center justify-center overflow-auto lg:h-full">
                {children}
            </div>
        </div>
    );
    
};