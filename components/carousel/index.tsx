"use client";
import React, { useEffect, useState } from "react";
import Styles from "./carousel.module.css";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";

const items = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1779&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Lossless Youths",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
  },
  {
    imageUrl: "https://i.redd.it/tc0aqpv92pn21.jpg",
    title: "Estrange Bond",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1613487957484-32c977a8bd62?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The Gate Keeper",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Last Trace Of Us",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Last Trace Of Us",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1627672360124-4ed09583e14c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The Migration",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1627672360124-4ed09583e14c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The Migration",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1627672360124-4ed09583e14c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The Migration",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
  },
];



const Slider = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(getInitialHeight());

  function getInitialHeight() {
    // Define your media query condition here
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    // Set the initial height based on the condition
    return isMobile ? window.innerHeight / 2 : window.innerHeight;
  }

  const handlePrev = () => {
    const items = document.querySelectorAll(".item");
    const slider = document.querySelector(".slider");
    slider?.prepend(items[items.length - 1]);
  };

  const handleNext = () => {
    const items = document.querySelectorAll(".item");
    const slider = document.querySelector(".slider");
    slider?.append(items[0]);
  };

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

  return (
    <div className={Styles.sliderBody} style={{ width: windowWidth, height: windowHeight }}>
      <ul className={`slider`}>
        {items.map((item) => (
          <li
            key={`${item.title}`}
            className={`${Styles.item} item`}
            style={{ backgroundImage: `url("${item.imageUrl}")` }}
          >
            <div className={Styles.content}>
              <h2 className={Styles.title}>{item.title}</h2>
              <p className={Styles.description}>{item.description}</p>
              <button className={`${Styles.buttonSlider}`}>Read More</button>
            </div>
          </li>
        ))}
      </ul>

      <div className={`${Styles.nav}`}>
        <div className={`${Styles.btn} prev`} onClick={handlePrev}>
          <IoArrowBackCircle size={36} />
        </div>
        <div className={`${Styles.btn} next`} onClick={handleNext}>
          <IoArrowForwardCircle size={36} />
        </div>
      </div>
    </div>
  );
};

export default Slider;

