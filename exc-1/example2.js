function f1() {
    console.log("outer function");
    function f2() {
        console.log("inner function");
    }
    return f2;
}
const x = f1();
x();
  