import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("@/components/carousel/index"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Carousel />
    </>
  );
}
