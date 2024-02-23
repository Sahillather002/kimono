import React from "react";
import { BsFillCalendarDateFill, BsFillPlayCircleFill } from "react-icons/bs";
import path from "../../utils/path";
import { AiFillClockCircle } from "react-icons/ai";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { getAnimeTitle } from "@/utils/helpers";
import { Title } from "@/types/animeType";

type Props = {
  id: string;
  image: string;
  title: Title;
  type?: string;
  duration?: number;
  releaseDate?: number;
  border?: boolean;
  color?: string | null | undefined;
};

const ShowCaseItem = ({
  duration,
  id,
  image,
  releaseDate,
  title,
  type,
  border = true,
  color,
}: Props) => {
  const titleStyle = color ? { color: color } : {}; // Conditionally apply color style
  return (
    <Link
      href={path.anime(id)}
      className={`${border && "p-3"} flex space-x-4`}
      key={id}
    >
      <LazyLoadImage
        className="rounded-[4px] w-[50px] aspect-[124/185]"
        src={image}
      />
      <div className="text-sm flex-1">
        <h5 style={titleStyle} className="text-sm font-semibold line-clamp-1">
          {getAnimeTitle(title)}
        </h5>
        <div className="flex items-center space-x-3 mt-2">
          {type && (
            <p className="flex items-center space-x-2 text-sm">
              <BsFillPlayCircleFill />
              <span className="text-xs">{type}</span>
            </p>
          )}
          {duration && (
            <p className="flex items-center space-x-2 text-sm">
              <AiFillClockCircle />
              <span className="text-xs">{duration}m</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ShowCaseItem;
