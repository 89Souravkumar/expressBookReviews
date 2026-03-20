// Import the books object from route folder
const books = require('../router/booksdbs.js');

// Function to get books by title
function getBooksByTitle(titleName) {
    const result = Object.keys(books).filter(id => {
        return books[id].title.toLowerCase().includes(titleName.toLowerCase());
    });

    if (result.length > 0) {
        console.log(`Books matching "${titleName}":`);
        result.forEach(id => {
            console.log(`ID: ${id}, Title: "${books[id].title}", Author: ${books[id].author}`);
        });
    } else {
        console.log(`No books found with title: ${titleName}`);
    }
}

// Get title from command line
const title = process.argv[2];

// Check if title is provided
if (!title) {
    console.log("Please provide a title.");
} else {
    getBooksByTitle(title);
}


/*
Example Run:
node scripts/getBooksByTitle.js "Pride"

Output:
Books matching "Pride":
ID: 8, Title: "Pride and Prejudice", Author: Jane Austen
*/