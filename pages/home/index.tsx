import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./home.module.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import AnimeCard from "@/components/anime/animeCard";
import { demoRecent } from "../../demoData/demoRecent";
import TitlePrimary from "@/components/commons/titlePrimary";
import { demoPopular } from "../../demoData/demoPopular";
import { demoFavourite } from "../../demoData/demoFavourite";
import SlideBanner from "@/components/anime/slideBanner";
import { demoTrendingData } from "@/demoData/demoTrendingData";
import { demoFall } from "@/demoData/demoFall";
import { demoWinter } from "@/demoData/demoWinter";
import { demoSummer } from "@/demoData/demoSummer";
import { demoComment } from "@/demoData/demoComment";
import UpcomingBox from "@/components/upcomingBox/index";
export default function Home() {
  return (
    <>
      <SlideBanner tredingAnime={demoTrendingData?.results} />
      <div className="mt-5 container px-4 mb-[50px]">
        <TitlePrimary title="Trending Anime" />
        <Swiper
          slidesPerView={1}
          spaceBetween={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 3,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 4,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 5,
            },
          }}
          className="mySwiper"
        >
          {demoRecent?.results?.map((item) => (
            <SwiperSlide key={item?.id}>
              <AnimeCard
                image={item?.image}
                id={item?.id.toString()}
                title={item?.title?.english}
                type={item?.type}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-5 container px-4 mb-[50px]">
        <TitlePrimary title="Popular Anime" />
        <Swiper
          slidesPerView={1}
          spaceBetween={1}
          modules={[Autoplay, Pagination, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 3,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 4,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 5,
            },
          }}
          className="mySwiper"
        >
          {demoPopular?.results?.map((item) => (
            <SwiperSlide key={item?.id}>
              <AnimeCard
                image={item?.image}
                id={item?.id.toString()}
                title={item?.title?.english}
                type={item?.type}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-5 container px-4 mb-[50px]">
        <TitlePrimary title="Favourite Anime" />
        <Swiper
          slidesPerView={1}
          spaceBetween={1}
          modules={[Autoplay, Pagination, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 3,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 4,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 5,
            },
          }}
          className="mySwiper"
        >
          {demoFavourite?.results?.map((item) => (
            <SwiperSlide key={item?.id}>
              <AnimeCard
                image={item?.image}
                id={item?.id.toString()}
                title={item?.title?.english}
                type={item?.type}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="px-4 container">
        {/* {demoComment.length > 0 && <NewestComment comments={demoComment} />} */}
        <div className="mt-5 pb-5">
          <TitlePrimary title="Upcoming Season" />
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3 pt-5">
            <UpcomingBox title="Fall" anime={demoFall?.results} />
            <UpcomingBox title="Winter" anime={demoWinter?.results} />
            <UpcomingBox title="Summer" anime={demoSummer?.results} />
            <UpcomingBox title="Spring" anime={demoWinter?.results} />
          </div>
        </div>
      </div>
    </>
  );
}
