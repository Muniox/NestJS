//obiektowo
interface Product {
    name: string;
    price: number;
    count: number;
}

class Basket {
    items: Product[];

    constructor() {
        this.items = []
    }

    add(name: string, price: number, count = 1):void {
        this.items.push({
            name,
            price,
            count
        })
    }

    names() {
        return this.items.map(item => item.name);
    }

    sum():number {
        return this.items.reduce((prev, curr) => prev + curr.price * curr.count, 0);
    }
}

const basket = new Basket();
basket.add('bread', 2.5);
basket.add('cucumber', 4, 5);

console.log(basket.names());
console.log(basket.sum());