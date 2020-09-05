const express = require("express");
const app = express();
const stripe = require("stripe")(
  "sk_test_51HMxSsCv9X2wnXzjSIHSZxEl1eAOMMNPRhhzPAJ8rCJKsfsCUylMtMMuqmzIlupcORwNQPBis8MexlAvhPQAs0wW00XsqPjqBv"
);

app.use(express.static("."));
app.use(express.json());

const ITEMS = {
  1: { id: 1, price: 10, title: "Climbing Shoes" },
  2: { id: 2, price: 20, title: "iPhone Case" },
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

app.post("/create-payment-intent", async (req, res) => {
  const { itemAmounts } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(itemAmounts),
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));
