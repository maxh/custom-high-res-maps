import React from "react";
import { StyleSheet, css } from "aphrodite";

export default ({ name, children }) => (
  <div className={css(styles.formItem)}>
    <label className={css(styles.formLabel)}>{name}</label>
    {children}
  </div>
);

const styles = StyleSheet.create({
  formItem: {
    marginTop: "30px",
    "@media (max-width: 800px)": {
      marginLeft: "30px",
      width: "290px"
    },
    "@media (max-width: 640px)": {
      marginLeft: "0px",
      width: "100%"
    }
  },
  formLabel: {
    display: "inline-block",
    marginBottom: "5px"
  }
});
