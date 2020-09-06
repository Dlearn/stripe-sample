import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import CheckoutForm from "../CheckoutForm";

const promise = loadStripe(
  "pk_test_51HMxSsCv9X2wnXzjJnMq2wrXjAkt2xIpBvh5R1nyTj5JMyFzue3aaD021xnTywRl08BA0NECpZ2btpMkK0PhgQi500B9DiH329"
);

type Item = { id: number; price: number; title: string };

type Props = {
  itemAmounts: { [id: number]: number };
  items: { [id: number]: Item };
  setCompletedPaymentIntent: (paymentIntent: string) => void;
};

function Checkout({ itemAmounts, items, setCompletedPaymentIntent }: Props) {
  const totalAmount = Object.values(itemAmounts).reduce(
    (sum, currAmount) => sum + currAmount,
    0
  );

  if (totalAmount <= 0) {
    return (
      <>
        <h3>No items selected</h3>
        <Link to="/">
          <Button>Back to home</Button>
        </Link>
      </>
    );
  }

  const itemIds: number[] = Object.keys(itemAmounts).map((itemId) =>
    parseInt(itemId, 10)
  );

  const calculateOrderAmount = (itemAmounts: { [id: number]: number }) => {
    let total = 0;
    Object.keys(itemAmounts)
      .map((itemId) => parseInt(itemId, 10))
      .forEach((itemId) => {
        total += items[itemId].price * itemAmounts[itemId];
      });
    return total;
  };

  return (
    <div style={{ width: "600px" }}>
      <h3>Order Summary</h3>
      <Table bordered>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {itemIds.map((itemId) => (
            <tr key={itemId}>
              <td>{items[itemId].title}</td>
              <td>{itemAmounts[itemId]}</td>
              <td>{Math.floor(items[itemId].price / 100)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>Total</td>
            <td>{Math.floor(calculateOrderAmount(itemAmounts) / 100)}</td>
          </tr>
        </tfoot>
      </Table>
      <Elements stripe={promise}>
        <CheckoutForm
          itemAmounts={itemAmounts}
          setCompletedPaymentIntent={setCompletedPaymentIntent}
        />
      </Elements>
      <Button as="a" href="/canceled">
        Cancel order
      </Button>
    </div>
  );
}

export default Checkout;
