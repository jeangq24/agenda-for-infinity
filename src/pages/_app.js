import "@/styles/globals.css";
import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/router';
import localFont from 'next/font/local';
import { Poppins } from "next/font/google"
import { UserProvider } from '@/config/UserContext';
import { Toaster } from 'react-hot-toast';
import AuthGuard from "@/components/general/config/AuthGuard";
const laviossa = localFont({ src: "../../public/fonts/LaviossaMedium.woff2" })
const poppins = Poppins({ subsets: ['latin'], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });
import { SocketProvider } from "@/config/socketContext";
import { BurgerMenuProvider } from "@/config/BurgerMenuContext";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (

    <UserProvider>
      <AuthGuard>
        <SocketProvider>
          <NextUIProvider navigate={router.push}>
            <BurgerMenuProvider>
              <main className={`${laviossa.className}`}>
                <Component {...pageProps} />
                <Toaster />
              </main>
            </BurgerMenuProvider>
          </NextUIProvider>
        </SocketProvider>
      </AuthGuard>
    </UserProvider>
  );
};
