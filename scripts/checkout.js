import {renderCheckout} from "./checkout/orderSummary.js";
import {renderPayment} from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
// import '../data/cart-class.js'
// import '../data/backend.js'
loadProducts(()=>{
    renderPayment();
    renderCheckout();
});


