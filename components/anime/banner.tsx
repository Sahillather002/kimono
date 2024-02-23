import React from "react";
import { GrStatusDisabledSmall } from "react-icons/gr";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiFillClockCircle, AiOutlineRight } from "react-icons/ai";
import { BsFillPlayCircleFill, BsFillCalendarDateFill } from "react-icons/bs";

// web functions
import path from "@/utils/path";
import GenresItem from "../commons/genresItem";

// helpers
import { Anime } from "@/types/animeType";
import { getAnimeTitle, setBackgroundImage } from "@/utils/helpers";

type props = {
  anime: Anime;
};

const Banners = ({ anime }: props) => {
  return (
    <div
      style={setBackgroundImage(anime?.cover)}
      className="lg:aspect-[3/1.5] md:aspect-[3/2] relative aspect-[1/1] w-full banner"
    >
      <div className="z-[999] absolute container top-[50%] translate-y-[-50%] p-16 w-full left-[50%] translate-x-[-50%] flex items-center justify-center space-x-8">
        <div className="flex-1">
          <h3
            style={{ color: anime?.color ? anime.color : undefined }}
            className="md:text-4xl text:2xl font-bold lg:line-clamp-2 line-clamp-1"
          >
            {getAnimeTitle(anime?.title)}
          </h3>
          <div className="flex items-center space-x-4 md:mt-4 mt-3">
            {anime?.type && (
              <p className="flex items-center space-x-2 text-sm">
                <BsFillPlayCircleFill fill="red" />
                <span>{anime?.type}</span>
              </p>
            )}
            {anime?.duration && (
              <p className="flex items-center space-x-2 text-sm">
                <AiFillClockCircle fill="yellow" />
                <span>{anime?.duration}m</span>
              </p>
            )}
            {anime?.releaseDate && (
              <p className="flex items-center space-x-2 text-sm">
                <BsFillCalendarDateFill fill="black" />
                <span>{anime?.releaseDate}</span>
              </p>
            )}
            {anime?.status && (
              <p className="flex items-center space-x-2 text-sm">
                <GrStatusDisabledSmall fill="green" />
                <span>{anime?.status}</span>
              </p>
            )}
          </div>
          <div className="md:mt-5 mt-3 space-x-4">
            {anime?.genres?.slice(0, 3)?.map((item) => (
              <GenresItem key={item} genres={item} />
            ))}
          </div>
          <div
            className="md:text-[14px] text-xs font-normal mt-4 lg:line-clamp-5 md:line-clamp-3 line-clamp-1"
            dangerouslySetInnerHTML={{ __html: anime?.description }}
          />
          <div className="space-x-4 flex items-center mt-5">
            <a
              className="bg-red-400 px-4 py-2 rounded-full flex items-center space-x-2"
              href={path.watch(anime?.id)}
            >
              <BsFillPlayCircleFill className="md:text-sm text-lg" />
              <span className="font-semibold md:text-sm text-xs">
                Watch now
              </span>
            </a>
            <a
              className="text-white bg-gray-500 px-4 py-2 rounded-full flex items-center space-x-2"
              href={path.anime(anime?.id)}
            >
              <span className="font-semibold md:text-sm text-xs">Detail</span>
              <AiOutlineRight className="md:text-sm text-lg" />
            </a>
          </div>
        </div>
        <div className="md:block hidden">
          <LazyLoadImage
            className="rounded-md w-[250px] hover:scale-105 brightness-110 hover:brightness-120"
            src={anime.image}
          />
        </div>
      </div>
    </div>
  );
};

export default Banners;
