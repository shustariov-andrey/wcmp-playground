export class VersionParagraph extends HTMLParagraphElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.innerHTML = `
            <style>
                :host {
                    color: brown;
                }
                
                span {
                    color: green;
                }
            </style>
            v<span>
                <slot></slot>
            </span>`;
    }
}

customElements.define('version-paragraph', VersionParagraph, {extends: 'p'});