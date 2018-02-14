import { Component, Element, Event, EventEmitter, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'msrd-range-test',
  styleUrl: 'range-test.scss',
  shadow: true
})
export class RangeTest {
  @Element() public host: HTMLElement;

  @State() public state: State = { value: 1, min: 0, max: 5 };

  @Prop() public value: number;
  @Watch('value')
  public watchValue(value: number) {
    this.changeValue(value);
  }

  @Prop() public min: number;
  @Watch('min')
  public watchMin(min: number) {
    this.changeMin(min);
  }

  @Prop() public max: number;
  @Watch('max')
  public watchMax(max: number) {
    this.changeMax(max);
  }

  @Event() public change: EventEmitter<number>;
  @Event() public narrow: EventEmitter<boolean>;

  @Event() public willLoad: EventEmitter<string>;
  @Event() public didLoad: EventEmitter<string>;
  @Event() public willUpdate: EventEmitter<string>;
  @Event() public didUpdate: EventEmitter<string>;
  @Event() public didUnload: EventEmitter<string>;

  private narrowRange: boolean = false;

  public componentWillLoad() {
    console.log('[wc:range]', 'The component is about to be rendered');
    this.willLoad.emit('willLoad');
  }

  public componentDidLoad() {
    console.log('[wc:range]', 'The component has been rendered');
    this.didLoad.emit('didLoad');
  }

  public componentWillUpdate() {
    console.log('[wc:range]', 'The component will update');
    this.willUpdate.emit('willUpdate');
  }

  public componentDidUpdate() {
    console.log('[wc:range]', 'The component did update');
    this.didUpdate.emit('didUpdate');
  }

  public componentDidUnload() {
    console.log('[wc:range]', 'The view has been removed from the DOM');
    this.didUnload.emit('didUnload');
  }

  private changeValue(value: number, notify: boolean = false): void {
    value = Math.min(this.state.max, Math.max(this.state.min, Math.round(value)));
    if (value !== this.state.value) {
      this.changeState({ ...this.state, value }, notify);
    }
  }

  private changeMin(min: number): void {
    min = Math.round(min);
    if (min !== this.state.min) {
      this.changeState({
        value: Math.max(this.state.value, min),
        min,
        max: Math.max(this.state.max, min)
      })
    }
  }

  private changeMax(max: number): void {
    max = Math.round(max);
    if (max !== this.state.max) {
      this.changeState({
        value: Math.min(this.state.value, max),
        min: Math.min(this.state.min, max),
        max
      })
    }
  }

  private changeState(state: State, notify: boolean = false) {
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

  private increment(): void {
    this.changeValue(this.state.value + 1, true);
  }

  private decrement(): void {
    this.changeValue(this.state.value - 1, true);
  }

  public render() {
    return (
      <div>
        <button onClick={() => this.decrement()} disabled={this.state.value <= this.state.min}>
          Less
        </button>
        <span class="value">
          { this.state.value }
        </span>
        <button onClick={() => this.increment()} disabled={this.state.value >= this.state.max}>
          More
        </button>
      </div>
    );
  }
}

interface State {
  value: number;
  min: number;
  max: number;
}
