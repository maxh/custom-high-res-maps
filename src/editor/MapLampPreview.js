import React, { useRef } from "react";
import { StyleSheet, css } from "aphrodite";
import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

// https://www.npmjs.com/package/@react-hook/window-size
import { useWindowSize } from "@react-hook/window-size";

import { PANEL_WIDTH_PX } from "editor/Editor";

import "mapbox-geocoder.css";

import { MAPBOX_TOKEN, getMapboxStyle } from "config/mapbox.js";

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
  if (frameFinish === "natural") {
    return { backgroundImage: "url(/wood.jpg)" };
  } else {
    return { backgroundColor: "black" };
  }
};

const MapLampPreview = props => {
  const mapRef = useRef(null);
  const [windowWidth, windowHeight] = useWindowSize(
    360 /* initialWidth when there is no window */,
    720 /* initialHeight when there is no window */,
    { wait: 100 }
  );
  let height;
  if (windowWidth > 800) {
    const previewHeight = windowHeight;
    const previewWidth = windowWidth - PANEL_WIDTH_PX;
    if (previewWidth > previewHeight) {
      height = 90;
    } else {
      const ratio = previewWidth / previewHeight;
      height = 90 * ratio;
    }
  } else if (windowWidth < 800) {
    const previewHeight = windowHeight / 2;
    const previewWidth = windowWidth;
    if (previewWidth > previewHeight) {
      height = 50;
    } else {
      const ratio = previewWidth / previewHeight;
      height = 45 * ratio;
    }
  }
  const border = height * borderFraction;
  const radius = height * radiusFraction;

  const lampHeight = `${height}vh`;

  const frameDiameter = `${radius * 2 + border * 2}vh`;

  const glowBorderWidth = `${border}vh`;
  const glowBorderRadius = `${radius + border}vh`;
  const glowDiameter = `${radius * 2}vh`;

  const mapOffset = `${border - 0.5}vh`;
  const mapDiameter = `${(radius * 2 + 1) * 2}vh`;
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
          mapStyle={`mapbox://styles/${getMapboxStyle(
            props.density,
            props.theme
          )}`}
          onViewportChange={props.onViewportChange}
          attributionControl={false}
        >
          {mapRef && props.geocoderContainerRef ? (
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
    pointerEvents: "none",
    zIndex: "30"
  },
  frameBackground: {
    position: "absolute",
    pointerEvents: "none",
    clipPath: "url(#donut-path)",
    backgroundColor: "black"
  },
  frame: {
    zIndex: "20",
    position: "absolute",
    pointerEvents: "none",
    clipPath: "url(#donut-path)"
  },
  glow: {
    zIndex: "30",
    position: "absolute",
    boxShadow: "0px 0px 40px rgb(255, 255, 255, 30%)",
    pointerEvents: "none"
  },
  shadow: {
    zIndex: "30",
    position: "absolute",
    boxShadow: "0px 0px -40px rgb(0, 0, 0, 70%)",
    pointerEvents: "none"
  },
  cord: {
    position: "absolute",
    width: "1vh",
    zIndex: "0"
  },
  mapContainer: {
    zIndex: "10",
    position: "absolute",
    backgroundColor: "transparent",
    backgroundImage:
      "radial-gradient(RGB(239, 224, 223), rgb(255, 239, 205), rgb(225, 185, 141))",
    webkitTransform: "translateZ(0)",
    transform: "scale(.5,.5)",
    transformOrigin: "top left"
  }
});
