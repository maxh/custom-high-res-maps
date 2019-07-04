import React from "react";
import { StyleSheet, css } from "aphrodite";

import TopSection from "home/TopSection";
import ThreeFeatures from "home/ThreeFeatures";
import ImageCarousel from "home/ImageCarousel";
import Models from "home/Models";
import Search from "home/Search";
import Footer from "home/Footer";

class Home extends React.Component {
  mapRef = React.createRef();
  geocoderContainerRef = React.createRef();

  render() {
    return (
      <div>
        <TopSection />
        <div className={css(styles.middleSection)}>
          <ThreeFeatures />
          <Search />
          <ImageCarousel />
          <Models />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  middleSection: {
    paddingTop: "90px",
    paddingBottom: "90px",
    width: "1200px",
    margin: "auto",
    width: "90vw",
    "@media (min-width: 1100px)": {
      width: "900px"
    }
  }
});
