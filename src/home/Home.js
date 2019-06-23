import React from "react";
import { StyleSheet, css } from "aphrodite";

import colors from "common/colors";

import manhattanWhite from "home/images/manhattan-white.jpg";
import chicagoWhite from "home/images/chicago-white.jpg";

import HomeTopSection from "home/HomeTopSection";
import ThreeFeatures from "home/ThreeFeatures";
import ImageCarousel from "home/ImageCarousel";

export default function(props) {
  return (
    <div>
      <HomeTopSection />
      <div className={css(styles.middleSection)}>
        <ThreeFeatures />
        <ImageCarousel />
        <div className={css(styles.models)}>
          <div className={css(styles.model)}>
            <div className={css(styles.imageItem)}>
              <img
                src={chicagoWhite}
                className={css(styles.image)}
                alt="Chicago Circular Map Lamp against white background"
              />
            </div>
            <div className={css(styles.textItem)}>
              <h2>Latest Release</h2>
              <h1>Circular Map Lamp</h1>
              The special release Manhattan lamp is the original map design. Cut
              from hardwood of your choice, the lamp stands 24 inches tall and
              10 inches wide.
            </div>
          </div>
          <div className={css(styles.model)}>
            <div className={css(styles.imageItem)}>
              <img
                src={manhattanWhite}
                className={css(styles.image)}
                alt="Manhattan Map Lamp against white background"
              />
            </div>
            <div className={css(styles.textItem)}>
              <h2>Original Release</h2>
              <h1>Manhattan Map Lamp</h1>
              The special release Manhattan lamp is the original map design. Cut
              from hardwood of your choice, the lamp stands 24 inches tall and
              10 inches wide.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  models: {
    marginTop: "80px"
  },
  model: {
    display: "flex",
    alignItems: "center",
    ":nth-child(even)": {
      flexDirection: "row-reverse"
    }
  },
  textItem: {
    flex: 1,
    paddingBottom: "20px"
  },
  imageItem: {
    flex: 1
  },
  image: {
    height: "800px"
  },
  middleSection: {
    paddingTop: "90px",
    paddingBottom: "90px",
    width: "1200px",
    margin: "auto"
  }
});
