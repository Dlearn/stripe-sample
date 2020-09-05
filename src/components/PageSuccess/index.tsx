import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = { completedPaymentIntent: string };

export default function PageSuccess({ completedPaymentIntent }: Props) {
  return (
    <>
      {completedPaymentIntent === "" ? (
        <h3>Error</h3>
      ) : (
        <div>
          <h3>Transaction Successful!</h3>
          <p>
            <span>Your order id is: </span>
            <b>{completedPaymentIntent}</b>
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
