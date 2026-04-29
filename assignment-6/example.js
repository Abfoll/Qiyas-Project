const http = require('http');

const server = http.createServer((req, res) => {
    // Log the request information (now inside the handler)

    
    console.log('URL:', req.url);
    console.log('Method:', req.method);
    
    // Send only ONE response
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Qiyas Training');  // Only one res.end()
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});