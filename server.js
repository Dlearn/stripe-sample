const express = require("express");
const app = express();
const stripe = require("stripe")(
  "pk_test_51HMxSsCv9X2wnXzjJnMq2wrXjAkt2xIpBvh5R1nyTj5JMyFzue3aaD021xnTywRl08BA0NECpZ2btpMkK0PhgQi500B9DiH329"
);

app.use(express.static("."));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

const ITEMS = [
  { id: 1, price: 10 },
  { id: 2, price: 20 },
];

app.get("/get-items", async (req, res) => {
  res.send({
    items: ITEMS,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));
