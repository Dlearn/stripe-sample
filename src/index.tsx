import "bootstrap/dist/css/bootstrap.css"; // Import bootstrap CSS
import React from "react";
import { Navbar } from "react-bootstrap";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageCheckout from "./components/PageCheckout";
import PageDiscovery from "./components/PageDiscovery";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navbar bg="light">
        <Navbar.Brand href="/">Dylan's Shop</Navbar.Brand>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <PageDiscovery />
        </Route>
        {/* <Route path="/canceled.html">
        <Canceled />
      </Route> */}
        <Route exact path="/checkout">
          <PageCheckout />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
