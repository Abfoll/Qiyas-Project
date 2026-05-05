export const logingMiddleware = (request, response, next) => {
    //response.send({send("Hello from middleware" )});
    console.log("Login.....");
    next();
}

export const sessionMiddleware = (request, response, next) => {
    console.log("Session.....");
    next();
}   


// export const authMiddleware = (request, response, next) => {
//     console.log("Auth.....");
//     next();
// }   

// export const errorMiddleware = (error, request, response, next) => {
//     console.log("Error.....");
//     response.status(500).send({message: "Internal Server Error"});
// }   

// export const notFoundMiddleware = (request, response, next) => {
//     console.log("Not Found.....");
//     response.status(404).send({message: "Not Found"});
// }   

// export const validationMiddleware = (request, response, next) => {
//     console.log("Validation.....");
//     next();
// }   


// export const requestTimeMiddleware = (request, response, next) => {         
//     request.requestTime = Date.now();
//     console.log("Request Time.....");
//     next();
// }   

// export const responseTimeMiddleware = (request, response, next) => {
//     const start = Date.now();
//     response.on("finish", () => {
//         const duration = Date.now() - start;
//         console.log(`Response Time: ${duration}ms`);
//     });
//     next();
// }   


