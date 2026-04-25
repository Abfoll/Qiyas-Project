function getNumber(number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (number % 2 === 0) {
                resolve(number);
            } else {
                reject(new Error("Number must be even"));
            }
        }, 3000);
    });
}

getNumber(2)
    .then(num => {
        console.log("step 1:", num);
        return getNumber(4)
    }).then(num => {
        console.log("step 2:", num);
        return getNumber(6);
    }).then(num => {
        console.log("step 3:", num);
        return getNumber(8);    
    }).then(num => {
        console.log("step 4:", num);
        return getNumber(10);
    }).then(num => {
        console.log("step 5:", num);
        return getNumber(3);
    })
    .catch(err => {
        console.error("Error:", err.message);
    }); 