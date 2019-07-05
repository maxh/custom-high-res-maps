import React from "react";
import { StyleSheet, css } from "aphrodite";

export default class Footer extends React.Component {
  render() {
    return (
      <div className={css(styles.menu)}>
        <div className={css(styles.leftMenu)} />
        <div className={css(styles.rightMenu)}>Reach us at hi@maplamps.com</div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    position: "relative",
    margin: "auto",
    paddingTop: "60px",
    width: "80vw",
    height: "100px",
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
    color: "black",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: "24px",
    fontWeight: "normal",
    margin: 0
  }
});
