import React from "react";
import { StyleSheet, css } from "aphrodite";

import Button from "./Button";

import image from "./lake.jpg";

export default function(props) {
  return (
    <div>
      <div className={css(styles.topSection)}>
        <div className={css(styles.imageContainer)}>
          <img className={css(styles.image)} src={image} alt="home image" />
        </div>
        <div className={css(styles.taglineContainer)}>
          <div className={css(styles.tagline)}>Light up your place.</div>
          <button className={css(styles.callToAction)}>Browse Map Lamps</button>
        </div>
        <div className={css(styles.menuContainer)}>
          <div className={css(styles.leftMenu)}>
            <div className={css(styles.header)}>Map Lamps</div>
          </div>
        </div>
        <div className={css(styles.notch)} />
      </div>
      <div className={css(styles.middleSection)}>hello</div>
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
    paddingBottom: "30px"
  },
  menuContainer: {
    position: "absolute",
    color: "white",
    fontSize: "24px",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px"
  },
  leftMenu: {
    width: "900px"
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
  middleSection: {
    height: 1000,
    backgroundColor: "white"
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
    backgroundColor: "white"
  }
});
