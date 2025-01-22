import {cart} from "../../data/cart.js";
import { getDelivery } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";


export function renderPayment(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((item)=>{
        let product = getProduct(item.productId);
        productPriceCents += product.priceCents * item.Quantity;

        let deliveryOption = getDelivery(item.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    let totalbeforeTax = productPriceCents + shippingPriceCents;
    let taxCents = totalbeforeTax * 0.1;
    let totalCents = totalbeforeTax + taxCents;

    let cartQuantity = cart.reduce((sum, item) => sum + item.Quantity, 0);

    let paymentSummary = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div class="js-total-items">Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${productPriceCents / 100}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${shippingPriceCents / 100}</div>
        </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalbeforeTax / 100}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(taxCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(totalCents/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
    `;

    document.querySelector('.js-payment-summary')
        .innerHTML = paymentSummary;

    document.querySelector('.js-place-order')
        .addEventListener('click',async()=>{
          const response = await fetch('https://supersimplebackend.dev/orders',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              cart:cart
            })
          })
          const order = await response.json();
          console.log(order);
        });
}

