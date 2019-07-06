import React from "react";
import { StyleSheet, css } from "aphrodite";

import { Elements } from "react-stripe-elements";

import colors from "common/colors";

import CheckoutForm from "checkout/CheckoutForm";

import geoViewport from "@mapbox/geo-viewport";

import CartManager from "common/CartManager";

import { MAPBOX_TOKEN, getMapboxStyle } from "config/mapbox.js";

const getPreviewUrl = config => {
  const height = 1200;
  const {
    center: [lon, lat],
    zoom
  } = geoViewport.viewport(config.bounds, [height, height], 0, 26, 512, true);
  const style = getMapboxStyle(config.density.value, config.theme.value);
  return `https://api.mapbox.com/styles/v1/${style}/static/${lon},${lat},${zoom},0/${height}x${height}?access_token=${MAPBOX_TOKEN}`;
};

class CircularMapPreview extends React.Component {
  render() {
    const config = CartManager.getCircularConfig();
    return (
      <div className={css(styles.container)}>
        <div>Your order</div>
        <h3>Circular Map Lamp</h3>
        <img className={css(styles.thumbnail)} src={getPreviewUrl(config)} />
        <table className={css(styles.configTable)}>
          <tbody>
            <ConfigItem name="Frame finish" value={config.frameFinish.label} />
            <ConfigItem name="Cord color" value={config.cordColor.label} />
          </tbody>
        </table>
        Total $500
      </div>
    );
  }
}

/*
            <ConfigItem name="Road density" value={config.density.label} />
            <ConfigItem name="Map theme" value={config.theme.label} />
            */
const ConfigItem = ({ name, value }) => {
  return (
    <tr className={css(styles.item)}>
      <td className={css(styles.itemName)}>{name}</td>
      <td>{value}</td>
    </tr>
  );
};

export default CircularMapPreview;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  thumbnail: {
    height: "200px",
    width: "200px",
    borderRadius: "100px",
    background: "rgb(255, 239, 205)"
  },
  configTable: {
    marginTop: "20px",
    marginBottom: "20px",
    width: "100%"
  },
  item: {},
  itemName: {
    color: "gray",
    textAlign: "right"
  }
});
