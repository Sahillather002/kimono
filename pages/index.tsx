import dynamic from "next/dynamic";
import Loading from "@/components/loading";
import animeData from "@/hooks/animeData";
import { popularAnime } from "@/types/animeType";


const Carousel = dynamic(
  () => import('@/components/carousel/index'),
  { ssr: false }
)


export default  function Home() {

  return (
   <>
   <Carousel/>
   </>
  );
}
