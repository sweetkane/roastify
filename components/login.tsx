import React from 'react';
import Image from "next/image";
import { redirectToAuthCodeFlow } from '../lib/spotify_login'
// import MascotImg from '../public/huang_mascot_idle.png'
const Login: React.FC = () => {


  const handleLoginClick = () => {
    if (typeof window !== 'undefined') {
      redirectToAuthCodeFlow();
    }
  };

    return (
          <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
              {/* <Image
                className="dark:invert"
                src={MascotImg.src}
                alt="Next.js logo"
                width={180}
                height={38}
                priority
              /> */}
              <button
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-green-400 hover:bg-green-900 hover:text-green-300 text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                onClick={handleLoginClick}
              >
                Log in with Spotify bruh
              </button>
            </main>
          </div>
        );
};

export default Login;