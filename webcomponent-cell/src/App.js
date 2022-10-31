import "./index.scss";
import Cell from "./components/Cell";

document.getElementById("app").innerHTML = `
<div class="mt-10 text-3xl mx-auto max-w-6xl">
<web-component-cell alive="true" clickhandler="function () {
  console.log("custom click handler");
}"></web-component-cell>
  <div>Name: webcomponent-cell</div>
  <div>Framework: vanilla</div>
  <div>Language: JavaScript</div>
  <div>CSS: Tailwind</div>
</div>
`;
