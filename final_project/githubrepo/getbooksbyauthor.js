// Import the books object
const books = require('../router/booksdbs.js');

// Function to get books by author
function getBooksByAuthor(authorName) {
    const result = Object.keys(books).filter(id => {
        return books[id].author.toLowerCase() === authorName.toLowerCase();
    });

    if (result.length > 0) {
        console.log(`Books by ${authorName}:`);
        result.forEach(id => {
            console.log(`ID: ${id}, Title: "${books[id].title}"`);
        });
    } else {
        console.log(`No books found by author: ${authorName}`);
    }
}

// Get author name from command line
const author = process.argv[2];

// Check if author is provided
if (!author) {
    console.log("Please provide an author name.");
} else {
    getBooksByAuthor(author);
}


/*
Example Run:
node getBooksByAuthor.js "Jane Austen"

Output:
Books by Jane Austen:
ID: 8, Title: "Pride and Prejudice"
*/