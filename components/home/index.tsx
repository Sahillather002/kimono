import React, { useEffect } from "react";
import styles from "./home.module.css";
import Button from "../commons/button/buttons";
import gsap from "gsap";
const Home = () => {
  useEffect;
  useEffect(() => {
    animateHeading(".title");
  }, []);

  function animateHeading(element: any) {
    var newText = "";
    var theText = document.querySelector(element);
    for (let i = 0; i < theText?.innerText.length; i++) {
      if (theText.innerText[i] == " ") {
        newText += "<span>&nbsp;</span>";
      } else {
        newText += "<span>" + theText.innerText[i] + "</span>";
      }
    }
    theText.innerHTML = newText;
    gsap.fromTo(
      element + " span",
      { opacity: 0, x: -200, y: 30 },
      {
        duration: 2,
        opacity: 1,
        x: 0,
        stagger: 0.03,
        ease: "elastic(1.2, 0.5)",
        scrollTrigger: {
          trigger: element,
          start: "top 70%",
          toggleActions: "restart none none reverse",
        },
      }
    );
  }

  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.leftContainer}>
          <span className={`${styles.homeTitle} title`}>
            Enter the world of Anime
          </span>
          <p className={styles.homePara}>
            Welcome to Kimono a Free Anime Watch, your go-to destination for
            unlimited anime streaming. Dive into a world of captivating stories
            and vibrant characters, all accessible at no cost on our platform.
          </p>
          <a href="/home">
            <Button className={styles.homeButton}>Let's Watch</Button>
          </a>
        </div>
        <div className={`${styles.rightContainer} imageContainer`}>
          <img src="/animeHome.webp" alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;
