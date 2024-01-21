import dynamic from "next/dynamic";
import Loading from "@/components/loading";
import Navigation from "@/components/navigation";


const Carousel = dynamic(
  () => import('@/components/carousel/index'),
  { ssr: false }
)

export default function Home() {
  return (
   <>
   <Navigation/>
   <Carousel/>
   </>
  );
}
