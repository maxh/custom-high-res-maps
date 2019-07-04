import React from "react";
import { StyleSheet, css } from "aphrodite";

import { FaInstagram } from "react-icons/fa";

export default class Header extends React.Component {
  render() {
    return (
      <div className={css(styles.menu)}>
        <div className={css(styles.leftMenu)}>
          <a href="/" className={css(styles.text)}>
            <h1 className={css(styles.text)}>Map Lamps</h1>
          </a>
        </div>
        <div className={css(styles.rightMenu)}>
          <a
            href="https://www.instagram.com/maplamps"
            className={css(styles.text)}
          >
            <FaInstagram className={css(styles.a)} />
          </a>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    position: "relative",
    paddingTop: "30px",
    width: "80vw",
    "@media (min-width: 1100px)": {
      width: "900px"
    }
  },
  rightMenu: {
    position: "absolute",
    right: 0
  },
  leftMenu: {
    position: "absolute",
    left: 0
  },
  text: {
    color: "white",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: "24px",
    fontWeight: "normal",
    margin: 0
  }
});
