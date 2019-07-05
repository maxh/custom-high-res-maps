import React from "react";
import { StyleSheet, css } from "aphrodite";

import manhattanWhite from "home/images/manhattan-white.jpg";
import chicagoWhite from "home/images/chicago-white.jpg";

import homeStyles from "home/homeStyles";

export default function(props) {
  return (
    <div className={css(homeStyles.middleSection)}>
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
          <p>
            The circular map lets you select anywhere in the world to feature on
            your map lamp.
          </p>
          <div>$500</div>
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
          <p>
            The hardwood Manhattan lamp is the original map design. The lamp
            stands 24 inches tall and 10 inches wide.
          </p>
          <div>$400</div>
        </div>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: "80px"
  },
  model: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column-reverse",
    "@media (min-width: 700px)": {
      flexDirection: "row",
      ":nth-child(even)": {
        flexDirection: "row-reverse"
      }
    }
  },
  textItem: {
    paddingBottom: "20px",
    "@media (min-width: 800px)": {
      width: "35%"
    }
  },
  image: {
    height: "700px",
    "@media (max-width: 1000px)": {
      height: "600px"
    },
    "@media (max-width: 800px)": {
      height: "400px"
    }
  }
});
