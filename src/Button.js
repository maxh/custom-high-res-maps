import React from "react";
import { StyleSheet, css } from "aphrodite";

import colors from "./colors";

export default function(props) {
  return (
    <button className={css(styles.button)} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: "10px 20px",
    minWidth: "60px",
    minHeight: "60px",
    borderColor: colors.defaultGray,
    borderWidth: "2px",
    borderStyle: "solid",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    margin: "5px",
    userSelect: "none",
    fontSize: "medium",
    backgroundColor: "white",
    ":hover": {
      backgroundColor: colors.hoveredGray,
      cursor: "pointer"
    },
    ":active": {
      backgroundColor: colors.selectedGray,
      cursor: "pointer"
    },
    ":focus": { outline: 0 }
  }
});
