import React from "react";
import styles from "./home.module.css";
import Button from "../commons/button/buttons";
const Home = () => {
  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.leftContainer}>
          <span className={styles.homeTitle}>Enter the world of Anime</span>
          <p className={styles.homePara}>
            Welcome to Kimono a Free Anime Watch, your go-to destination for
            unlimited anime streaming. Dive into a world of captivating stories
            and vibrant characters, all accessible at no cost on our platform.
          </p>
          <a href="/home">
            <Button className={styles.homeButton}>Let's Watch</Button>
          </a>
        </div>
        <div className={styles.rightContainer}>
          <img src="/animeHome.webp" alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;
