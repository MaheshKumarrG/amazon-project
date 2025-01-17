function toDollars(cents){
    return (Math.round(cents) / 100).toFixed(2);
}

describe('test suite:FormatCurrency',()=>{
   it('converts cents to dollars',() =>{
       expect(toDollars(2095)).toEqual('20.95');
   });

   it('works with 0',()=>{
    expect(toDollars(0)).toEqual('0.00');
   });

   it('rounds up to the nearest cent',()=>{
    expect(toDollars(2000.5)).toEqual('20.01');
   })
});