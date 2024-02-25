import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase.config";
import { signOut } from "firebase/auth";
import Styles from "./navigation.module.css";
import useWindowDimensions from "@/hooks/windowDimension";
import { useRouter } from "next/router";

const Navigation = () => {
  const { windowWidth } = useWindowDimensions();
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleDonateButton = () => {
    window.open("https://www.buymeacoffee.com/sahillather002", "_blank");
  };

  const handleSignIn = () => {
    router.push("/auth");
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  const handleMouseEnter = () => {
    setTimeout(() => {
      setIsDropdownVisible(true);
    }, 200); // Set delay here
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  return (
    <header
      className={`${Styles.navigationHeader}`}
      style={{ width: windowWidth }}
    >
      <div className={`${Styles.logo}`}>
        <a href="/">Kimono</a>
      </div>
      <nav>
        <ul className={`${Styles.linksHead}`}>
          <li className={`${Styles.links}`}>
            <a href="/home">Home</a>
          </li>
          <li className={`${Styles.links}`}>
            <a href="#">Characters</a>
          </li>
          <li className={`${Styles.links}`}>
            <a href="/topanime">Top Anime</a>
          </li>
          <li className={`${Styles.links}`}>
            <a href="/Manga">Manga</a>
          </li>
          <li className={`${Styles.links}`}>
            <a href="/waifu">Waifu</a>
          </li>
        </ul>
      </nav>
      <button className={`${Styles.navButton}`} onClick={handleDonateButton}>
        Donate
      </button>
      <div
        className={Styles.profileMenu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={
            user
              ? user.photoURL || "/animeCharacter.jpg"
              : "/animeCharacter.jpg"
          }
          alt="Profile"
          className={Styles.profilePicture}
        />
        {isDropdownVisible && (
          <ul className={Styles.dropdownContent}>
            {user ? (
              <li className={Styles.listItem} onClick={handleSignOut}>
                Sign Out
              </li>
            ) : (
              <li className={Styles.listItem} onClick={handleSignIn}>
                Sign In
              </li>
            )}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Navigation;
