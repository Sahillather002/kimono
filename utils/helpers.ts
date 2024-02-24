import { Title } from "@/types/animeType";

export const setBackgroundImage = (imageUrl: string) => {
  return {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
};

export const getAnimeTitle = (title: Title) => {
  if (!title) return ""; // Handle case when title is undefined

  return typeof title !== "string"
    ? title.english || title.native || title.romaji || title.userPreferred || "" // handle non-string types
    : title;
};

export function moveCursor(element: any) {
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

export function lettersAnimation(element: any) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const list = document.querySelectorAll(element);

  list.forEach((item) => {
    item.onmouseenter = (event: any) => {
      const targetElement = event.target.querySelector("h2");

      // Log the value of targetElement and targetElement.dataset.value for debugging
      console.log("targetElement:", targetElement);
      console.log("targetElement.dataset.value:", targetElement.dataset.value);

      if (targetElement && targetElement.dataset.value) {
        let iteration = 0;
        const interval = setInterval(() => {
          targetElement.innerText = targetElement.innerText
            .split("")
            .map((letter: any, index: number) => {
              if (index < iteration) {
                return targetElement.dataset.value[index];
              }
              return letter[Math.floor(Math.random() * 26)];
            })
            .join("");

          console.log("target", targetElement);

          if (iteration >= targetElement.dataset.value.length) {
            clearInterval(interval);
          }
          iteration += 1 / 3;
        }, 20);
      }
    };
  });
}
