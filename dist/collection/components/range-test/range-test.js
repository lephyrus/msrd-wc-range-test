export class RangeTest {
    constructor() {
        this.state = { value: 1, min: 0, max: 5 };
    }
    watchValue(value) { this.changeValue(value); }
    watchMin(min) { this.changeMin(min); }
    watchMax(max) { this.changeMax(max); }
    componentWillLoad() {
        this.host.addEventListener('change', (event) => console.info('[wc:range]', 'emit:change', event['detail']));
    }
    render() {
        return (h("div", null,
            h("button", { onClick: () => this.decrement(), disabled: this.state.value <= this.state.min }, "Less"),
            h("span", { class: "value" }, this.state.value),
            h("button", { onClick: () => this.increment(), disabled: this.state.value >= this.state.max }, "More")));
    }
    changeState(state, notify = false) {
        console.info('[wc:range]', 'state change', this.state, state);
        this.state = state;
        if (notify) {
            this.change.emit(state.value);
        }
    }
    changeValue(value, notify = false) {
        value = Math.min(this.state.max, Math.max(this.state.min, Math.round(value)));
        if (value !== this.state.value) {
            this.changeState(Object.assign({}, this.state, { value }), notify);
        }
    }
    changeMin(min) {
        min = Math.round(min);
        if (min !== this.state.min) {
            this.changeState({
                value: Math.max(this.state.value, min),
                min,
                max: Math.max(this.state.max, min)
            });
        }
    }
    changeMax(max) {
        max = Math.round(max);
        if (max !== this.state.max) {
            this.changeState({
                value: Math.min(this.state.value, max),
                min: Math.min(this.state.min, max),
                max
            });
        }
    }
    increment() {
        this.changeValue(this.state.value + 1, true);
    }
    decrement() {
        this.changeValue(this.state.value - 1, true);
    }
    static get is() { return "msrd-range-test"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "host": { "elementRef": true }, "max": { "type": Number, "attr": "max", "watchCallbacks": ["watchMax"] }, "min": { "type": Number, "attr": "min", "watchCallbacks": ["watchMin"] }, "state": { "state": true }, "value": { "type": Number, "attr": "value", "watchCallbacks": ["watchValue"] } }; }
    static get events() { return [{ "name": "change", "method": "change", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:msrd-range-test:**/"; }
}
