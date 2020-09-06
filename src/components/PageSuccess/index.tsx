import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {
  completedPaymentIntent: {
    [id: string]: any;
  };
};

export default function PageSuccess({ completedPaymentIntent }: Props) {
  return (
    <>
      {Object.keys(completedPaymentIntent).length === 0 ? (
        <h3>Error</h3>
      ) : (
        <div>
          <h3>Transaction Successful!</h3>
          <p>
            You have been charged
            <b> ${Math.floor(completedPaymentIntent.amount / 100)}</b>.
          </p>
          <p>
            <span>Your order id is: </span>
            <b>{completedPaymentIntent.id}</b>
          </p>
          <p>
            <span>See the result in your </span>
            <a href={`https://dashboard.stripe.com/test/payments`}>
              Stripe dashboard
            </a>
            .
          </p>
        </div>
      )}

      <Link to="/">
        <Button>Back to home</Button>
      </Link>
    </>
  );
}
