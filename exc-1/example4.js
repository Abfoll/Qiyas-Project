function OuterFunction() {
    let number = 0;
    console.log("This is the outer function.");

    return function InnerFunction() {
        number++;
        console.log("This is the inner function.", "Number:", number);
    };
}

const innerFunc = OuterFunction();
innerFunc();
innerFunc();
innerFunc();
