import React, { useEffect, useState } from "react";
import WaifuMasonry from "@/components/waifuMasonry/index";
import fetchWaifu from "../api/getWaifu";
import Loading from '@/components/loading'
import { waifuDemoData } from "@/components/waifuMasonry/waifuDemoData";

const Index = () => {
  const [waifuData, setWaifuData] = useState<null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = waifuDemoData;
        setWaifuData(data);
      } catch (error) {
        console.error('Error fetching waifu data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  
console.log(waifuData)
  return (
    <div>
      {loading && <Loading/>}
      {waifuData && !loading && <WaifuMasonry waifuData={waifuData} />}
    </div>
  );
};

export default Index;
