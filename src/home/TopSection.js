import React from "react";
import { StyleSheet, css } from "aphrodite";

import colors from "common/colors";

import image from "home/images/lake.jpg";

import { FaChevronDown } from "react-icons/fa";

import TopMenu from "home/TopMenu";

export default class HomeTopSection extends React.Component {
  handleOnClick = () => {
    window.scrollTo(0, window.innerHeight * 0.9);
  };
  render() {
    return (
      <div>
        <div className={css(styles.topSection)}>
          <div className={css(styles.imageContainer)}>
            <img
              className={css(styles.image)}
              src={image}
              alt="black chicago against lake"
            />
          </div>
          <div className={css(styles.taglineContainer)}>
            <h2 className={css(styles.tagline)}>Light up your place.</h2>
            <button
              onClick={this.handleOnClick}
              className={css(styles.callToAction)}
            >
              Browse Map Lamps
            </button>
          </div>
          <div className={css(styles.menuContainer)}>
            <TopMenu />
          </div>
          <div className={css(styles.notch)}>
            <FaChevronDown
              onClick={this.handleOnClick}
              className={css(styles.arrow)}
            />
          </div>
        </div>
      </div>
    );
  }
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
    textShadow: "0px 0px 10px rgb(225, 185, 141, .8)"
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
