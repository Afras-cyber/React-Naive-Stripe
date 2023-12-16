const StripeSecretKey =
  "sk_test_51OO1DzHyW7F7HDzWsT6bmSA9EMYYmXRuO8EUUE2LwYUhrPE37BSOMaRznUKPjV91UiakHSRVUfuImR8fVDzUnoux00I4NWZ2iG";
const StripePublishableKey =
  "pk_test_51OO1DzHyW7F7HDzWsfW9PAamh5OZfKy9QaNwm39QneeGNmtCABRUE03rOAeWvtiCnLm6Er4uvdYJ1tN6PRMPOZCR00qHFFu68E";

const express = require("express");
const router = express.Router();
const stripe = require("stripe")(StripeSecretKey);

router.post("/payment-sheet", async (_, res) => {
  const customer = await stripe.customers.create({
    email: "demo@gmail.com",
  });
  const ephemeralKeys = await stripe.ephemeralKeys.create(
    {
      customer: customer.id,
    },
    { apiVersion: "2020-08-27" }
  );
  const setupIntent = await stripe.setupIntents.create({
    customer: customer.id,
    payment_method_types: ["card"],
  });

  return res.json({
    setupIntent: setupIntent.client_secret,
    ephemeralKeys: ephemeralKeys.secret,
    customer: customer.id,
  });
});

router.post("/payment-sheet-subscription", async (_, res) => {
  //   const stripe = new Stripe(StripeSecretKey, {
  //     apiVersion: "2020-8-27",
  //   });
  const customer = await stripe.customers.create({
    email: "demo@gmail.com",
  });
  const ephemeralKeys = await stripe.ephemeralKeys.create(
    {
      customer: customer.id,
    },
    { apiVersion: "2020-08-27" }
  );
  const subscription = await stripe.subscription.create({
    customer: customer.id,
    items: [{ price: "price" }],
    trial_period_days: 3,
  });
  if (typeof subscription.pending_setup_intent === "string") {
    const setupIntent = await stripe.setupIntents.retrieve(
      subscription.pending_setup_intent
    );
    return res.json({
      setupIntent: setupIntent.client_secret,
      ephemeralKeys: ephemeralKeys.secret,
      customer: customer.id,
    });
  } else {
    throw new Error(
      "Expected response type string, but received:" +
        typeof subscription.pending_setup_intent
    );
  }
});
module.exports = router;
