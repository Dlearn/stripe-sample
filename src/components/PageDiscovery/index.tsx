import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

export default function PageDiscovery() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/get-items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setItems(data.items);
      });
  }, []);

  return (
    <div>
      <h3>Choose your items!</h3>
      <div style={{ display: "flex" }}>
        {items.map((item, index) => {
          console.log({ item });
          return <Card key={index}>A</Card>;
        })}
      </div>
      Page Discovery<Button>Click me!</Button>
      <a href="/checkout">Checkout</a>
    </div>
  );
}
