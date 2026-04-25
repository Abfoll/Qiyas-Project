function getNumber(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value);
        }, 1000);   
    });
}

async function numberInfo() {
    try {
        const num1 = await getNumber(200);
        console.log("step 1:", num1);
        const num2 = await getNumber(300);
        console.log("step 2:", num2);
        const num3 = await getNumber(400);
        console.log("step 3:", num3);
        const num4 = await getNumber(500);
        console.log("step 4:", num4);
        const num5 = await getNumber(600);
        console.log("step 5:", num5);
    } catch (err) {
        console.error("Error:", err.message);
    }
}

numberInfo();    