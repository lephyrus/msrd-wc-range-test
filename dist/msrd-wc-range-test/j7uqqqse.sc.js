/*! Built with http://stenciljs.com */
const{h,Context}=window.MsrdWcRangeTest;class RangeTest{constructor(){this.state={value:1,min:0,max:5}}watchValue(t){this.changeValue(t)}watchMin(t){this.changeMin(t)}watchMax(t){this.changeMax(t)}componentWillLoad(){this.host.addEventListener("change",t=>console.info("[wc:range]","emit:change",t.detail))}render(){return h("div",null,h("button",{onClick:()=>this.decrement(),disabled:this.state.value<=this.state.min},"Less"),h("span",{class:"value"},this.state.value),h("button",{onClick:()=>this.increment(),disabled:this.state.value>=this.state.max},"More"))}changeState(t,e=!1){console.info("[wc:range]","state change",this.state,t),this.state=t,e&&this.change.emit(t.value)}changeValue(t,e=!1){(t=Math.min(this.state.max,Math.max(this.state.min,Math.round(t))))!==this.state.value&&this.changeState(Object.assign({},this.state,{value:t}),e)}changeMin(t){(t=Math.round(t))!==this.state.min&&this.changeState({value:Math.max(this.state.value,t),min:t,max:Math.max(this.state.max,t)})}changeMax(t){(t=Math.round(t))!==this.state.max&&this.changeState({value:Math.min(this.state.value,t),min:Math.min(this.state.min,t),max:t})}increment(){this.changeValue(this.state.value+1,!0)}decrement(){this.changeValue(this.state.value-1,!0)}static get is(){return"msrd-range-test"}static get encapsulation(){return"shadow"}static get properties(){return{host:{elementRef:!0},max:{type:Number,attr:"max",watchCallbacks:["watchMax"]},min:{type:Number,attr:"min",watchCallbacks:["watchMin"]},state:{state:!0},value:{type:Number,attr:"value",watchCallbacks:["watchValue"]}}}static get events(){return[{name:"change",method:"change",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"*[data-msrd-range-test]{font-family:sans-serif}[data-msrd-range-test-host]{padding:1rem}span.value[data-msrd-range-test]{font-size:2rem;padding:0 1rem}"}}export{RangeTest as MsrdRangeTest};