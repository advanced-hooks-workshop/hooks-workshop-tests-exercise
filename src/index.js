import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Toggle } from "./components/Toggle";

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Toggle />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
