import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Editor from "./Editor";

function App() {
  return (
    <BrowserRouter>
      <Route exact={true} path="/" render={() => <h1>Map Lamps</h1>} />
      <Route path="/editor" component={Editor} />
    </BrowserRouter>
  );
}

export default App;
