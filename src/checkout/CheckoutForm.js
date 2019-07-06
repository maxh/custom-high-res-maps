import React from "react";
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from "react-stripe-elements";
import { StyleSheet, css } from "aphrodite";

import colors from "common/colors";

const ccStyle = {
  base: {
    fontSize: "medium",
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue"`
  }
};

class CheckoutForm extends React.Component {
  state = { isBillingAddressSame: true };

  handleSubmit = ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createPaymentMethod knows from which Element to
    // create the PaymentMethod, since there's only one in this group.
    // See our createPaymentMethod documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method
    this.props.stripe
      .createPaymentMethod("card", { billing_details: { name: "Jenny Rosen" } })
      .then(({ paymentMethod }) => {
        console.log("Received Stripe PaymentMethod:", paymentMethod);
      });

    // You can also use handleCardPayment with the Payment Intents API automatic confirmation flow.
    // See our handleCardPayment documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-handle-card-payment
    const data = {};
    this.props.stripe.handleCardPayment("{PAYMENT_INTENT_CLIENT_SECRET}", data);

    // You can also use createToken to create tokens.
    // See our tokens documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-token
    this.props.stripe.createToken({ type: "card", name: "Jenny Rosen" });
    // token type can optionally be inferred if there is only one Element
    // with which to create tokens
    // this.props.stripe.createToken({name: 'Jenny Rosen'});

    // You can also use createSource to create Sources.
    // See our Sources documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-source
    this.props.stripe.createSource({
      type: "card",
      owner: {
        name: "John Doe"
      }
    });
  };

  handleCheckboxChange = event => {
    this.setState({ isBillingAddressSame: event.target.checked });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css(styles.form)}>
        <h1>Billing information</h1>
        <div>
          <FormItem name="Cardholder name">
            <input className={css(styles.formInput)} />
          </FormItem>
          <FormItem name="Card number">
            <CardNumberElement
              style={ccStyle}
              className={css(styles.cardInput)}
            />
          </FormItem>
          <div className={css(styles.cardMinorDetails)}>
            <FormItem name="Card expiry">
              <CardExpiryElement
                style={ccStyle}
                className={css(styles.cardInput)}
              />
            </FormItem>
            <div style={{ width: "40px" }} />
            <FormItem name="Card CVC">
              <CardCVCElement
                style={ccStyle}
                className={css(styles.cardInput)}
              />
            </FormItem>
          </div>
          <label>
            <input
              name="isBillingAddressSame"
              type="checkbox"
              checked={this.state.isBillingAddressSame}
              onChange={this.handleCheckboxChange}
            />
            Billing address is the same as shipping address
          </label>
          <FormItem name="Street address (line 1)">
            <input className={css(styles.formInput)} />
          </FormItem>
          <FormItem name="Street address (line 2)">
            <input className={css(styles.formInput)} />
          </FormItem>
          <FormItem name="City">
            <input className={css(styles.formInput)} />
          </FormItem>
          <FormItem name="State / Province">
            <input className={css(styles.formInput)} />
          </FormItem>
          <FormItem name="ZIP / Postal Code">
            <input className={css(styles.formInput)} />
          </FormItem>
          <FormItem name="Country">
            <input className={css(styles.formInput)} />
          </FormItem>
        </div>
        <button className={css(styles.button)}>Confirm order</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);

const styles = StyleSheet.create({
  cardMinorDetails: {
    display: "flex",
    justifyContent: "space-between"
  },
  button: {
    marginTop: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    padding: "20px"
  },
  cardInput: {
    height: "20px",
    //fontSize: "medium",
    //lineHeight: "24px",
    padding: "6px 12px",
    borderRadius: "4px",
    borderColor: colors.defaultGray,
    borderStyle: "solid",
    borderWidth: "1px"
  },
  formInput: {
    height: "20px",
    fontSize: "medium",
    lineHeight: "24px",
    padding: "6px 12px",
    borderRadius: "4px",
    borderColor: colors.defaultGray,
    borderStyle: "solid",
    borderWidth: "1px"
  },
  formItem: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column"
  },
  formLabel: {
    display: "inline-block",
    marginBottom: "5px"
  }
});

const FormItem = ({ name, children }) => (
  <div className={css(formItemStyles.formItem)}>
    <label className={css(formItemStyles.formLabel)}>{name}</label>
    {children}
  </div>
);

const formItemStyles = StyleSheet.create({
  formItem: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  formLabel: {
    display: "inline-block",
    marginBottom: "5px"
  }
});
