import React from "react";
import { StyleSheet, css } from "aphrodite";
import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import "mapbox-geocoder.css";

// TODO: Use transparency instead of colors so gradient shows through.
// Maybe with somekind of manual per-pixel transformation in the
// Mapbox WebGL layer, after Mapbox renders but before frame is shown?
const DARK_STYLES = {
  none: "mapbox://styles/maplamps/cjxpiw8rv1efk1cp6nkd9ur8e",
  low: "mapbox://styles/maplamps/cjxpiw5av1nb51clghg7kp1c2",
  medium: "mapbox://styles/maplamps/cjxpiw2aj4ne31cnrgq6y5ujt",
  high: "mapbox://styles/maplamps/cjxpflw074kec1cmb8q35ab9z"
};

const LIGHT_STYLES = {
  none: "mapbox://styles/maplamps/cjxpcn17t4hol1cnuq3dqfaak",
  low: "mapbox://styles/maplamps/cjxpckpdf3p4y1cmkn8ku44wk",
  medium: "mapbox://styles/maplamps/cjxpckkau4hxf1cp6k3ld2w5v",
  high: "mapbox://styles/maplamps/cjwe768gw1jkc1cq92843klrh"
};

const MAP_STYLES = {
  light: LIGHT_STYLES,
  dark: DARK_STYLES
};

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

  getCordColorStyle = () => {
    return { backgroundColor: this.props.cordColor.value };
  };

  getFrameFinishStyle = () => {
    if (this.props.frameFinish.value == "natural") {
      return { backgroundImage: "url(/wood.jpg)" };
    } else {
      return { backgroundColor: "black" };
    }
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
            mapStyle={MAP_STYLES[this.props.theme][this.props.density]}
            onViewportChange={this.props.onViewportChange}
            attributionControl={false}
          >
            {this.mapRef ? (
              <Geocoder
                enableEventLogging={false}
                mapRef={this.mapRef}
                inputValue={this.props.placeName}
                containerRef={this.props.geocoderContainerRef}
                onViewportChange={this.props.onViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onResult={this.props.onSearchResult}
              />
            ) : null}
          </ReactMapGL>
        </div>
        <div className={css(styles.cord)} style={this.getCordColorStyle()} />
        <div className={css(styles.frameBackground)} />
        <div className={css(styles.frame)} style={this.getFrameFinishStyle()} />
        <div className={css(styles.frameShadow)} />
        <div className={css(styles.glow)} />
        <div className={css(styles.shadow)} />
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

const lampHeight = `${height}vh`;

const frameDiameter = `${radius * 2 + border * 2}vh`;

const glowBorderWidth = `${border}vh`;
const glowBorderRadius = `${radius + border}vh`;
const glowDiameter = `${radius * 2}vh`;

const mapOffset = `${border - 5}vh`;
const mapDiameter = `${(radius * 2 + 10) * 2}vh`;
const mapBorderRadius = `${(radius + border) * 2}vh`;

const CORD_OFFSET = 3;
const cordTop = `${height - CORD_OFFSET}vh`;
const cordLeft = `${height / 2}vh`;
const cordHeight = `${(100 - height) / 2 + CORD_OFFSET}vh`;

const styles = StyleSheet.create({
  lamp: {
    height: lampHeight,
    width: lampHeight,
    position: "relative",
    display: "flex",
    flexDirection: "row"
  },
  frameShadow: {
    position: "absolute",
    height: frameDiameter,
    width: frameDiameter,
    borderRadius: glowBorderRadius,
    boxShadow: "0px 0px 40px rgb(0, 0, 0, 5 0%)",
    pointerEvents: "none"
  },
  frameBackground: {
    position: "absolute",
    height: frameDiameter,
    width: frameDiameter,
    pointerEvents: "none",
    clipPath: "url(#donut-path)",
    backgroundColor: "black"
  },
  frame: {
    position: "absolute",
    height: frameDiameter,
    width: frameDiameter,
    pointerEvents: "none",
    clipPath: "url(#donut-path)"
  },
  glow: {
    position: "absolute",
    top: glowBorderWidth,
    left: glowBorderWidth,
    boxShadow: "0px 0px 40px rgb(255, 255, 255, 30%)",
    height: glowDiameter,
    width: glowDiameter,
    borderRadius: glowBorderRadius,
    pointerEvents: "none"
  },
  shadow: {
    position: "absolute",
    top: glowBorderWidth,
    left: glowBorderWidth,
    boxShadow: "0px 0px -40px rgb(0, 0, 0, 70%)",
    height: glowDiameter,
    width: glowDiameter,
    borderRadius: glowBorderRadius,
    pointerEvents: "none"
  },
  cord: {
    left: cordLeft,
    top: cordTop,
    position: "absolute",
    height: cordHeight,
    width: "1vh"
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
    webkitTransform: "translateZ(0)",
    transform: "scale(.5,.5)",
    transformOrigin: "top left"
  }
});
