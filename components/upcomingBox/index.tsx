import React, { useState } from "react";
import ShowCaseItem from "./showCaseItem";
import { Anime } from "@/types/animeType";
import "./upcomingBox.module.css";

type Props = {
  title: string;
  anime: Anime[];
};

const BoxShowCase: React.FC<Props> = ({ title, anime }: Props) => {
  const [hoveredItem, setHoveredItem] = useState<Anime | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (item: Anime) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div className="rounded-md overflow-hidden" onMouseMove={handleMouseMove}>
      <h3 className="font-semibold text-[16px] text-primary bg-[#222] p-3">
        {title}
      </h3>
      <div className="bg-[#222]">
        {anime.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
          >
            <ShowCaseItem
              color={item.color}
              duration={item?.duration}
              id={item.id}
              image={item.image}
              releaseDate={item.releaseDate}
              title={item.title}
              type={item.type}
            />
          </div>
        ))}
      </div>
      {hoveredItem && (
        <div
          className="tooltip"
          style={{
            position: "absolute",
            top: tooltipPosition.y,
            left: tooltipPosition.x,
          }}
        >
          <img src={hoveredItem.image} alt={hoveredItem.title.english} />
        </div>
      )}
    </div>
  );
};

export default BoxShowCase;
