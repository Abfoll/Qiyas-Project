// Higher Order Functions (HOF)

function F1() {
    const A = new Array(10).fill(0);

    return A;
}

const arr = F1();
console.log(arr);

function F2() {
    console.log("Function F2");
    F1();
}

function F3() {
    console.log("Function F3");
    F2();
}

F3();   

// used for memory utilization
