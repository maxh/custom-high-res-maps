import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
  middleSection: {
    marginTop: "60px",
    marginBottom: "60px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "90vw",
    "@media (min-width: 1100px)": {
      width: "900px"
    },
    "@media (min-width: 601px)": {
      marginTop: "90px",
      marginBottom: "90px"
    }
  }
});
