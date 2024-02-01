import React, { useState, useEffect } from "react";
import styles from "./waifuMasonry.module.css";
import Button from "../commons/button/buttons";

type WaifuItem = {
  id?: number;
  image_url: string;
  rating?: "safe";
};

type Props = {
  waifuData: {
    items: WaifuItem[];
  };
};

const WaifuMasonry = ({ waifuData }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [displayedItems, setDisplayedItems] = useState<WaifuItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (waifuData?.items) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      // Filter items based on the rating
      const filteredItems = waifuData.items
        .filter(
          (item) => item.rating === "safe" || item.rating === "suggestive"
        )
        .slice(startIndex, endIndex);

      setDisplayedItems(filteredItems);
    }
  }, [waifuData, currentPage, itemsPerPage]);

  const handleOnClickImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleNavigate = (direction: "prev" | "next") => {
    if (!selectedImage || !displayedItems.length) return;

    const currentIndex = displayedItems.findIndex(
      (item) => item.image_url === selectedImage
    );

    if (direction === "prev" && currentIndex > 0) {
      setSelectedImage(displayedItems[currentIndex - 1].image_url);
    } else if (
      direction === "next" &&
      currentIndex < displayedItems.length - 1
    ) {
      setSelectedImage(displayedItems[currentIndex + 1].image_url);
    }
  };

  return (
    <div className={`${styles.gallery}`}>
      {displayedItems.map((item: WaifuItem, index: number) => (
        <img
          key={`${item.image_url}_${index}`}
          src={item.image_url}
          alt={`Waifu ${index}`}
          className={styles.image}
          onClick={() => handleOnClickImage(item.image_url)}
        />
      ))}

      {selectedImage && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={handleCloseModal}>
              &times;
            </span>
            <div className={styles.navigator}>
              <Button className={styles.button} onClick={() => handleNavigate("prev")}>Previous</Button>
              <img
                src={selectedImage}
                alt="Selected Waifu"
                className={styles.selectedImage}
              />
              <Button className={styles.button} onClick={() => handleNavigate("next")}>Next</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaifuMasonry;
