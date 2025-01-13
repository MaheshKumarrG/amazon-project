export const deliveryOptions=[{
    id:'1',
    days:7,
    priceCents:0
},{
    id:'2',
    days:3,
    priceCents:499
},{
    id:'3',
    days:1,
    priceCents:999                                      
}];

export function getDelivery(deliveryOptionId){
    let deliveryOption;
    deliveryOptions.forEach((option)=>{
        if(option.id === deliveryOptionId){
            deliveryOption = option;
        }
    });
    return deliveryOption || deliveryOptions[0];
}