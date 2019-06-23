import React from "react";
import { StyleSheet, css } from "aphrodite";

import colors from "./colors";

export default function(props) {
  return (
    <button
      className={[css(styles.button), props.className].join("  ")}
      onClick={props.onClick}
      style={props.style}
    >
      {props.children}
    </button>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: "10px 20px",
    borderColor: colors.defaultGray,
    borderStyle: "solid",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    margin: "5px",
    userSelect: "none",
    fontSize: "medium",
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
