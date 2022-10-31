import React from "react";
import ReactDOM from "react-dom";
import Cell from "./components/Cell";

import "./index.scss";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <Cell alive={true} clickHandler={() => console.log("clicked")} />
    <div>Name: react-cell</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Tailwind</div>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
