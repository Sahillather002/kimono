import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithRedirect,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { IoLogoSnapchat } from "react-icons/io5";
import { useCallback, useEffect } from "react";

import { auth } from "@/firebase/firebase.config";
import { useRouter } from "next/router";

const Index = () => {
  const googleProvider = new GoogleAuthProvider();
  const router = useRouter();
  const handleLogin = useCallback(async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error("Error during login: ", error);
    }
  }, [googleProvider]);

  const handleAnonymousLogin = () => {
    router.push("/home");
  };

  useEffect(() => {
    const authCheck = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log("success");
        });
      }
    });
    return () => authCheck();
  }, [auth]);

  return (
    <div className="backgroundBlack">
      <div
        style={{
          background: `url("/animeCollection.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="w-screen h-screen flex items-center justify-center px-4 py-6"
      >
        <div className="w-full lg:w-96 px-4 py-6 rounded-md backdrop-blur-md flex items-center justify-center flex-col gap-8 bg-[rgba]">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-3xl text-white">Welcome Back!</p>
            <p className="text-lg text-gray-200">
              Sign in to the realm of Anime
            </p>
          </div>
          <div
            onClick={handleLogin}
            className="w-full lg:w-auto px-4 py-3 flex items-center justify-center border border-gray-200 cursor-pointer rounded-md active:scale-95 transition-all duration-150 ease-in-out gap-4 bg-[rgba(255,255,255,0.2)]"
          >
            <FcGoogle className="text-3xl" />
            <p className="text-lg font-semibold text-white">Google Sign In</p>
          </div>
          <div
            onClick={handleAnonymousLogin}
            className="w-full lg:w-auto px-4 py-3 flex items-center justify-center border border-gray-200 cursor-pointer rounded-md active:scale-95 transition-all duration-150 ease-in-out gap-4 bg-[rgba(255,255,255,0.2)]"
          >
            <IoLogoSnapchat className="text-3xl" />
            <p className="text-lg font-semibold text-white">
              Sign In Anonymous
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
