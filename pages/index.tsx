import dynamic from "next/dynamic";
import Loading from "@/components/loading";
import { GET } from "./api/trending/trending";
import { popularAnime } from "@/types/animeType";
import { BASE_URL } from "@/utils/constants";
import animeData from "@/hooks/animeData";

const Carousel = dynamic(
  () => import('@/components/carousel/index'),
  { ssr: false }
);

export default function Home() {
  const {getPopular} = animeData();
  const fetchData = async () => {
    try {
      // Assuming GET function needs some parameters
      const result = await getPopular()
      console.log(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  // Call the fetchData function to trigger data fetching
  fetchData();

  return (
    <>
      <Carousel />
    </>
  );
}
