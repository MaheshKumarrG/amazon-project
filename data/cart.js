export let cart;
loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem("cart"));
  if(!cart){
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        Quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        Quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem = cart.find((item) => item.productId === productId);

  const selectElem = document.querySelector(`.js-qSelector-${productId}`);
  if (!selectElem) {
    console.error("Quantity selector not found");
    return;
  }
  const quantity = Number(selectElem.value);

  const msgElem = document.querySelector(`.js-addMsg-${productId}`);
  if (msgElem) {
    msgElem.classList.add("js-added");
    setTimeout(() => {
      msgElem.classList.remove("js-added");
    }, 2000);
  }

  if (matchingItem) matchingItem.Quantity += quantity;
  else {
    cart.push({
      productId: productId,
      Quantity: quantity,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const matchingItem = cart.find((item) => item.productId === productId);
  if (matchingItem) {
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
}
