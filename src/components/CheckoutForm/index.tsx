import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElementChangeEvent } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import history from "../../history";
import "./styles.css";

type Props = {
  itemAmounts: { [id: number]: number };
  setCompletedPaymentIntent: (paymentIntent: { [id: string]: any }) => void;
};

export default function CheckoutForm({
  itemAmounts,
  setCompletedPaymentIntent,
}: Props) {
  const [clientSecret, setClientSecret] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
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
      receipt_email: email,
      payment_method: {
        // @ts-ignore
        card: elements.getElement(CardElement),
      },
    });

    const { error, paymentIntent } = payload;
    if (error || !paymentIntent) {
      const errorMessage =
        (error && error.message) ||
        "Unexpected error. Please check your email if you have been charged. If you receive no email, contact customer support.";
      setError(`Payment failed: ${errorMessage}`);
      // Panic: Send to error logging service
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setCompletedPaymentIntent(paymentIntent);
      history.push("/success");
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
        required
        type="email"
        value={email}
      />
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
