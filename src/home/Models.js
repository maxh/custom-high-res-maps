import React from "react";
import { StyleSheet, css } from "aphrodite";

import manhattanWhite from "home/images/white-background-manhattan.png";
import chicagoWhite from "home/images/white-background-chicago.png";

import homeStyles from "home/homeStyles";

const CIRCULAR_CHICAGO_LINK =
  "editor?bounds=-87.8124883161268,41.777974121220176,-87.49528796878933,42.01408424675092&density=medium&theme=light&frameFinish=black&cordColor=red";

export default function(props) {
  return (
    <div className={css(homeStyles.middleSection)}>
      <div className={css(styles.model)}>
        <a href={CIRCULAR_CHICAGO_LINK} className={css(styles.imageItem)}>
          <img
            src={chicagoWhite}
            className={css(styles.image)}
            alt="Chicago Circular Map Lamp against white background"
          />
        </a>
        <div className={css(styles.textItem)}>
          <h3>Latest Release</h3>
          <a href={CIRCULAR_CHICAGO_LINK}>
            <h1>Circular Map Lamp</h1>
          </a>
          <p>
            The 17-inch diameter circular map lets you select anywhere in the
            world to feature on your map lamp.
          </p>
          <a href={CIRCULAR_CHICAGO_LINK}>
            <p>$500</p>
          </a>
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
          <h3>Original Release</h3>
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column-reverse",
    "@media (min-width: 700px)": {
      flexDirection: "row",
      ":nth-child(even)": {
        flexDirection: "row-reverse",
        textAlign: "right"
      }
    }
  },
  textItem: {
    paddingLeft: "20px",
    paddingBottom: "20px",
    "@media (min-width: 800px)": {
      width: "50%"
    }
  },
  image: {
    height: "600px",
    "@media (max-width: 1000px)": {
      height: "600px"
    },
    "@media (max-width: 800px)": {
      height: "400px"
    }
  }
});
