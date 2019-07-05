import React, { useRef } from "react";
import { StyleSheet, css } from "aphrodite";
import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

// https://www.npmjs.com/package/@react-hook/window-size
import { useWindowSize } from "@react-hook/window-size";

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

const getFrameFinishStyle = frameFinish => {
  if (frameFinish == "natural") {
    return { backgroundImage: "url(/wood.jpg)" };
  } else {
    return { backgroundColor: "black" };
  }
};

const PANEL_WIDTH_PX = 400;

const MapLampPreview = props => {
  const mapRef = useRef(null);
  const [windowWidth, windowHeight] = useWindowSize(
    360 /* initialWidth when there is no window */,
    720 /* initialHeight when there is no window */,
    { wait: 100 }
  );
  const previewHeight = windowHeight;
  const previewWidth = windowWidth - PANEL_WIDTH_PX;
  let height;
  if (previewWidth > previewHeight) {
    height = 90;
  } else {
    const ratio = previewWidth / previewHeight;
    height = 95 * ratio;
  }
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

  const cordTop = `${height - CORD_OFFSET}vh`;
  const cordLeft = `${height / 2}vh`;
  const cordHeight = `${(100 - height) / 2 + CORD_OFFSET}vh`;

  const glowStyles = {
    top: glowBorderWidth,
    left: glowBorderWidth,
    height: glowDiameter,
    width: glowDiameter,
    borderRadius: glowBorderRadius
  };

  return (
    <div
      className={css(styles.lamp)}
      style={{ height: lampHeight, width: lampHeight }}
    >
      <div
        className={css(styles.mapContainer)}
        style={{
          left: mapOffset,
          top: mapOffset,
          height: mapDiameter,
          width: mapDiameter,
          borderRadius: mapBorderRadius
        }}
      >
        <ReactMapGL
          ref={mapRef}
          latitude={props.latitude}
          longitude={props.longitude}
          zoom={props.zoom}
          {...MAP_SETTINGS}
          width="100%"
          height="100%"
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle={MAP_STYLES[props.theme][props.density]}
          onViewportChange={props.onViewportChange}
          attributionControl={false}
        >
          {mapRef ? (
            <Geocoder
              enableEventLogging={false}
              mapRef={mapRef}
              inputValue={props.placeName}
              containerRef={props.geocoderContainerRef}
              onViewportChange={props.onViewportChange}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              onResult={props.onSearchResult}
            />
          ) : null}
        </ReactMapGL>
      </div>
      <div
        className={css(styles.cord)}
        style={{
          backgroundColor: props.cordColor,
          left: cordLeft,
          top: cordTop,
          height: cordHeight
        }}
      />
      <div
        className={css(styles.frameBackground)}
        style={{ height: frameDiameter, width: frameDiameter }}
      />
      <div
        className={css(styles.frame)}
        style={{
          ...getFrameFinishStyle(props.frameFinish),
          height: frameDiameter,
          width: frameDiameter
        }}
      />
      <div
        className={css(styles.frameShadow)}
        style={{
          height: frameDiameter,
          width: frameDiameter,
          borderRadius: glowBorderRadius
        }}
      />
      <div className={css(styles.glow)} style={glowStyles} />
      <div className={css(styles.shadow)} style={glowStyles} />
    </div>
  );
};

export default MapLampPreview;

const BASE_RADIUS = 7;
const BASE_BORDER = 1.75;
const BASE_HEIGHT = (BASE_RADIUS + BASE_BORDER) * 2;
const radiusFraction = BASE_RADIUS / BASE_HEIGHT;
const borderFraction = BASE_BORDER / BASE_HEIGHT;

const CORD_OFFSET = 3;

const styles = StyleSheet.create({
  lamp: {
    position: "relative",
    display: "flex",
    flexDirection: "row"
  },
  frameShadow: {
    position: "absolute",
    boxShadow: "0px 0px 40px rgb(0, 0, 0, 5 0%)",
    pointerEvents: "none"
  },
  frameBackground: {
    position: "absolute",
    pointerEvents: "none",
    clipPath: "url(#donut-path)",
    backgroundColor: "black"
  },
  frame: {
    position: "absolute",
    pointerEvents: "none",
    clipPath: "url(#donut-path)"
  },
  glow: {
    position: "absolute",
    boxShadow: "0px 0px 40px rgb(255, 255, 255, 30%)",
    pointerEvents: "none"
  },
  shadow: {
    position: "absolute",
    boxShadow: "0px 0px -40px rgb(0, 0, 0, 70%)",
    pointerEvents: "none"
  },
  cord: {
    position: "absolute",
    width: "1vh"
  },
  mapContainer: {
    position: "absolute",
    backgroundColor: "transparent",
    backgroundImage:
      "radial-gradient(RGB(239, 224, 223), RGB(255, 239, 205), rgb(225, 185, 141))",
    webkitTransform: "translateZ(0)",
    transform: "scale(.5,.5)",
    transformOrigin: "top left"
  }
});
