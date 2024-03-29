import Link from "next/link";
import React from "react";
import path from "@/utils/path";

type props = {
  genres: string;
};

const GenresItem = ({ genres }: props) => {
  return (
    <Link
      className="text-xs font-semibold border border-white px-2 py-1 text-center rounded-full"
      href={path.genres(genres)}
    >
      {genres}
    </Link>
  );
};

export default GenresItem;
