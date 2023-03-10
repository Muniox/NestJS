//imperatywne
interface Product {
    name: string;
    price: number;
    count: number;
}

const basket: Product[] = [];

basket.push({
    name: 'bread',
    count: 1,
    price: 2.5
});

basket.push({
    name: 'cucumber',
    count: 5,
    price: 4
});

const names: string[] = [];
let sum: number = 0;

for (let i = 0; i < basket.length; i++) {
    names.push(basket[i].name);
    sum += basket[i].price * basket[i].count;
}

console.log(names);
console.log(sum);