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
const Carousel = dynamic(() => import("@/components/carousel/index"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Carousel />
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
    </>
  );
}
