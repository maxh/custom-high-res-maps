import React from "react";
import { StyleSheet, css } from "aphrodite";

import { Elements } from "react-stripe-elements";

import colors from "common/colors";

import CheckoutForm from "checkout/CheckoutForm";

import MapLampPreview from "editor/MapLampPreview";

import geoViewport from "@mapbox/geo-viewport";

class Preview extends React.Component {
  state = {
    viewport: {}
  };

  goBack = () => {
    this.props.history.goBack();
  };

  handleMapResize = (height, width) => {
    const {
      center: [longitude, latitude],
      zoom
    } = geoViewport.viewport(
      this.state.bounds,
      [height, width],
      0,
      26,
      512,
      true
    );
    const viewport = { height, width, longitude, latitude, zoom };
    this.updateViewportAndBounds(viewport);
  };

  handleViewportChange = viewport => {
    const { height, width } = viewport;
    const oldHeight = this.state.viewport.height;
    const isFirstTimeLoad = height && !oldHeight;
    if (isFirstTimeLoad) {
      this.handleMapResize(height, width);
      return;
    }
  };

  render() {
    const stored = this.readLocalStorage();
    return (
      <MapLampPreview
        frameFinish={stored.selectedFrameFinish.value}
        cordColor={stored.selectedCordColor.value}
        latitude={stored.viewport.latitude}
        longitude={stored.viewport.longitude}
        zoom={stored.viewport.zoom}
        density={stored.selectedDensity.value}
        theme={stored.selectedTheme.value}
      />
    );
  }
}

export default Preview;

const styles = StyleSheet.create({});
