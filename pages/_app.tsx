import dynamic from "next/dynamic";

import "@/styles/globals.css";
import type { AppProps } from "next/app";

const Navigation = dynamic(
  () => import('@/components/navigation'),
  {ssr: false}
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navigation/>
      <Component {...pageProps} />
    </div>
  );
}
