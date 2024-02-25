import dynamic from "next/dynamic";

const Login = dynamic(() => import("@/components/login/index"), {
  ssr: false,
});
const index = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default index;
