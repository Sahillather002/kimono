import React, { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

import WaifuMasonry from "@/components/waifuMasonry/index";
import fetchWaifu from "../api/getWaifu";
import Loading from "@/components/loading";
import { waifuDemoData } from "@/components/waifuMasonry/waifuDemoData";

const Index = () => {
  const [waifuData, setWaifuData] = useState<null>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = waifuDemoData;
        setWaifuData(data);
      } catch (error) {
        console.error("Error fetching waifu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      // if the user scrolls down, show the button
      window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false);
    };
    // listen for scroll events
    window.addEventListener("scroll", toggleVisibility);

    // clear the listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // handles the animation when scrolling to the top
  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  };
  return (
    <div>
      {loading && <Loading />}
      {waifuData && !loading && <WaifuMasonry waifuData={waifuData} />}
      {
        <button
          className={`fixed bottom-4 right-4 rounded-full bg-red-300 p-2 outline-none transition-opacity duration-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={scrollToTop}
        >
          <AiOutlineArrowUp />
        </button>
      }
    </div>
  );
};

export default Index;
