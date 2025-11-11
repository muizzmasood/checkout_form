import { LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import "./components/checkout-form"
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  
  render() {
    return null
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
