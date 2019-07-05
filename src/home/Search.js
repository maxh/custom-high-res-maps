import React from "react";
import { StyleSheet, css } from "aphrodite";

import { Redirect } from "react-router";

import colors from "common/colors";

import Footer from "home/Footer";

import homeStyles from "home/homeStyles";

import fullBleedImage from "home/images/sf-clipped.png";

import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "mapbox-geocoder.css";
import "./geocoder-overrides.css";

import geoViewport from "@mapbox/geo-viewport";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFwbGFtcHMiLCJhIjoiY2p3NmNoYmYzMGlmcTRhcWsycXNma3NqNSJ9.RBpqn0qnposf4cWpkUsq_g";

const MAP_SETTINGS = {
  dragPan: true,
  dragRotate: false,
  scrollZoom: true,
  touchZoom: true,
  touchRotate: false,
  keyboard: false,
  doubleClickZoom: true,
  pitchWithRotate: false
};

class Search extends React.Component {
  mapRef = React.createRef();
  geocoderContainerRef = React.createRef();
  state = { lon: 0, lat: 0, zoom: 0, placeName: "", launch: false };

  handleClick = () => {
    this.setState({ launch: true });
  };

  handleResult = ({ result }) => {
    console.log(result);
    const { bbox, place_name } = result;
    const {
      center: [lon, lat],
      zoom
    } = geoViewport.viewport(bbox, [800, 800], 0, 26, 512);
    this.setState({ lon, lat, zoom, placeName: place_name, launch: true });
  };

  render() {
    if (this.state.launch) {
      const { lat, lon, zoom, placeName } = this.state;
      return (
        <Redirect
          push
          to={`/editor?lat=${lat}&lon=${lon}&zoom=${zoom}&placeName=${placeName}`}
        />
      );
    }
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.imageContainer)}>
          <img className={css(styles.image)} src={fullBleedImage} />
        </div>
        <div className={css(styles.search)}>
          <h1 className={css(styles.ready)}>Ready to create your map lamp?</h1>
          <div
            className={[css(styles.launch), "home-search-section"].join(" ")}
          >
            <div ref={this.geocoderContainerRef} />
            <button className={css(styles.button)} onClick={this.handleClick}>
              Get started
            </button>
            <div style={{ visibility: "hidden", height: "1px", width: "1px" }}>
              <ReactMapGL
                mapboxApiAccessToken={MAPBOX_TOKEN}
                ref={this.mapRef}
                {...MAP_SETTINGS}
                onViewportChange={this.handleViewportChange}
                width="100%"
                height="100%"
              >
                {this.mapRef ? (
                  <Geocoder
                    mapRef={this.mapRef}
                    containerRef={this.geocoderContainerRef}
                    placeholder={`Type any location...`}
                    inputValue={this.state.place}
                    onResult={this.handleResult}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    enableEventLogging={false}
                  />
                ) : null}
              </ReactMapGL>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Search;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden"
  },
  imageContainer: {
    position: "absolute"
  },
  image: {
    "@media (max-width: 600px)": {
      height: "600px"
    },
    "@media (min-width: 601px)": {
      width: "100vw"
    },
    objectPosition: "center top",
    objectFit: "cover",
    zIndex: 0,
    opacity: ".2"
  },
  search: {
    flexDirection: "column",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  launch: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 600px)": {
      flexDirection: "column"
    }
  },
  ready: {
    textAlign: "center",
    padding: "1em",
    paddingTop: "200px",
    "@media (max-width: 600px)": {
      paddingTop: "100px"
    }
  },
  button: {
    backgroundColor: "#447AB1",
    color: "white",
    fontWeight: "bold",
    height: "50px",
    borderColor: "#000",
    borderStyle: "solid",
    borderLeft: "none",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "6px 20px",
    borderTopRightRadius: "4px",
    borderBottomRightRadius: "4px",
    userSelect: "none",
    textTransform: "uppercase",
    fontSize: "15px",
    letterSpacing: "1.4px",
    ":hover": {
      cursor: "pointer"
    },
    ":active": {
      cursor: "pointer"
    },
    ":focus": { outline: 0 },
    "@media (max-width: 600px)": {
      borderRadius: "4px",
      width: "280px"
    }
  }
});
