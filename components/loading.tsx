import React from "react";
import Loaderanime from "@/assets/zerotwo.gif";
const loading = () => {
  return (
    <div className="fixed w-screen h-screen top-0">
      <img
        src={Loaderanime.src}
        alt="loading"
        width={150}
        height={150}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default loading;
