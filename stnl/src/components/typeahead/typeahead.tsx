import { Component, Event, EventEmitter, Prop, State } from '@stencil/core';

@Component({
  tag: 'erb-st-typeahead',
  styleUrl: 'typeahead.css',
  shadow: true
})
export class Typeahead {
  @Prop() getItemsCallback: (v: string) => Promise<any[]>;

  @State() options: any[] = [];
  @State() dropdownOpened = false;

  @Event({
    eventName: 'typeahead-changed'
  })
  typeaheadValueChanged: EventEmitter;

  value: string;

  inputChanged(event) {
    const v = event.target.value;
    this.value = v;
    this.getItemsCallback(v)
      .then(items => {
        this.options = items;
        this.dropdownOpened = true;
      });
  }

  itemSelected(event) {
    this.value = event.target.innerText;
    this.dropdownOpened = false;
    this.typeaheadValueChanged.emit({
      value: {
        key: event.target.dataset.value,
        label: this.value
      }
    });
  }

  render() {
    return (
      <div class="container">
        <input type="text" onInput={event => this.inputChanged(event)} onFocus={event => this.inputChanged(event)} value={this.value}/>
        {this.renderDropdown(this.dropdownOpened)}
      </div>
    );
  }

  private renderDropdown(opened: boolean) {
    const className = opened ? 'dropdown opened' : 'dropdown';
    return (
      <div class={className}>
        {this.options.map(opt =>
          <div onClick={event => this.itemSelected(event)} data-value={opt.key}>{opt.label}</div>
        )}
      </div>
    );
  }
}
