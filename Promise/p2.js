const randomNumber = new Promise((resolve, reject) => {
    setTimeout(() => {
        const num = Math.random();
        if (num < 0.5) {
            resolve(num);
        } else {
            reject(new Error("Number is too high!"));
        }
    }, 2000);
});

randomNumber
    .then(num => {
        console.log("Resolved with number:", num);
    })
    .catch(err => {
        console.error("Rejected with error:", err.message);
    }); 