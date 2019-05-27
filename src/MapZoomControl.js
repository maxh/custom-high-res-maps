import React from "react";
import { StyleSheet, css } from "aphrodite";

import Button from "./Button";

export default function MapZoomControl(props) {
  return (
    <div className={css(styles.container)}>
      <Button onClick={props.onPlusClick}>+</Button>
      <Button onClick={props.onMinusClick}>-</Button>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "20px",
    right: "20px"
  },
  button: {
    borderColor: "rgb(15,15,15)",
    borderWidth: "2px",
    borderStyle: "solid",
    height: "50px",
    width: "50px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    margin: "5px",
    userSelect: "none",
    backgroundColor: "white",
    ":hover": {
      backgroundColor: "rgb(230,230,230)",
      cursor: "pointer"
    },
    ":active": {
      backgroundColor: "rgb(190,190,190)",
      cursor: "pointer"
    }
  }
});
