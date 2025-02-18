import { cart, addToCart } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";

loadProducts(renderHomePage);


function renderHomePage(){
    let htmlCombined = '';

    products.forEach((product,index) => {
      htmlCombined += `<div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
              <select class="js-qSelector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraHtml()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-addMsg-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-addCart-btn"
              data-get-productId = "${product.id}"
            >
              Add to Cart
            </button>
          </div>`
    })

    let onWebPage = document.querySelector('.js-display-products');
    onWebPage.innerHTML = htmlCombined;

    document.querySelectorAll('.js-addCart-btn')
      .forEach((Button)=>{
        Button.addEventListener('click',()=>{
          console.log(Button.dataset);
          let productId = Button.dataset.getProductid;
              
          addToCart(productId);            
          showQuantity(productId);            
        })
      })


    function showQuantity(productId){
    let cartOuantity = 0;
    cart.forEach((item)=>{
      cartOuantity += item.Quantity;
    })
    document.querySelector('.js-cart-quantity')
      .innerHTML = cartOuantity;
    }
}