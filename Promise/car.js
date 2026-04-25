const car = {
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    // getCarInfo: function() {
    //     return `${this.year} ${this.make} ${this.model}`;
    // }
};

// console.log(car.getCarInfo());  

const objectKey = Object.keys(car);
console.log(objectKey);  // Output: ['make', 'model', 'year']

const objectValues = Object.values(car);
console.log(objectValues);  // Output: ['Toyota', 'Camry', 2020]

const objectEntries = Object.entries(car);
console.log(objectEntries);  
// Output: [['make', 'Toyota'], ['model', 'Camry'], ['year', 2020]]

const carInfo = Object.entries(car).map(([key, value]) => `${key}: ${value}`).join(', ');
console.log(carInfo);  
// Output: 'make: Toyota, model: Camry, year: 2020' 