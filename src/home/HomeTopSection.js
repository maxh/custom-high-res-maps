import React from "react";
import { StyleSheet, css } from "aphrodite";

import colors from "common/colors";

import image from "home/images/lake.jpg";

import { FaChevronDown, FaInstagram } from "react-icons/fa";

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
            <div className={css(styles.leftMenu)}>
              <a href="/" className={css(styles.a)}>
                <h1 className={[css(styles.header), css(styles.a)].join(" ")}>
                  Map Lamps
                </h1>
              </a>
            </div>
            <div className={css(styles.rightMenu)}>
              <a
                href="https://www.instagram.com/maplamps"
                className={css(styles.a)}
              >
                <FaInstagram className={css(styles.a)} />
              </a>
            </div>
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
  a: {
    color: "white",
    textDecoration: "none",
    cursor: "pointer"
  },
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
  },
  header: {
    fontSize: "24px",
    fontWeight: "normal",
    margin: 0
  }
});
