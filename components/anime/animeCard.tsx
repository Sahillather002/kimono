import Image from "next/image";
import styles from "./animeCard.module.css";
import path from "@/utils/path";
type props = {
  image: string;
  id: string;
  title?: string;
  type?: string;
};
const animeCard = ({ image, id, title, type }: props) => {
  return (
    <div className="mt-[50px] ">
      <a href={path.anime(id)}>
        <Image
          width={220}
          height={300}
          src={image}
          alt="image"
          className={`aspect-[124/185] rounded-[4px] ${styles.cardImage}`}
        />
      </a>
    </div>
  );
};

export default animeCard;
