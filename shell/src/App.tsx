import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import "./index.scss";

const ReactCell = React.lazy(() => import("react_cell/Cell"));

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex">
        <ReactCell />
        <ReactCell />
        <ReactCell />
        <ReactCell />
        <ReactCell />
        <ReactCell />
      </div>
    </Suspense>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
