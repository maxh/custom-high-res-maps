import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
  middleSection: {
    marginTop: "90px",
    marginBottom: "90px",
    width: "1200px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "90vw",
    "@media (min-width: 1100px)": {
      width: "900px"
    }
  }
});
