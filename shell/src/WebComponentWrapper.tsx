import React from "react";
import "webcomponent_cell/Cell";

export default function WebComponentWrapper({ alive }: { alive: string }) {
  return (
    <div>
      {/* TODO: tpyescript error */}
      <web-component-cell alive={alive}></web-component-cell>
    </div>
  );
}
