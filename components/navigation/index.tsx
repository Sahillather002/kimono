import React from "react";
import Styles from "./navigation.module.css";
import useWindowDimensions from "@/hooks/windowDimension";

const Navigation = () => {
  const { windowWidth } = useWindowDimensions();
  const handleDonateButton = () => {
    window.open("https://www.buymeacoffee.com/sahillather002", "_blank");
  };

  return (
    <header
      className={`${Styles.navigationHeader}`}
      style={{ width: windowWidth }}
    >
      <div className={`${Styles.logo}`}>
        <a href="/">Kimono</a>
      </div>
      <nav>
        <ul className={`${Styles.linksHead}`}>
          <li className={`${Styles.links}`}>
            <a href="/home">Home</a>
          </li>
          <li className={`${Styles.links}`}>
            <a href="#">Characters</a>
          </li>
          <li className={`${Styles.links}`}>
            <a href="/topanime">Top Anime</a>
          </li>
          <li className={`${Styles.links}`}>
            <a href="/Manga">Manga</a>
          </li>
          <li className={`${Styles.links}`}>
            <a href="/waifu">Waifu</a>
          </li>
        </ul>
      </nav>
      <button className={`${Styles.navButton}`} onClick={handleDonateButton}>
        Donate
      </button>
    </header>
  );
};

export default Navigation;
