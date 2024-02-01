import { useState, useEffect } from "react";

function useWindowDimensions() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(getInitialHeight());

  function getInitialHeight() {
    // Define your media query condition here
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Set the initial height based on the condition
    return isMobile ? window.innerHeight / 2 : window.innerHeight;
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      // Update the height based on the media query condition
      setWindowHeight(getInitialHeight());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { windowWidth, windowHeight };
}

export default useWindowDimensions;
