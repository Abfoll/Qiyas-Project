import { middle } from './middle.js';

console.log(middle(2, 4)); // Should return 3
console.log(middle(2, 3)); // Should return null


export const sum = (a, b) => {
    return a + b;
}

export const product = (a, b) => {
    return a * b;
}

export const average = (a, b) => {
    return (a + b) / 2;
}

export const roundDown = (num) => {
    return Math.floor(num);
}

export const multiply = (num) => { 
    return num * 2;
}   

export const pi = 3.14159;