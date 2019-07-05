import React from "react";
import { StyleSheet, css } from "aphrodite";

import { Elements } from "react-stripe-elements";

import CheckoutForm from "checkout/CheckoutForm";

export default class Checkout extends React.Component {
  render() {
    return (
      <Elements>
        <CheckoutForm />
      </Elements>
    );
  }
}

const styles = StyleSheet.create({
  checkout: {
    display: "flex"
  }
});
