import React from "react";
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from "react-stripe-elements";
import { StyleSheet, css } from "aphrodite";

import colors from "common/colors";

import { withRouter } from "react-router-dom";

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

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
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
            <form onSubmit={this.handleSubmit} className={css(styles.form)}>
              <div>
                <h2>Checkout</h2>
                <FormItem name="Email address">
                  <input className={css(styles.formInput)} />
                </FormItem>
                <h3>Shipping information</h3>
                <AddressForm />
                <h3>Billing information</h3>
                <label>
                  <input
                    name="isBillingAddressSame"
                    type="checkbox"
                    checked={this.state.isBillingAddressSame}
                    onChange={this.handleCheckboxChange}
                  />
                  Billing address is the same as shipping address
                </label>
                <div
                  style={{
                    display: this.state.isBillingAddressSame ? "none" : "block"
                  }}
                >
                  <h4>Billing address</h4>
                  <AddressForm />
                </div>
                <h4>Card details</h4>
                <p className={css(styles.hint)}>
                  SSL Secured & Encrypted payment
                </p>
                <FormItem name="Name on card">
                  <input className={css(styles.formInput)} />
                </FormItem>
                <FormItem name="Card number">
                  <div className={css(styles.ccWrapper)}>
                    <CardNumberElement
                      style={ccStyle}
                      className={css(styles.cardInput)}
                    />
                  </div>
                </FormItem>
                <div className={css(styles.cardMinorDetails)}>
                  <FormItem name="Card expiry">
                    <div className={css(styles.ccDetailWrapper)}>
                      <CardExpiryElement
                        style={ccStyle}
                        className={css(styles.cardInput)}
                      />
                    </div>
                  </FormItem>
                  <div style={{ width: "20px" }} />
                  <FormItem name="Card CVC">
                    <div className={css(styles.ccDetailWrapper)}>
                      <CardCVCElement
                        style={ccStyle}
                        className={css(styles.cardInput)}
                      />
                    </div>
                  </FormItem>
                </div>
              </div>
              <button className={css(styles.button)}>Confirm order</button>
            </form>
            <div className={css(styles.preview)}>Preview</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(injectStripe(CheckoutForm));

const styles = StyleSheet.create({
  preview: {
    width: "200px",
    height: "200px",
    marginLeft: "50px",
    background: "yellow",
    position: "sticky",
    top: "20px"
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
  hint: {
    color: colors.defaultGray,
    fontSize: "small"
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
  },
  cardMinorDetails: {
    display: "flex",
    justifyContent: "space-between"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    padding: "20px",
    background: "white"
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
  ccWrapper: {
    width: "266px"
  },
  ccDetailWrapper: {
    width: "100px"
  },
  formInput: {
    width: "240px",
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
  },
  button: {
    marginTop: "20px",
    backgroundColor: "#447AB1",
    color: "white",
    fontWeight: "bold",
    height: "50px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "6px 20px",
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
    ":focus": { outline: 0 }
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
    marginTop: "15px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
  },
  formLabel: {
    display: "inline-block",
    marginBottom: "5px"
  }
});

const AddressForm = () => {
  return (
    <div>
      <FormItem name="Name">
        <input className={css(styles.formInput)} />
      </FormItem>
      <FormItem name="Phone number">
        <input className={css(styles.formInput)} />
      </FormItem>
      <FormItem name="Street address">
        <input className={css(styles.formInput)} />
      </FormItem>
      <FormItem name="">
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
  );
};
