const template = document.createElement("template");
console.log("Loading custom element");

// TODO: fix tailwind styles
template.innerHTML = `
    <style>
        div{
          padding: 8px;
        }
        .dead{
            background: #EF4444;   
        }
    </style>
  <div>W</div>
`;

class WebComponentCell extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // TODO: attach zustand dispatch to click handler
  // disconnectedCallback() {
  //   this._shadowRoot.querySelector("div").removeEventListener("click");
  // }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log({ name, oldValue, newValue });
    console.log("Custom square element attributes changed.");
    if (name === "alive") {
      if (newValue === "true") {
        this._shadowRoot.querySelector("div").className = "alive";
      } else {
        this._shadowRoot.querySelector("div").className = "dead";
      }
    }
  }

  static get observedAttributes() {
    return ["alive", "clickhandler"];
  }
}

window.customElements.define("web-component-cell", WebComponentCell);
