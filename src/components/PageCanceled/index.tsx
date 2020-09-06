import React from "react";
import { Button } from "react-bootstrap";

export default function PageCanceled() {
  return (
    <>
      <h3>Transaction cancelled</h3>
      <Button as="a" href="/">
        Back to home
      </Button>
    </>
  );
}
