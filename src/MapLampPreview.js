import React from "react";
import { StyleSheet, css } from "aphrodite";
import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import "./mapbox-geocoder.css";

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

class MapLampPreview extends React.Component {
  mapRef = React.createRef();

  handlePlusClick = () => {
    const { viewport } = this.state;
    this.setStateAndUpdateUrl({
      viewport: { ...viewport, zoom: viewport.zoom + 0.5 }
    });
  };

  handleMinusClick = () => {
    const { viewport } = this.state;
    this.setStateAndUpdateUrl({
      viewport: { ...viewport, zoom: viewport.zoom - 0.5 }
    });
  };

  render() {
    return (
      <div className={css(styles.lamp)}>
        <div className={css(styles.mapContainer)}>
          <ReactMapGL
            ref={this.mapRef}
            latitude={this.props.latitude}
            longitude={this.props.longitude}
            zoom={this.props.zoom}
            {...MAP_SETTINGS}
            width="100%"
            height="100%"
            mapboxApiAccessToken={MAPBOX_TOKEN}
            mapStyle="mapbox://styles/maplamps/cjwe768gw1jkc1cq92843klrh"
            onViewportChange={this.props.onViewportChange}
            attributionControl={false}
          >
            {this.mapRef ? (
              <Geocoder
                mapRef={this.mapRef}
                containerRef={this.props.geocoderContainerRef}
                onViewportChange={this.props.onViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
              />
            ) : null}
          </ReactMapGL>
        </div>
        <div className={css(styles.frame)} />
        <div className={css(styles.glow)} />
      </div>
    );
  }
}

export default MapLampPreview;

const BASE_RADIUS = 7;
const BASE_BORDER = 1.75;
const BASE_HEIGHT = (BASE_RADIUS + BASE_BORDER) * 2;
const radiusFraction = BASE_RADIUS / BASE_HEIGHT;
const borderFraction = BASE_BORDER / BASE_HEIGHT;

const height = 90;
const border = height * borderFraction;
const radius = height * radiusFraction;

const frameOuterHeight = `${height}vh`;

const frameBorderWidth = `${border}vh`;
const frameBorderRadius = `${radius + border}vh`;
const frameDiameter = `${radius * 2}vh`;

const mapOffset = `${border - 5}vh`;
const mapDiameter = `${radius * 2 + 10}vh`;
const mapBorderRadius = `${radius + border}vh`;

const styles = StyleSheet.create({
  lamp: {
    height: frameOuterHeight,
    width: frameOuterHeight,
    position: "relative",
    display: "flex",
    flexDirection: "row"
  },
  frame: {
    position: "absolute",
    height: frameDiameter,
    width: frameDiameter,
    borderColor: "rgb(15,15,15)",
    borderWidth: frameBorderWidth,
    borderStyle: "solid",
    borderRadius: frameBorderRadius,
    pointerEvents: "none"
  },
  glow: {
    position: "absolute",
    top: frameBorderWidth,
    left: frameBorderWidth,
    boxShadow: "0px 0px 40px rgb(143, 139, 138, 50%)",
    height: frameDiameter,
    width: frameDiameter,
    borderRadius: frameBorderRadius,
    pointerEvents: "none"
  },
  mapContainer: {
    left: mapOffset,
    top: mapOffset,
    position: "absolute",
    height: mapDiameter,
    width: mapDiameter,
    borderRadius: mapBorderRadius,
    backgroundColor: "transparent",
    backgroundImage:
      "radial-gradient(RGB(239, 224, 223), RGB(255, 239, 205), rgb(225, 185, 141))",
    webkitTransform: "translateZ(0)"
  }
});
