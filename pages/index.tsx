import LocalHome from "@/components/home";
import { auth } from "@/firebase/firebase.config";
import { useEffect } from "react";
export default function Home() {
  return (
    <div className="backgroundBlack">
      <LocalHome />
    </div>
  );
}
