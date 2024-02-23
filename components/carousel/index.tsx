"use client";
import React, { useEffect, useState } from "react";
import Styles from "./carousel.module.css";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import useWindowDimensions from "@/hooks/windowDimension";
import { demoTrendingData } from "../../demoData/demoTrendingData";

const Slider = () => {
  const { windowWidth, windowHeight } = useWindowDimensions();
  const trendingAnime = demoTrendingData;
  console.log(trendingAnime);
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

  return (
    <div
      className={Styles.sliderBody}
      style={{ width: windowWidth, height: windowHeight }}
    >
      <ul className={`slider`}>
        {trendingAnime?.results?.map((item) => (
          <li
            id={item?.id}
            key={`${item.title}`}
            className={`${Styles.item} item`}
            style={{ backgroundImage: `url("${item?.image}")` }}
          >
            <div className={Styles.content}>
              <h2 className={Styles.title}>{item?.title?.english}</h2>
              <p
                className={Styles.description}
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></p>
              <button className={`${Styles.buttonSlider}`}>Watch Now</button>
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
