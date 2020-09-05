import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElementChangeEvent } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import history from "../../history";
import "./styles.css";

type Props = {
  itemAmounts: { [id: number]: number };
  setCompletedPaymentIntent: (paymentIntent: string) => void;
};

export default function CheckoutForm({
  itemAmounts,
  setCompletedPaymentIntent,
}: Props) {
  const [error, setError] = useState<string | null | undefined>(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemAmounts }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [itemAmounts]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {},
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev: React.SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setProcessing(true);

    // @ts-ignore
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        // @ts-ignore
        card: elements.getElement(CardElement),
      },
    });

    const { error, paymentIntent } = payload;
    if (error) {
      setError(`Payment failed ${error.message}`);
      setProcessing(false);
    } else {
      console.log({ payload });
      setError(null);
      setProcessing(false);
      if (paymentIntent) {
        setCompletedPaymentIntent(paymentIntent.id);
        history.push("/success");
      }
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <button disabled={processing || disabled} id="submit">
        <span id="button-text">
          {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
    </form>
  );
}
