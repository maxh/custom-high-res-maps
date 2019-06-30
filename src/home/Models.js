import React from "react";
import { StyleSheet, css } from "aphrodite";

import colors from "common/colors";

import manhattanWhite from "home/images/manhattan-white.jpg";
import chicagoWhite from "home/images/chicago-white.jpg";

export default function(props) {
  return (
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
          The circular map lets you select anywhere in the world to feature on
          your map lamp.
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
          The hardwood Manhattan lamp is the original map design. The lamp
          stands 24 inches tall and 10 inches wide.
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
    paddingBottom: "20px",
    width: "35%"
  },
  imageItem: {},
  image: {
    height: "800px"
  }
});
