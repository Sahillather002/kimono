import React, { useState, useEffect } from "react";
import styles from "./waifuMasonry.module.css";
import Button from "../commons/button/buttons";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type WaifuItem = {
  id?: number;
  image_url: string;
  rating?: "safe";
  is_screenshot?: boolean;
  image_height?: number;
};

type Props = {
  waifuData: {
    items: WaifuItem[];
  };
};

const WaifuMasonry = ({ waifuData }: Props) => {
  const [displayedItems, setDisplayedItems] = useState<WaifuItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [numItemsToShow, setNumItemsToShow] = useState<number>(250);
  const [imageRowEnd, setImageRowEnd] = useState<number>(0);

  useEffect(() => {
    if (waifuData?.items) {
      // Filter items based on the rating
      const filteredItems = waifuData.items.filter((item) => {
        return item.rating === "safe";
      });
      setDisplayedItems(filteredItems.slice(0, numItemsToShow));
    }
  }, [waifuData]);

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

  const handleRowEnd = (image_height: number) => {
    if (image_height < 200) return 20;
    return 33;
  };

  return (
    <div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
        <Masonry gutter="10px">
          {displayedItems?.map((item: WaifuItem, index: number) => {
            return (
              <span key={`${item.image_url}_${index}`}>
                <img
                  src={item.image_url}
                  alt={`Waifu ${index}`}
                  className={styles.image}
                  onClick={() => handleOnClickImage(item.image_url)}
                />
              </span>
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
      <div className={`${styles.gallery}`}>
        {selectedImage && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <span className={styles.close} onClick={handleCloseModal}>
                &times;
              </span>
              <div className={styles.navigator}>
                <Button
                  className={styles.button}
                  onClick={() => handleNavigate("prev")}
                >
                  Previous
                </Button>
                <img
                  src={selectedImage}
                  alt="Selected Waifu"
                  className={styles.selectedImage}
                />
                <Button
                  className={styles.button}
                  onClick={() => handleNavigate("next")}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaifuMasonry;
