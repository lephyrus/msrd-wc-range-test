import { Component, Element, Event, EventEmitter, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'msrd-range-test',
  styleUrl: 'range-test.scss',
  shadow: true
})
export class RangeTest {
  @Prop() public value: number;
  @Prop() public min: number;
  @Prop() public max: number;

  @Watch('value') public watchValue(value: number) { this.changeValue(value); }
  @Watch('min') public watchMin(min: number) { this.changeMin(min); }
  @Watch('max') public watchMax(max: number) { this.changeMax(max); }

  @Event() public change: EventEmitter<number>;

  @Element() public host: HTMLElement;

  @State() public state: State = { value: 1, min: 0, max: 5 };

  public componentWillLoad() {
    this.host.addEventListener('change', (event) => console.info('[wc:range]', 'emit:change', event['detail']));
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

  private changeState(state: State, notify: boolean = false) {
    console.info('[wc:range]', 'state change', this.state, state);
    this.state = state;
    if (notify) {
      this.change.emit(state.value);
    }
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

  private increment(): void {
    this.changeValue(this.state.value + 1, true);
  }

  private decrement(): void {
    this.changeValue(this.state.value - 1, true);
  }
}

interface State {
  value: number;
  min: number;
  max: number;
}
