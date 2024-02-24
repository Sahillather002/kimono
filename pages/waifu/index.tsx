import React, { useState, useEffect } from "react";

import styles from "./waifu.module.css";
import WaifuMasonry from "@/components/waifuMasonry";
import Loading from "@/components/loading";
import fetchWaifu from "../api/getWaifu";
import Button from "@/components/commons/button/buttons";
import { waifuDemoData } from "@/components/waifuMasonry/waifuDemoData";

const Index = () => {
  const [waifuData, setWaifuData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWaifu();
        setWaifuData(data);
      } catch (error) {
        console.error("Error fetching waifu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLoadMoreImages = async () => {
    try {
      const additionalData = await fetchWaifu();
      console.log("Additional Data:", additionalData); // Check the structure and content of additionalData
      setWaifuData((prevData: any) => {
        console.log("Previous Data:", prevData); // Check the structure and content of prevData
        return {
          items: [...(prevData?.items || []), ...additionalData.items],
        };
      });
    } catch (error) {
      console.error("Error fetching additional waifu data:", error);
    }
  };

  return (
    <div className="backgroundBlack m-2">
      {loading && <Loading />}
      {waifuData && !loading && <WaifuMasonry waifuData={waifuData} />}
      <div className={`${styles.loadImageButton}`}>
        <Button onClick={handleLoadMoreImages}>Load More Images</Button>
      </div>
    </div>
  );
};

export default Index;
