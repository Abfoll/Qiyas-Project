async function ASI(params) {
    console.log("This is a function without await");
    // return 3;
    throw new Error("This is an error");
}
ASI()
.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log("Error:", err.message);
});         