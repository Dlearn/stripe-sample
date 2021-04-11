const express = require("express");
const app = express();
const stripe = require("stripe")(
  "sk_test_51HMxSsCv9X2wnXzjSIHSZxEl1eAOMMNPRhhzPAJ8rCJKsfsCUylMtMMuqmzIlupcORwNQPBis8MexlAvhPQAs0wW00XsqPjqBv",
);

app.use(express.static("."));
app.use(express.json());

const ITEMS = {
  1: { id: 1, price: 1000, title: "Climbing Shoes" },
  2: { id: 2, price: 2000, title: "iPhone Case" },
};

const calculateOrderAmount = (itemAmounts) => {
  let total = 0;
  const itemIds = Object.keys(itemAmounts);
  itemIds.forEach((itemId) => {
    total += ITEMS[itemId].price * itemAmounts[itemId];
  });
  return total;
};

app.get("/get-items", async (req, res) => {
  res.send({
    items: ITEMS,
  });
});

app.get("/list-payment-intents", async (req, res) => {
  const { limit = 100 } = req.query;
  // Manual pagination
  // const paymentIntents = await stripe.paymentIntents.list({ limit });

  // Auto pagination
  const paymentIntents = [];
  for await (const paymentIntent of stripe.paymentIntents.list({ limit })) {
    paymentIntents.push(paymentIntent);
  }

  res.send(paymentIntents);
});

app.post("/create-payment-intent", async (req, res) => {
  const { itemAmounts, uuid } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create(
    {
      amount: calculateOrderAmount(itemAmounts),
      currency: "usd",
    },
    { idempotencyKey: uuid },
  );

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));
