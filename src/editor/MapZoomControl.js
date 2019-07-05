import React from "react";
import { StyleSheet, css } from "aphrodite";

import Button from "common/Button";

export default function MapZoomControl(props) {
  return (
    <div className={css(styles.container)}>
      <Button
        style={{ width: "50px", height: "50px" }}
        onClick={props.onPlusClick}
      >
        +
      </Button>
      <Button
        style={{ width: "50px", height: "50px" }}
        onClick={props.onMinusClick}
      >
        -
      </Button>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    "@media (max-width: 800px)": {
      display: "none"
    }
  }
});
