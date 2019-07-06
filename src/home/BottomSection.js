import React from "react";
import { StyleSheet, css } from "aphrodite";

import Footer from "home/Footer";
import Search from "home/Search";

import fullBleedImage from "home/images/sf-clipped.png";

class BottomSection extends React.Component {
  render() {
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.imageContainer)}>
          <img
            className={css(styles.image)}
            src={fullBleedImage}
            alt="light background map of sf"
          />
        </div>
        <div className={css(styles.search)}>
          <h1 className={css(styles.ready)}>Ready to create your map lamp?</h1>
          <Search />
          <Footer />
        </div>
      </div>
    );
  }
}

export default BottomSection;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden"
  },
  imageContainer: {
    position: "absolute"
  },
  image: {
    "@media (max-width: 600px)": {
      height: "600px"
    },
    "@media (min-width: 601px)": {
      width: "100vw"
    },
    objectPosition: "center top",
    objectFit: "cover",
    zIndex: 0,
    opacity: ".2"
  },
  search: {
    paddingTop: "160px",
    flexDirection: "column",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  ready: { textAlign: "center" }
});
