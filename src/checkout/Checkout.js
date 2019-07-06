import React from "react";
import { StyleSheet, css } from "aphrodite";

import { Elements } from "react-stripe-elements";

import colors from "common/colors";

import CheckoutForm from "checkout/CheckoutForm";
import CircularMapPreview from "checkout/CircularMapPreview";

import Preview from "checkout/Preview";

import geoViewport from "@mapbox/geo-viewport";

import CartManager from "common/CartManager";

class Checkout extends React.Component {
  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const config = CartManager.getCircularConfig();
    return (
      <div className={css(styles.page)}>
        <div className={css(styles.innerPage)}>
          <div className={css(styles.header)}>
            <h1 className={css(styles.headerTitle)}>
              <a href="/" className={css(styles.headerLink)}>
                Map Lamps
              </a>
            </h1>
            <div onClick={this.goBack} className={css(styles.headerLink)}>
              ← Return to editor
            </div>
          </div>
          <div className={css(styles.lowerInnerPage)}>
            <Elements>
              <CheckoutForm />
            </Elements>
            <div className={css(styles.preview)}>
              <CircularMapPreview />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;

const styles = StyleSheet.create({
  checkout: {
    display: "flex"
  },
  preview: {
    width: "200px",
    marginLeft: "30px",
    background: "white",
    position: "sticky",
    top: "30px",
    padding: "20px",
    alignSelf: "start"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerTitle: {
    cursor: "pointer"
  },
  headerLink: {
    color: "black",
    textDecoration: "none",
    cursor: "pointer"
  },
  page: {
    padding: "20px",
    background: colors.selectedGray,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  innerPage: {
    display: "flex",
    flexDirection: "column"
  },
  lowerInnerPage: {
    display: "flex",
    flexDirection: "row"
  }
});
