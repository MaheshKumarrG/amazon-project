import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { renderPayment } from "./paymentSummary.js";

export function renderCheckout(){

  let onWeb = "";

  cart.forEach((item) => {
    const matchingItem = products.find((product) => product.id === item.productId);
    if (!matchingItem) return;

    const deliveryID = item.deliveryOptionId;
    const matchingDelivery = deliveryOptions.find((option) => option.id === deliveryID);

    const today = dayjs();
    const DeliveryDate = today.add(matchingDelivery?.days || 0, "days");
    const formatDate = DeliveryDate.format("dddd, MMMM D");

    const html = `
      <div class="cart-item-container js-cart-container-${matchingItem.id}">
        <div class="delivery-date">Delivery date: ${formatDate}</div>
        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingItem.image}">
          <div class="cart-item-details">
            <div class="product-name">${matchingItem.name}</div>
            <div class="product-price">$${(matchingItem.priceCents / 100).toFixed(2)}</div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label">${item.Quantity}</span></span>
              <span class="update-quantity-link link-primary js-update-links" data-product-id="${matchingItem.id}">Update</span>
              <input class="quantity-input update-item">
              <span class="save-quantity-link link-primary update-item">Save</span>
              <span class="delete-quantity-link link-primary js-delete-links" data-product-id="${matchingItem.id}">Delete</span>
            </div>
          </div>
          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${Delivery(matchingItem, item)}
          </div>
        </div>
      </div>
    `;
    onWeb += html;
  });

  function Delivery(matchingItem, item) {
    return deliveryOptions
      .map((option) => {
        const today = dayjs();
        const DeliveryDate = today.add(option.days, "days");
        const formatDate = DeliveryDate.format("dddd, MMMM D");

        const price = option.priceCents === 0 ? "FREE" : `$${(option.priceCents / 100).toFixed(2)}`;

        const isChecked = option.id === item.deliveryOptionId;

        return ` 
          <div class="delivery-option js-delivery-option" data-product-id="${matchingItem.id}" data-delivery-option-id="${option.id}">
            <input type="radio" ${isChecked ? "checked" : ""} class="delivery-option-input" name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">${formatDate}</div>
              <div class="delivery-option-price">${price} - Shipping</div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  document.querySelector(".js-order-summary").innerHTML = onWeb;

  document.querySelectorAll(".js-update-links").forEach((link) => {
    const productId = link.dataset.productId;
    link.addEventListener("click", () => {
      const container = document.querySelector(`.js-cart-container-${productId}`);
      if (container) container.classList.add("is-editing-quantity");
      console.log(productId);
    });
  });

  document.querySelectorAll(".js-delete-links").forEach((link) => {
    const productId = link.dataset.productId;
    link.addEventListener("click", () => {
      removeFromCart(productId);
      renderCheckout();
      renderPayment();
    });
  });

  let cartQuantity = cart.reduce((sum, item) => sum + item.Quantity, 0);
  document.querySelector(".js-total-items").innerHTML = `Checkout (${cartQuantity})`;

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderCheckout();
      renderPayment();
    });
  });
}

