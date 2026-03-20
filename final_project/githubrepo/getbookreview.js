// Import the books object from the route folder
const books = require('../router/booksdbs.js');

// Function to display all books with their initial reviews
function getBooksForInitialReview() {
    console.log("Books and their initial reviews:\n");

    Object.keys(books).forEach(id => {
        const book = books[id];
        console.log(`ID: ${id}`);
        console.log(`Title: "${book.title}"`);
        console.log(`Author: ${book.author}`);
        console.log(`Reviews: ${JSON.stringify(book.reviews, null, 2)}\n`);
    });
}

// Call the function
getBooksForInitialReview();

/*
Example Output:

Books and their initial reviews:

ID: 1
Title: "Things Fall Apart"
Author: Chinua Achebe
Reviews: {}

ID: 2
Title: "Fairy tales"
Author: Hans Christian Andersen
Reviews: {}

ID: 3
Title: "The Divine Comedy"
Author: Dante Alighieri
Reviews: {}

... and so on for all 10 books
*/