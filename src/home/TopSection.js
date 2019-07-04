import React from "react";
import { StyleSheet, css } from "aphrodite";

import { useWindowWidth } from "@react-hook/window-size";

import colors from "common/colors";

import lakeImage from "home/images/lake.jpg";
import whiteImage from "home/images/white.jpg";

import { FaChevronDown } from "react-icons/fa";

import Header from "home/Header";

const handleClickRed = () => {
  const imageCarousel = document.querySelector(".BrainhubCarousel");
  const justAboveCarousel = imageCarousel.offsetTop - 50;
  const fallback = window.innerHeight * 1.7;
  window.scrollTo(0, imageCarousel.offsetTop ? justAboveCarousel : fallback);
};

const handleClickArrow = () => {
  window.scrollTo(0, window.innerHeight * 0.9);
};
export default function() {
  const windowWidth = useWindowWidth(
    360 /* initialWidth when there is no window */,
    { wait: 100 }
  );
  return (
    <div>
      <div className={css(styles.topSection)}>
        <div className={css(styles.imageContainer)}>
          <img
            className={css(styles.image)}
            src={windowWidth < 768 ? whiteImage : lakeImage}
            alt="main map lamp background"
          />
        </div>
        <div className={css(styles.taglineContainer)}>
          <h2 className={css(styles.tagline)}>
            Light up
            <br /> your place.
          </h2>
          <button onClick={handleClickRed} className={css(styles.callToAction)}>
            Browse Map Lamps
          </button>
        </div>
        <div className={css(styles.menuContainer)}>
          <Header />
        </div>
        <div className={css(styles.notch)}>
          <FaChevronDown
            onClick={handleClickArrow}
            className={css(styles.arrow)}
          />
        </div>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: "absolute",
    width: "100vw",
    height: "95vh",
    backgroundColor: "black"
  },
  topSection: {
    position: "relative",
    width: "100vw",
    height: "95vh"
  },
  tagline: {
    textAlign: "center",
    color: "white",
    fontSize: "48px",
    paddingBottom: "30px",
    fontWeight: "normal",
    textShadow: "0px 0px 10px rgb(225, 185, 141, .8)",
    "@media (max-width: 767px)": {
      fontSize: "36px",
      paddingTop: "90px",
      paddingBottom: "160px"
    },
    "@media (max-width: 420px)": {
      fontSize: "28px",
      paddingTop: "110px",
      paddingBottom: "120px"
    }
  },
  menuContainer: {
    position: "absolute",
    width: "100vw",
    display: "flex",
    justifyContent: "center"
  },
  taglineContainer: {
    width: "100vw",
    height: "95vh",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
    opacity: 0.6
  },
  callToAction: {
    textTransform: "uppercase",
    fontSize: "15px",
    letterSpacing: "1.4px",
    padding: "20px",
    backgroundColor: "#eb4f47",
    borderWidth: 0,
    borderRadius: 0,
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#eb4f47",
      cursor: "pointer"
    },
    ":active": {
      backgroundColor: "#eb4f47",
      cursor: "pointer"
    }
  },
  notch: {
    position: "absolute",
    bottom: "-55px",
    width: "80px",
    height: "80px",
    left: "50%",
    marginLeft: "-40px",
    borderRadius: "40px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  arrow: {
    height: "20px",
    width: "20px",
    padding: "20px",
    borderRadius: "30px",
    ":hover": {
      cursor: "pointer",
      backgroundColor: colors.defaultGray
    },
    ":active": {
      backgroundColor: colors.defaultGray,
      cursor: "pointer"
    },
    userSelect: "none",
    color: colors.textGray,
    backgroundColor: colors.selectedGray
  }
});
