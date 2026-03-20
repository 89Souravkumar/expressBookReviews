// Import the books object
const books = require('../router/booksdbs.js');

// Function to get a book by ISBN (ID)
function getBookByISBN(isbn) {
    const book = books[isbn];

    if (book) {
        console.log(`Book found:`);
        console.log(`ID: ${isbn}, Title: "${book.title}", Author: ${book.author}`);
    } else {
        console.log(`No book found with ISBN: ${isbn}`);
    }
}

// گرفتن ISBN from command line argument
const isbn = process.argv[2];

// Check if ISBN is provided
if (!isbn) {
    console.log("Please provide an ISBN.");
} else {
    getBookByISBN(isbn);
}


/*
Example Run:
node getBookByISBN.js 3

Output:
Book found:
ID: 3, Title: "The Divine Comedy", Author: Dante Alighieri
*/