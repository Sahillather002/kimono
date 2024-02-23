import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// import required modules
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Anime } from "@/types/animeType";
import Banners from "./banner";

type props = {
  tredingAnime: Anime[];
};

const SlideBanner = ({ tredingAnime }: props) => {
  return (
    <Swiper
      autoplay={{ delay: 5000 }}
      modules={[Autoplay, Pagination]}
      pagination={{
        dynamicBullets: true,
      }}
    >
      {tredingAnime?.map((anime) => (
        <SwiperSlide key={anime?.id}>
          <Banners anime={anime} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideBanner;
