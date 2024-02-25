import React from "react";
import ErrorImage from "@/assets/error.gif";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/commons/button/buttons";

function ErrorComponent() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="backgroundBlack fixed w-screen h-screen top-0 bg-base-300">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col space-y-5 items-center justify-center">
        <Image
          src={ErrorImage.src}
          alt="error"
          width={300}
          height={300}
          className=""
        />
        <p className="font-bold text-2xl">Something went wrong!</p>
        <div className="flex gap-3 items-center">
          <Link href="/">
            <Button className="btn-sm lg:btn-md btn btn-primary">
              Back to Home
            </Button>
          </Link>
          <Button
            onClick={handleReload}
            className="btn-sm lg:btn-md btn btn-primary"
          >
            Reload
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorComponent;
