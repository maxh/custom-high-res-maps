import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Editor from "./Editor";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Route exact={true} path="/" render={Home} />
      <Route path="/editor" component={Editor} />
    </BrowserRouter>
  );
}

export default App;
