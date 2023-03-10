const sum = (a: number, b: number): number => {
    return a + b;
}

const getHello = (name: string, surname: string): string => {
    return `Hello! ${name} ${surname}`;
}

const formatPrice = (price: number, currency: string): string => {
    return price.toFixed(2) + currency
}

console.log(sum(2, 3));
console.log(getHello('xyz', 'zyx'));
console.log(formatPrice(300, 'zł'));

enum Gender {
    Female = 'female',
    Male = 'male'
}

interface Kitty {
    name: string;
    gender: Gender;
    age: 'Unknown' | number;
    isAdopted: boolean;
    specialNeeds?: string[]
}

const kitties: Kitty[] = [
    {
        name: 'Mruczek',
        gender: Gender.Male,
        age: 3,
        isAdopted: true,
        specialNeeds: ['Drinks only water'],
    },
    {
        name: 'Simon',
        gender: Gender.Male,
        age: 'Unknown',
        isAdopted: false,
    },
    {
        name: 'Łatka',
        gender: Gender.Female,
        age: 4,
        isAdopted: true,
    },
];

