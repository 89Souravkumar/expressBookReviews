const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios'); // npm install axios

public_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const usernameClean = username.trim();
    const passwordClean = password.trim();

    if (!usernameClean || !passwordClean) {
        return res.status(400).json({ message: "Username and password cannot be empty or just spaces" });
    }

    // Check if user already exists
    if (users.some(user => user.username === usernameClean)) {
        return res.status(409).json({ message: `Registration failed: Username "${usernameClean}" already exists` });
    }

    // Add new user
    users.push({ username: usernameClean, password: passwordClean });

    // Success response
    return res.status(200).json({ message: `Registration successful! Welcome, ${usernameClean}.` });
});

// Simulate async fetch of books
const getBooksAsync = () => {
    const books = require('./booksdb.js');
    return new Promise((resolve, reject) => {
        if (books) resolve(books);
        else reject("No books found");
    });
};

// -------------------- Callback example --------------------
// Get all books using callback
function getBooksCallback(callback) {
    getBooksAsync()
        .then(books => callback(null, books))
        .catch(err => callback(err, null));
}

public_users.get('/callback/books', (req, res) => {
    getBooksCallback((err, books) => {
        if (err) return res.status(500).json({ message: err });
        return res.status(200).json(books);
    });
});

// -------------------- Promise example --------------------
// Get book by ISBN using Promise
function getBookByISBN(isbn) {
    return getBooksAsync().then(books => {
        if (books[isbn]) return books[isbn];
        throw `Book with ISBN ${isbn} not found`;
    });
}

public_users.get('/promise/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    getBookByISBN(isbn)
        .then(book => res.status(200).json(book))
        .catch(err => res.status(404).json({ message: err }));
});

// -------------------- Async/Await example --------------------
// Get books by author
async function getBooksByAuthor(author) {
    const books = await getBooksAsync();
    const filteredBooks = Object.keys(books)
        .filter(id => books[id].author.toLowerCase() === author.toLowerCase())
        .map(id => ({ isbn: id, ...books[id] }));
    return filteredBooks;
}

public_users.get('/async/author/:author', async (req, res) => {
    try {
        const author = req.params.author;
        const booksByAuthor = await getBooksByAuthor(author);
        if (booksByAuthor.length === 0) throw `No books found by author "${author}"`;
        return res.status(200).json(booksByAuthor);
    } catch (err) {
        return res.status(404).json({ message: err });
    }
});

public_users.get('/title/:title', (req, res) => {
    const titleQuery = req.params.title.toLowerCase(); // Convert to lowercase for case-insensitive search
    const books = require('./booksdb.js'); // Import books

    // Filter books whose title includes the search string
    const filteredBooks = Object.keys(books)
        .filter(id => books[id].title.toLowerCase().includes(titleQuery))
        .map(id => ({ isbn: id, ...books[id] }));

    if (filteredBooks.length === 0) {
        return res.status(404).json({ message: `No books found with title containing "${req.params.title}"` });
    }

    return res.status(200).json(filteredBooks);
});
  

// -------------------- Get book review (async/await) --------------------
public_users.get('/async/review/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const books = await getBooksAsync();
        if (!books[isbn]) throw `Book with ISBN ${isbn} not found`;
        return res.status(200).json({ reviews: books[isbn].reviews });
    } catch (err) {
        return res.status(404).json({ message: err });
    }
});



module.exports.general = public_users;
