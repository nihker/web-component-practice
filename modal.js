class Modal extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0,0,0,0.75);
                    z-index: 10;
                }

                #modal {
                    position: fixed;
                    top: 15vh;
                    left: 25%;
                    width: 50%;
                    z-index: 100;
                    background: white;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.26);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                
                header {
                    padding: 1rem;
                }

                #main {
                    padding: 1rem;
                }

                header h1 {
                    font-size: 1.25rem;
                }

                #actions {
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                }

                #actions button {
                    margin: 0 0.25rem;
                    border: none;
                    color: white;
                    padding: 10px 17px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    cursor: pointer;
                }

                #actions button#cancel {
                    background-color: red;
                }

                #actions button#confirm {
                    background-color: green;
                }

            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <h1> Please Confirm </h1>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <section id="actions">
                    <button id="cancel">Cancel</button>
                    <button id="confirm">Ok</button>
                </section>
            </div>
        `;
    }

}

customElements.define('nk-modal', Modal);