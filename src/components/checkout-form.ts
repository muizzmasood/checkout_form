import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('checkout-form')
export class CheckoutForm extends LitElement {
  // --- FORM FIELDS ---
  @property({ type: String }) email = '';
  @property({ type: String }) firstName = '';
  @property({ type: String }) lastName = '';
  @property({ type: String }) city = '';
  @property({ type: String }) address1 = '';
  @property({ type: String }) streetAddress = '';
  @property({ type: String }) postal = '';
  @property({ type: String }) phone = '';

  // --- PAYMENT ---
  @property({ type: String }) paymentMethod = 'cod';
  @property({ type: String }) cardNumber = '';
  @property({ type: String }) expiry = '';
  @property({ type: String }) cvv = '';

  // --- ORDER DATA ---
  @property({ type: Array }) items: { name?: string; price: number; quantity?: number; image?: string }[] = [];
  @property({ type: Number }) total = 0;

  // --- STATE ---
  @state() errors: Record<string, string> = {};
  @state() darkMode = false;

  static styles = css`
    :host {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  font-family: 'Inter', system-ui, sans-serif;
  color: var(--text-color, #222);
  background: var(--bg-color, #fff);
  transition: all 0.3s ease;
  box-sizing: border-box;
}

    /* ====== LAYOUT ====== */
   .checkout-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  height: 100%;
}

    .form-section {
      flex: 1.8;
      background: var(--form-bg, #fff);
padding: 3rem 3rem;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      box-sizing: border-box;
    }

    .summary-section {
      flex: 0.7;
      background: var(--summary-bg, #f9fafb);
      border-left: 1px solid #e5e7eb;
      padding: 3rem 2.5rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    /* ====== DARK MODE TOGGLE ====== */
    .dark-toggle {
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  z-index: 100;
}
  
    .dark-toggle button {
      background: #374151;
      color: white;
      border: none;
      border-radius: 50%;
      width: 45px;
      height: 45px;
      font-size: 1.2rem;
      cursor: pointer;
      transition: background 0.3s ease;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .dark-toggle button:hover {
      background: #4b5563;
    }

    /* ====== FORM ELEMENTS ====== */
    form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.2rem 1.5rem;
      margin-top: 1rem;
    }

    label {
      font-weight: 600;
      font-size: 0.9rem;
      margin-bottom: 0.3rem;
      display: inline-block;
    }

    input, select {
      width: 100%;
      padding: 0.9rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 10px;
      font-size: 0.95rem;
      background: var(--input-bg, #fff);
      color: inherit;
      transition: all 0.2s ease;
    }

    input:focus, select:focus {
      border-color: #6366f1;
      outline: none;
      box-shadow: 0 0 0 2px #6366f155;
    }

    .full-width {
      grid-column: span 2;
    }

    .phone-group {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .country-code {
      background: #f3f4f6;
      border: 1px solid #d1d5db;
      padding: 0.9rem 1.2rem;
      border-radius: 10px;
      font-weight: 600;
      color: #374151;
      pointer-events: none;
    }

    .error {
      font-size: 0.8rem;
      color: #dc2626;
      margin-top: -0.3rem;
    }

    /* ====== PAYMENT ====== */
    .payment-method {
      grid-column: span 2;
      margin-top: 1rem;
    }

    .payment-method select {
      appearance: none;
      background: var(--input-bg, #fff)
        url('data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNjM2NmYxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTUgOGw1IDUgNS01eiIvPjwvc3ZnPg==')
        no-repeat right 1rem center;
      background-size: 14px;
      padding-right: 2.5rem;
    }

    /* ====== BUTTONS ====== */
    .buttons {
      grid-column: span 2;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    button {
      padding: 0.9rem 1.6rem;
      border-radius: 40px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .return {
      background: #f3f4f6;
      color: #111827;
      border: 1px solid #e5e7eb;
    }

    .return:hover {
      background: #e5e7eb;
    }

    .continue {
      background: #6366f1;
      color: white;
      box-shadow: 0 3px 8px rgba(99, 102, 241, 0.3);
    }

    .continue:hover {
      background: #4f46e5;
    }

    /* ====== SUMMARY SECTION ====== */
    .summary-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .product {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .product img {
      width: 60px;
      height: 60px;
      border-radius: 10px;
      object-fit: cover;
    }

    .summary-total {
      font-weight: 700;
      border-top: 1px solid #e5e7eb;
      margin-top: 1rem;
      padding-top: 1rem;
    }

    /* ====== DARK MODE ====== */
    :host([dark]) {
      --bg-color: #111827;
      --text-color: #f9fafb;
      --form-bg: #1f2937;
      --summary-bg: #111827;
      --input-bg: #374151;
      --country-code-bg: #4b5563; /* slightly darker grey */
      --country-code-color: #9ca3af; /* grey text */
    }

    /* ====== RESPONSIVE ====== */
    @media (max-width: 900px) {
      .checkout-container {
        flex-direction: column;
        height: auto;
        width: 100%;
        overflow-x: hidden; /* ✅ Prevents any horizontal scroll */
      }

      .summary-section {
        order: -1;
        border-left: none;
        border-bottom: 1px solid #e5e7eb;
        padding: 1.5rem;
      }

      .form-section {
        padding: 1.5rem;
        overflow-x: hidden; /* ✅ Prevents field overflow horizontally */
      }

      /* 🔹 Stack fields vertically on mobile */
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        // overflow: hidden; /* ✅ Ensure no child overflows container */
      }

      /* 🔹 Make sure all form inputs fit within viewport width */
      form > div,
      input,
      select,
      .phone-group {
        width: 100% !important;
        box-sizing: border-box;
        max-width: 100%;
      }

      .input-row {
        flex-direction: column;
        gap: 0.8rem;
      }

      .phone-group {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        width: 100%;
        overflow: hidden;
      }

      .country-code {
        flex-shrink: 0;
       color: var(--country-code-color, #374151); /* fallback for light mode */
  background: var(--country-code-bg, #f3f4f6); /* fallback for light mode */


      }

      /* Buttons stacked neatly */
      .buttons {
        flex-direction: column;
        align-items: stretch;
        gap: 0.8rem;
        margin-top: 1.5rem;
      }

      button {
        width: 100%;
        font-size: 1rem;
      }

      /* Keep summary items and headings clean */
      .summary-item,
      .summary-total {
        font-size: 0.9rem;
        word-wrap: break-word;
      }

      h2,
      h3 {
        font-size: 1.2rem;
      }

      .dark-toggle {
        top: 1rem;
        right: 1rem;
      }
    }


/* Wider screens stay two-column */
@media (min-width: 901px) {
  .checkout-container {
    flex-direction: row;
  }
  .summary-section {
    overflow-y: auto;
  }
  .form-section {
    overflow-y: auto;
  }
}

/* Large screens centered layout */
@media (min-width: 1400px) {
  .checkout-container {
    // max-width: 1200px;
    margin: 0 auto;
  }
}


  `;

  private toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.toggleAttribute('dark', this.darkMode);
  }

  private handleReturn() {
    console.log('🛒 Returning to cart...');
    this.dispatchEvent(new CustomEvent('checkout-return', { bubbles: true, composed: true }));
  }

  private validate() {
    const errors: Record<string, string> = {};
    if (!this.email.match(/^[^@]+@[^@]+\.[^@]+$/)) errors.email = 'Invalid email';
    if (!this.firstName) errors.firstName = 'First name required';
    if (!this.lastName) errors.lastName = 'Last name required';
    if (!this.city) errors.city = 'City required';
    if (!this.address1) errors.address1 = 'Address required';
    if (!this.phone.match(/^[0-9]{10}$/)) errors.phone = 'Enter 10 digits only';
    if (this.paymentMethod === 'card') {
      if (!this.cardNumber.match(/^\d{16}$/)) errors.cardNumber = 'Invalid card number';
      if (!this.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) errors.expiry = 'Expiry MM/YY';
      if (!this.cvv.match(/^\d{3}$/)) errors.cvv = 'Invalid CVV';
    }
    this.errors = errors;
    return Object.keys(errors).length === 0;
  }

  private handleContinue() {
    if (!this.validate()) return;
    const detail = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      city: this.city,
      postal: this.postal,
      address1: this.address1,
      streetAddress: this.streetAddress,
      phone: '+92' + this.phone,
      paymentMethod: this.paymentMethod,
      ...(this.paymentMethod === 'card'
        ? { cardNumber: this.cardNumber, expiry: this.expiry, cvv: this.cvv }
        : {}),
      items: this.items,
      total: this.computedTotal
    };
    console.log('✅ Proceeding to confirmation...', detail);
    this.dispatchEvent(new CustomEvent('checkout-continue', { detail, bubbles: true, composed: true }));
  }

  private get computedTotal() {
    const sum = this.items.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
    return this.total || sum;
  }

  render() {
    return html`
      <div class="dark-toggle">
        <button @click=${this.toggleDarkMode}>${this.darkMode ? '☀️' : '🌙'}</button>
      </div>

      <div class="checkout-container">
        <!-- LEFT: FORM -->
        <div class="form-section">
          <h2>Shipping Information</h2>

          <form @submit=${(e: Event) => e.preventDefault()}>
            ${this.renderInput('Email Address', 'email', true)}
            ${this.renderInput('First Name', 'firstName')}
            ${this.renderInput('Last Name', 'lastName')}
            ${this.renderInput('City', 'city')}
            ${this.renderInput('Postal Code', 'postal')}
            <div class="full-width">${this.renderInput('Address Line 1', 'address1')}</div>
            <div class="full-width">${this.renderInput('Street Address', 'streetAddress')}</div>

            <div class="full-width">
              <label>Phone Number</label>
              <div class="phone-group">
                <div class="country-code">+92</div>
                <input
                  type="text"
                  maxlength="10"
                  placeholder="Enter 10 digits"
                  .value=${this.phone}
                  @input=${(e: any) => (this.phone = e.target.value.replace(/[^0-9]/g, ''))}
                />
              </div>
              ${this.errors.phone ? html`<div class="error">${this.errors.phone}</div>` : ''}
            </div>

            <div class="payment-method">
              <label>Payment Method</label>
              <select @change=${(e: any) => (this.paymentMethod = e.target.value)} disabled>
                <option value="cod" ?selected=${this.paymentMethod === 'cod'}>💵 Cash on Delivery</option>
                <option value="card" ?selected=${this.paymentMethod === 'card'}>💳 Card Payment</option>
              </select>
            </div>

            ${this.paymentMethod === 'card'
        ? html`
                  <div class="full-width">${this.renderInput('Card Number (16 digits)', 'cardNumber')}</div>
                  ${this.renderInput('Expiry (MM/YY)', 'expiry')}
                  ${this.renderInput('CVV (3 digits)', 'cvv')}
                `
        : ''}

            <div class="buttons">
              <button type="button" class="return" @click=${this.handleReturn}>← Return to Cart</button>
              <button type="button" class="continue" @click=${this.handleContinue}>Continue →</button>
            </div>
          </form>
        </div>

        <!-- RIGHT: SUMMARY -->
        <div class="summary-section">
          <h3>Order Summary</h3>
          ${this.items.map(
          (item) => html`
              <div class="summary-item product">
                <img src=${item.image || 'https://via.placeholder.com/60'} alt=${item.name} />
                <div>
                  <p>${item.name}</p>
                  <small>Qty: ${item.quantity || 1}</small>
                </div>
                <p>$${item.price}</p>
              </div>
            `
        )}
          <hr />
          <div class="summary-item"><span>Subtotal</span><span>$${this.computedTotal}</span></div>
          <div class="summary-item"><span>Shipping</span><span>$10</span></div>
          <div class="summary-total"><span>Total</span><span>$${this.computedTotal + 10}</span></div>
        </div>
      </div>
    `;
  }

  private renderInput(label: string, field: keyof CheckoutForm, fullWidth = false) {
    return html`
      <div class=${fullWidth ? 'full-width' : ''}>
        <label>${label}</label>
        <input
          placeholder=${label}
          .value=${(this as any)[field] || ''}
          @input=${(e: any) => ((this as any)[field] = e.target.value)}
        />
        ${this.errors[field] ? html`<div class="error">${this.errors[field]}</div>` : ''}
      </div>
    `;
  }
}
