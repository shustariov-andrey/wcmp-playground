export class TypeaheadComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'closed'});
        shadow.appendChild(this.createStyle());
        shadow.appendChild(this.createShadow());

        this.input.addEventListener('input', e => this.onInput(e));
        this.input.addEventListener('focus', e => this.onInput(e));
        this.dropdown.addEventListener('click', e => this.onItemSelect(e.target))
    }

    onInput(event) {
        const v = event.target.value;
        this.getItemsCallback(v)
            .then(items => {
                const options = document.createDocumentFragment();
                items.forEach(item => {
                    const option = document.createElement('div');
                    option.dataset.value = item.key;
                    option.innerHTML = item.label;
                    option.setAttribute('title', item.label);
                    options.appendChild(option);
                });
                this.dropdown.innerHTML = '';
                this.dropdown.appendChild(options);
                this.dropdown.classList.add('opened');
            })
    }

    onItemSelect(option) {
        if (this.dropdown.contains(option)) {
            this.input.value = option.innerText;
            this.dropdown.classList.remove('opened');
            this.dispatchEvent(new CustomEvent('typeahead-changed', {
                detail: {
                    value: {
                        key: option.dataset.value,
                        label: this.input.value
                    }
                },
                bubbles: true
            }))
        }
    }

    createShadow() {
        this.dropdown = document.createElement('div');
        this.input = document.createElement('input');
        this.dropdown.classList.add('dropdown');
        const fragment = document.createDocumentFragment();
        fragment.appendChild(this.input);
        fragment.appendChild(this.dropdown);
        return fragment;
    }

    createStyle() {
        const style = document.createElement('style');
        style.textContent = `
            :host {
                position: relative;
                
                --erb-typeahead-border-color: #e3e3e3;
                --erb-typeahead-option-hover-color: #cddcea;
            }
            
            input {
                border-color: var(--erb-typeahead-border-color);
                border-width: 1px;
                padding: 0 1rem;
                font-size: 1rem;
                line-height: 1.5;
            }
            
            .dropdown {
                position: absolute;
                left: 0;
                right: 0;
                min-height: 1rem;
                border: 1px solid var(--erb-typeahead-border-color);
                max-height: 400px;
                overflow: auto;
                z-index: 10;
                background: #fff;
            }
            
            .dropdown:not(.opened) {
                display: none;
            }
            
            .dropdown div {
                line-height: 1.5rem;
                padding: 0 1rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .dropdown div:hover {
                background-color: var(--erb-typeahead-option-hover-color);
            }
        `;
        return style;
    }
}

window.customElements.define('erb-pure-typeahead', TypeaheadComponent);