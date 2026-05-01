# Library Book Management System

A responsive library book management project built with HTML, CSS, and Node.js.

## Overview

This project helps a library manage its books with a clean multi-page interface and a small Node.js server for book data.

## Pages

- Book List Page
- Features Page
- About Us Page
- Contact Us Page

## Features

- Add a new book
- View all books
- Update book details
- Delete a book
- Search books by title, author, or category

## Book Fields

- Title
- Author
- Category
- Quantity

## Technology Used

- HTML
- CSS
- Node.js

## Project Structure

- server.js - Node.js HTTP server and book API
- package.json - project metadata and start script
- data/books.json - book storage file
- public/index.html - book list page
- public/features.html - features page
- public/about.html - about page
- public/contact.html - contact page
- public/styles.css - shared styling
- public/app.js - frontend logic for book CRUD

## How to Run

1. Open a terminal in the project folder.
2. Start the server with:

   npm start

3. Open the app in your browser at:

   http://localhost:3000

## API Endpoints

- GET /api/books - get all books
- POST /api/books - add a book
- PUT /api/books/:id - update a book
- DELETE /api/books/:id - delete a book

## Notes

- The project uses a local JSON file for persistence.
- The layout is responsive for mobile, tablet, and desktop screens.
- No external frontend framework is required.