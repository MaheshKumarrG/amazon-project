class Cart{
    cartItems = undefined;
    localStorageKey = undefined;

    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.loadFromStorage(); 
    }

    loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
        if(!this.cartItems){
          this.cartItems = [
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

    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem = this.cartItems.find((item) => item.productId === productId);
      
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
          this.cartItems.push({
            productId: productId,
            Quantity: quantity,
            deliveryOptionId: "1",
          });
        }
        this.saveToStorage();
    }

    removeFromCart(productId) {
        this.cartItems = this.cartItems.filter((item) => item.productId !== productId);
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        const matchingItem = this.cartItems.find((item) => item.productId === productId);
        if (matchingItem) {
          matchingItem.deliveryOptionId = deliveryOptionId;
          this.saveToStorage();
        }
    }
}


let cart = new Cart('cart-oop');

console.log(cart);