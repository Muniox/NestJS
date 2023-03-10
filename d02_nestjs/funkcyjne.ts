interface Product {
    name: string;
    price: number;
    count: number;
}

function addProduct(currentBasket: Product[], name: string, price: number, count =1) {
    return [
        ...currentBasket,
        {
            name,
            price,
            count
        },
    ];
}

function itemNames(basket: Product[]) {
    return basket.map(item => item.name);
}

function priceSum(basket: Product[]) {
    return basket.reduce((prev, curr) => prev + curr.price * curr.count, 0);
}

const basket = [];
const basketWithBread = addProduct(basket, 'bread', 2.5);
const basketWithBreadAndCucumber = addProduct(basketWithBread, 'cucumber', 4, 5);
console.log(basketWithBreadAndCucumber);
console.log(priceSum(basketWithBreadAndCucumber));