import "bootstrap/dist/css/bootstrap.css"; // Import bootstrap CSS
import React, { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import ReactDOM from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import PageCanceled from "./components/PageCanceled";
import PageCheckout from "./components/PageCheckout";
import PageDiscovery from "./components/PageDiscovery";
import PageSuccess from "./components/PageSuccess";
import history from "./history";
import "./index.css";
import styles from "./styles.module.css";

type Item = { id: number; price: number; title: string };

const App = () => {
  const [items, setItems] = useState<{ [id: number]: Item }>([]);
  const [itemAmounts, setItemAmounts] = useState<{ [id: number]: number }>({});
  const [completedPaymentIntent, setCompletedPaymentIntent] = useState("");

  // Fetch items from server
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
        const { items } = data;
        setItems(items);
        const newItemAmounts: { [id: number]: number } = {};
        Object.keys(items).forEach((itemId) => {
          newItemAmounts[parseInt(itemId, 10)] = 0;
        });
        setItemAmounts(newItemAmounts);
      });
  }, []);

  return (
    <React.StrictMode>
      <Router history={history}>
        <Navbar bg="light">
          <Navbar.Brand href="/">Dylan's Shop</Navbar.Brand>
        </Navbar>
        <div className={styles.page}>
          <Switch>
            <Route exact path="/">
              <PageDiscovery
                items={items}
                itemAmounts={itemAmounts}
                setCompletedPaymentIntent={setCompletedPaymentIntent}
                setItemAmounts={setItemAmounts}
              />
            </Route>
            <Route exact path="/checkout">
              <PageCheckout
                itemAmounts={itemAmounts}
                items={items}
                setCompletedPaymentIntent={setCompletedPaymentIntent}
              />
            </Route>
            <Route exact path="/success">
              <PageSuccess completedPaymentIntent={completedPaymentIntent} />
            </Route>
            <Route exact path="/canceled">
              <PageCanceled />
            </Route>
          </Switch>
        </div>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
