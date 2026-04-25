function greetUser(name,callback) {
    console.log("Hello" + name);
    callback();
}

function showWelcomeMessage() {
    console.log("Welcome to the website!");
}

greetUser("Alice", showWelcomeMessage);

greetUser("Alice", () => {
    console.log("Callback executed!");
});AB Marshal Boot Camp Class.rar

function multiply(a, b, callback) {
    const result = a * b;
    callback(result);
}

multiply(2, 3, (result) => {
    console.log("The result is: " + result);
});


function sum (x,y,callback){
    const result = x + y;
    callback(result);
}

sum(5,10, (result) => {
    console.log("The sum is: " + result);
});


function B(callback){
    console.log("This is function B");
    setTimeout(() => {
    callback();
    }, 2000);   
}

console.log("Hello from B after setTimeout");

B(A);

function A(){
    console.log("This is function A");
}   
