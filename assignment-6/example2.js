const http = require('http');

const server = http.createServer((req, res) => {
    const student = {  // ← Move INSIDE the handler
        name: 'John Doe',
        age: 20,
        grade: 'A'
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(student));  // ← Now inside the handler
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});


// const http = require('http');

// const student = {  // ← Keep outside if multiple handlers need it
//     name: 'John Doe',
//     age: 20,
//     grade: 'A'
// };

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify(student));  // ← Reference the external variable
// });

// server.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });