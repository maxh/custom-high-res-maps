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

const URL = "lambdaUrlGoesHere";

const sendPostJsonRequest = params => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", URL, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.responseType = "json";
    xhr.onload = () => {
      const jsonResponse = xhr.response;
      if (jsonResponse.error) {
        reject(jsonResponse.error);
        return;
      }
      resolve(jsonResponse);
    };
    xhr.send(JSON.stringify(params));
  });
};

class CheckoutForm extends React.Component {
  state = { isBillingAddressSame: true };

  handleSubmit = async ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    //     /*
    // adddress {
    //           city,
    //           country,
    //           line1,
    //           line2,
    //           postal_code,
    //           state
    //         },
    // */
    //     // https://stripe.com/docs/stripe-js/reference#stripe-create-source
    //     // https://stackoverflow.com/questions/50284633/stripe-payments-source-vs-token-card
    //     const source = await this.props.stripe.createSource({
    //       type: "card",
    //       owner: {
    //         address: billingAddress,
    //         email: email,
    //         name: nameOnCard,
    //         phone: billingPhone
    //       }
    //     });

    //     const config = CartManager.getCircularConfig();

    //     const params = {
    //       amount: dollarAmount * 100,
    //       currency: "usd",
    //       metadata: { config },
    //       shipping: {
    //         name: shippingName,
    //         address: shippingAddress
    //       }
    //     };

    // sendPostJsonRequest
  };

  handleCheckboxChange = event => {
    this.setState({ isBillingAddressSame: event.target.checked });
  };

  render() {
    return (
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
          <p className={css(styles.hint)}>SSL Secured & Encrypted</p>
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
    );
  }
}

export default injectStripe(CheckoutForm);

const styles = StyleSheet.create({
  hint: {
    color: "gray",
    fontSize: "small"
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
