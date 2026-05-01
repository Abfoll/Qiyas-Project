const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'books.json');

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dataFile)) {
    const seedBooks = [
      { id: 1, title: 'The Silent Library', author: 'Maya Hart', category: 'Fiction', quantity: 8 },
      { id: 2, title: 'Node.js Essentials', author: 'Avery Stone', category: 'Technology', quantity: 5 },
      { id: 3, title: 'Designing Calm Spaces', author: 'Rina Patel', category: 'Design', quantity: 3 }
    ];

    fs.writeFileSync(dataFile, JSON.stringify(seedBooks, null, 2));
  }
}

function readBooks() {
  ensureDataFile();
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

function writeBooks(books) {
  fs.writeFileSync(dataFile, JSON.stringify(books, null, 2));
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function sendText(res, statusCode, text, contentType = 'text/plain; charset=utf-8') {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.end(text);
}

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const map = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg'
  };

  return map[extension] || 'application/octet-stream';
}

function serveStaticFile(res, filePath) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      sendText(res, 404, 'Page not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': getContentType(filePath) });
    res.end(content);
  });
}

function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('Invalid JSON payload'));
      }
    });

    req.on('error', reject);
  });
}

function validateBookPayload(payload) {
  const title = String(payload.title || '').trim();
  const author = String(payload.author || '').trim();
  const category = String(payload.category || '').trim();
  const quantity = Number(payload.quantity);

  if (!title || !author || !category || !Number.isInteger(quantity) || quantity < 0) {
    return null;
  }

  return { title, author, category, quantity };
}

async function handleBooksApi(req, res, pathname) {
  const books = readBooks();

  if (req.method === 'GET' && pathname === '/api/books') {
    sendJson(res, 200, books);
    return;
  }

  if (req.method === 'POST' && pathname === '/api/books') {
    try {
      const payload = await parseRequestBody(req);
      const book = validateBookPayload(payload);

      if (!book) {
        sendJson(res, 400, { message: 'Please provide title, author, category, and a non-negative whole number quantity.' });
        return;
      }

      const nextId = books.length ? Math.max(...books.map((item) => item.id)) + 1 : 1;
      const newBook = { id: nextId, ...book };
      books.push(newBook);
      writeBooks(books);
      sendJson(res, 201, newBook);
    } catch (error) {
      sendJson(res, 400, { message: error.message });
    }
    return;
  }

  const match = pathname.match(/^\/api\/books\/(\d+)$/);
  if (!match) {
    sendJson(res, 404, { message: 'Not found' });
    return;
  }

  const bookId = Number(match[1]);
  const bookIndex = books.findIndex((item) => item.id === bookId);

  if (bookIndex === -1) {
    sendJson(res, 404, { message: 'Book not found' });
    return;
  }

  if (req.method === 'PUT') {
    try {
      const payload = await parseRequestBody(req);
      const book = validateBookPayload(payload);

      if (!book) {
        sendJson(res, 400, { message: 'Please provide title, author, category, and a non-negative whole number quantity.' });
        return;
      }

      books[bookIndex] = { id: bookId, ...book };
      writeBooks(books);
      sendJson(res, 200, books[bookIndex]);
    } catch (error) {
      sendJson(res, 400, { message: error.message });
    }
    return;
  }

  if (req.method === 'DELETE') {
    const deletedBook = books.splice(bookIndex, 1)[0];
    writeBooks(books);
    sendJson(res, 200, deletedBook);
    return;
  }

  sendJson(res, 405, { message: 'Method not allowed' });
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = requestUrl;

  if (pathname.startsWith('/api/books')) {
    await handleBooksApi(req, res, pathname);
    return;
  }

  if (pathname === '/' || pathname === '/index.html') {
    serveStaticFile(res, path.join(publicDir, 'index.html'));
    return;
  }

  if (pathname === '/features.html') {
    serveStaticFile(res, path.join(publicDir, 'features.html'));
    return;
  }

  if (pathname === '/about.html') {
    serveStaticFile(res, path.join(publicDir, 'about.html'));
    return;
  }

  if (pathname === '/contact.html') {
    serveStaticFile(res, path.join(publicDir, 'contact.html'));
    return;
  }

  if (pathname === '/styles.css' || pathname === '/app.js') {
    serveStaticFile(res, path.join(publicDir, pathname.slice(1)));
    return;
  }

  sendText(res, 404, 'Page not found');
});

ensureDataFile();

server.listen(port, () => {
  console.log(`Library Book Management System running at http://localhost:${port}`);
});