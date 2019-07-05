import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Checkout from "checkout/Checkout";
import Editor from "editor/Editor";
import Home from "home/Home";
import { StripeProvider } from "react-stripe-elements";

function App() {
  return (
    <StripeProvider apiKey="pk_test_12345">
      <BrowserRouter>
        <Route exact={true} path="/" component={Home} />
        <Route path="/editor" component={Editor} />
        <Route path="/checkout" component={Checkout} />
      </BrowserRouter>
    </StripeProvider>
  );
}

export default App;
