import React from "react";
import { StyleSheet, css } from "aphrodite";

import colors from "common/colors";

import homeStyles from "home/homeStyles";

import { FaMapMarkedAlt, FaPalette, FaLightbulb } from "react-icons/fa";

export default function(props) {
  return (
    <div className={css(homeStyles.middleSection)}>
      <h1 className={css(styles.h1)}>Create custom backlit maps</h1>
      <div className={css(styles.details)}>
        <div className={css(styles.detail)}>
          <FaMapMarkedAlt className={css(styles.detailIcon)} />
          <h2 className={css(styles.detailTitle)}>Any location</h2>
          <div className={css(styles.detailDescription)}>
            Our <a href="/editor">online design tool</a> makes it easy to select
            any place for your map lamp. It could be where you live now, grew
            up, or took a special trip!
          </div>
        </div>
        <div className={css(styles.detail)}>
          <FaPalette className={css(styles.detailIcon)} />
          <h2 className={css(styles.detailTitle)}>Quality finish</h2>
          <div className={css(styles.detailDescription)}>
            Frame options include baltic birch, hardwood, and smooth matte
            black. The maps are printed at high resolution in the United States.
          </div>
        </div>
        <div className={css(styles.detail)}>
          <FaLightbulb className={css(styles.detailIcon)} />
          <h2 className={css(styles.detailTitle)}>Dimmable light</h2>
          <div className={css(styles.detailDescription)}>
            Illumination comes from dimmable LEDs powered by a USB cord in a
            color of your choice. Wall adapter included.
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  h1: {
    paddingTop: "80px",
    "@media (max-width: 800px)": {
      paddingTop: "40px"
    },
    width: "100%",
    textAlign: "center"
  },
  details: {
    display: "flex",
    "@media (max-width: 800px)": {
      flexDirection: "column"
    }
  },
  detailDescription: {
    color: colors.textGray,
    fontSize: "20px"
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    flex: 1,
    "@media (max-width: 800px)": {
      alignItems: "center"
    }
  },
  detailIcon: {
    height: "40px",
    width: "40px",
    padding: "10px",
    color: "#447AB1"
  },
  featureSection: {
    width: "100%",
    padding: "50px",
    display: "flex",
    ":nth-child(events$EventEmitter)": {
      flexDirection: "row-reverse"
    }
  }
});

/*

        <div>
          The place you live, grew up, or went on a special trip. Bring that
          place home with one of our beautifully designed custom maps
        </div>
        */
