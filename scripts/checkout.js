import {renderCheckout} from "./checkout/orderSummary.js";
import {renderPayment} from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
// import '../data/cart-class.js'
// import '../data/backend.js'

async function load(){
    console.log("loading...");
    return 'value2'; //resolve(value2)
}
load().then((value)=>{  //value 2 has a parameter
    console.log('loaded!');
    console.log(value);
});


new Promise((resolve)=>{
    loadProducts(()=>{
        resolve();
    })
}).then(()=>{
    renderPayment();
    renderCheckout();
});

/*
loadProducts(()=>{
    
});
*/

