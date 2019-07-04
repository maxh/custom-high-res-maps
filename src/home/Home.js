import React from "react";
import { StyleSheet, css } from "aphrodite";

import colors from "common/colors";

import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import "mapbox-geocoder.css";

import manhattanWhite from "home/images/manhattan-white.jpg";
import chicagoWhite from "home/images/chicago-white.jpg";

import TopSection from "home/TopSection";
import ThreeFeatures from "home/ThreeFeatures";
import ImageCarousel from "home/ImageCarousel";
import Models from "home/Models";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFwbGFtcHMiLCJhIjoiY2p3NmNoYmYzMGlmcTRhcWsycXNma3NqNSJ9.RBpqn0qnposf4cWpkUsq_g";

class Home extends React.Component {
  mapRef = React.createRef();
  geocoderContainerRef = React.createRef();

  render() {
    return (
      <div>
        <TopSection />
        <div className={css(styles.middleSection)}>
          <ThreeFeatures />
          <ImageCarousel />
          <div lassName={css(styles.launch)}>
            <div ref={this.geocoderContainerRef} />
            <div style={{ visibility: "hidden", height: "1px", width: "1px" }}>
              <ReactMapGL
                mapboxApiAccessToken={MAPBOX_TOKEN}
                ref={this.mapRef}
                width="100%"
                height="100%"
              >
                {this.mapRef ? (
                  <Geocoder
                    mapRef={this.mapRef}
                    containerRef={this.geocoderContainerRef}
                    onViewportChange={this.props.onViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                  />
                ) : null}
              </ReactMapGL>
            </div>
          </div>
          <Models />
        </div>
      </div>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  launch: {
    width: "100%"
  },
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
