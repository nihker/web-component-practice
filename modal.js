class Modal extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = ``;
    }

}

customElements.define('nk-model', Modal);