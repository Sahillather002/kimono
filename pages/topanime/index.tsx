import dynamic from "next/dynamic";

const TopAnime = dynamic(() => import("@/components/topAnime/topAnime"), {
  ssr: false,
});
const index = () => {
  return (
    <div>
      <TopAnime />
    </div>
  );
};

export default index;
