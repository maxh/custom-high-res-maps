const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.handler = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const source = requestBody.source.id;
  const amount = requestBody.charge.amount;
  const currency = requestBody.charge.currency;

  return stripe.charges
    .create({
      amount,
      currency,
      source,
      description: "Serverless Stripe Test charge"
    })
    .then(charge => {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          message: `Charge processed succesfully!`,
          charge
        })
      };
      callback(null, response);
    })
    .catch(err => {
      const response = {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          error: err.message
        })
      };
      callback(null, response);
    });
};
