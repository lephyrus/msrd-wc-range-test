export class RangeTest {
    constructor() {
        this.state = { value: 1, min: 0, max: 5 };
        this.narrowRange = false;
    }
    watchValue(value) {
        this.changeValue(value);
    }
    watchMin(min) {
        this.changeMin(min);
    }
    watchMax(max) {
        this.changeMax(max);
    }
    componentWillLoad() {
        console.log('[wc:range]', 'The component is about to be rendered');
        this.willLoad.emit('willLoad');
    }
    componentDidLoad() {
        console.log('[wc:range]', 'The component has been rendered');
        this.didLoad.emit('didLoad');
    }
    componentWillUpdate() {
        console.log('[wc:range]', 'The component will update');
        this.willUpdate.emit('willUpdate');
    }
    componentDidUpdate() {
        console.log('[wc:range]', 'The component did update');
        this.didUpdate.emit('didUpdate');
    }
    componentDidUnload() {
        console.log('[wc:range]', 'The view has been removed from the DOM');
        this.didUnload.emit('didUnload');
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
    changeState(state, notify = false) {
        console.info('[wc:range]', 'state change', this.state, state);
        this.state = state;
        if (notify) {
            console.info('[wc:range]', 'emit change', state.value);
            this.change.emit(state.value);
        }
        const narrowRange = Math.abs(state.max - state.min) > 4;
        if (this.narrowRange !== narrowRange) {
            this.narrow.emit(narrowRange);
        }
        this.narrowRange = narrowRange;
    }
    increment() {
        this.changeValue(this.state.value + 1, true);
    }
    decrement() {
        this.changeValue(this.state.value - 1, true);
    }
    render() {
        return (h("div", null,
            h("button", { onClick: () => this.decrement(), disabled: this.state.value <= this.state.min }, "Less"),
            h("span", { class: "value" }, this.state.value),
            h("button", { onClick: () => this.increment(), disabled: this.state.value >= this.state.max }, "More")));
    }
    static get is() { return "msrd-range-test"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "host": { "elementRef": true }, "max": { "type": Number, "attr": "max", "watchCallbacks": ["watchMax"] }, "min": { "type": Number, "attr": "min", "watchCallbacks": ["watchMin"] }, "state": { "state": true }, "value": { "type": Number, "attr": "value", "watchCallbacks": ["watchValue"] } }; }
    static get events() { return [{ "name": "change", "method": "change", "bubbles": true, "cancelable": true, "composed": true }, { "name": "narrow", "method": "narrow", "bubbles": true, "cancelable": true, "composed": true }, { "name": "willLoad", "method": "willLoad", "bubbles": true, "cancelable": true, "composed": true }, { "name": "didLoad", "method": "didLoad", "bubbles": true, "cancelable": true, "composed": true }, { "name": "willUpdate", "method": "willUpdate", "bubbles": true, "cancelable": true, "composed": true }, { "name": "didUpdate", "method": "didUpdate", "bubbles": true, "cancelable": true, "composed": true }, { "name": "didUnload", "method": "didUnload", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:msrd-range-test:**/"; }
}
