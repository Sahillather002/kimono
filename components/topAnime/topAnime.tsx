import { useEffect } from "react";
import { gsap } from "gsap";
import { BiNavigation } from "react-icons/bi";
import styles from "./topAnime.module.css";
import { animeListData } from "./animeListData";

const TopAnime = () => {
  useEffect(() => {
    animateHeading(".title");
    animateAnimeList(".list");
    moveCursor(".ball");
  }, []);

  function animateHeading(element: any) {
    var newText = "";
    var theText = document.querySelector(element);
    for (let i = 0; i < theText.innerText.length; i++) {
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

  function animateAnimeList(element: any) {
    const items = document.querySelectorAll(element);

    items.forEach((item) => {
      gsap.set(".hoverImg", {
        xPercent: -50,
        yPercent: -50,
      });
      const image = item.querySelector(".hoverImg");
      const innerImage = item.querySelector(".hoverImg");
      const pos = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      const mouse = {
        x: pos.x,
      };
      const speed = 0.1;
      const xSet = gsap.quickSetter(image, "x", "px");
      window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
      });
      gsap.ticker.add(() => {
        const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
        pos.x += (mouse.x - pos.x) * dt;
        xSet(pos.x);
      });
    });
  }

  function moveCursor(element: any) {
    const ball = document.querySelector(element);
    gsap.set(".ball", {
      xPercent: -50,
      yPercent: -50,
    });
    const pos = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    const mouse = {
      x: pos.x,
      y: pos.y,
    };
    const speed = 0.05;
    const xSet = gsap.quickSetter(ball, "x", "px");
    const ySet = gsap.quickSetter(ball, "y", "px");
    window.addEventListener("mousemove", (item) => {
      mouse.x = item.x;
      mouse.y = item.y;
    });
    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    });
  }

  return (
    <div>
      <div className={styles.containerBody}>
        <div className={`${styles.ball} ball`}></div>

        <div className={styles.videoContainer}>
          <video playsInline autoPlay muted loop>
            <source
              src="https://www.yudiz.com/codepen/hover-reveal/amv.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className={`${styles.animeList} animeList`}>
          <h1 className={`${styles.title} title`} id="text-anim">
            Shinzou wo Sasageyo
          </h1>
          <ul>
            {animeListData.map((item, index) => (
              <li key={index} className="list">
                <div className={styles.index}>
                  <span>{item.index}</span>
                </div>
                <div className={styles.releaseYear}>
                  <span>{item.releaseYear}</span>
                </div>
                <div className={styles.animeName}>
                  <h2>{item.name}</h2>
                </div>
                <div className={styles.genre}>
                  <span>{item.genre}</span>
                </div>
                <div className={styles.redirectLink}>
                  <a
                    href={item.imdbLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BiNavigation />
                  </a>
                </div>
                <div className={`${styles.hoverImg} hoverImg`}>
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className={styles.imgFluid}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopAnime;
