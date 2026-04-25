function outerFunction() {
    let outerVariable = 'I am from the outer function';

    const outerNumber =2;

    function innerFunction() {
        console.log(outerVariable); // Accessing the outer variable
        console.log(outerNumber); // Accessing the outer number
        const inNumber =3;
        console.log(
            "inner function number is: " + inNumber,"this is outer number",outerNumber  
                       
        )
    }

    return innerFunction; // Returning the inner function
}

const myInnerFunction = outerFunction(); // Calling the outer function and getting the inner function
myInnerFunction(); // Calling the inner function to see the output      