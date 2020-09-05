import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "../CheckoutForm";

const promise = loadStripe(
  "pk_test_51HMxSsCv9X2wnXzjJnMq2wrXjAkt2xIpBvh5R1nyTj5JMyFzue3aaD021xnTywRl08BA0NECpZ2btpMkK0PhgQi500B9DiH329"
);

type Props = { itemAmounts: { [id: number]: number } };

function Checkout({ itemAmounts }: Props) {
  return (
    <div>
      <Elements stripe={promise}>
        <CheckoutForm itemAmounts={itemAmounts} />
      </Elements>
    </div>
  );
}

export default Checkout;
