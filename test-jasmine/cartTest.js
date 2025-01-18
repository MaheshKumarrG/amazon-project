import {addToCart, cart, loadFromStorage} from '../data/cart.js'

describe('test suite:addToCart',()=>{
    it('Adds an existing product to cart',()=>{

    });

    it('adds new product to cart',()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });

        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
    });
});