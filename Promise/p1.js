const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise resolved");
    }, 1000);
});

p1.then((message) => {
    console.log(message);
}).catch((error) => {
    console.error(error);
}); 

//callback + closure

// closure has to return another function