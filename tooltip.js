// Create the class Tooltip with extend HTMLElement
class Tooltip extends HTMLElement {

    constructor(){
        super();
        this._tooltipContainer;
        this._tooltipText = 'Some dummy tooltip text.';
        this._tooltipIcon;
        this.attachShadow({ mode: 'open' });
        // const template = document.querySelector('#tooltip-template');
        // this.shadowRoot.appendChild(template.content.cloneNode(true))
        
        // The HTML template of the Custome Component and the Scope Style
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    font-weight: normal;
                    background-color: green;
                    color: white;
                    position: absolute;
                    z-index: 10;
                    padding: 0.15rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0,0,0,0,0.26);
                    top: 1.5rem;
                    left: 0.75rem;
                }

                :host(.important) {
                    background: var(--color-primary, #ccc);
                    padding: 0.5rem;
                }

                :host-context(p) {
                    font-weight: bold;
                }

                .highlight {
                    background-color: red;
                }

                ::slotted(.highlight) {
                    border-bottom: 1px dotted red;
                }

                .icon {
                    background: black;
                    color: white;
                    padding: 0.25rem 0.5rem;
                    text-align: center;
                    border-radius: 50%;

                }
            </style>
            <span class="icon"> (?)</span>
            <slot>Some Default</slot>
        `;
    }

    // lifecrycle methods
    connectedCallback() {
        if(this.hasAttributes('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        
       this._tooltipIcon = this.shadowRoot.querySelector('span');
        this._tooltipIcon.textContent = ' (?)';
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        // this.shadowRoot.appendChild(tooltipIcon); // is in the template
        this.style.position = 'relative';
    }

    // Watched attributes 
    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue === newValue) {
            return;
        }

        if(name === 'text'){
            this._tooltipText = newValue;
        }
        console.log(name, oldValue, newValue);
    }

    disconnectedCallback() {
        console.log('Disconnected Component and remove EventListner');
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
    }

    static get observedAttributes() {
        // add attributes we will watched 
        return ['text'];
    }

    // Watched attributes end

    // private methods
    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        // this._tooltipContainer.style.backgroundColor = 'green';
        // this._tooltipContainer.style.color = 'white';
        // this._tooltipContainer.style.position = 'absolute';
        // this._tooltipContainer.style.zIndex = 10;


        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }


}

// definde the name of the HTML component and add the class (for exp. Tooltip)
customElements.define('nk-tooltip', Tooltip);