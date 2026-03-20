// Import books from route folder
let books = require('../router/booksdb.js');
let { isValid, users } = require('../router/auth_user.js');

// Function to add or update a book review
function addOrUpdateReview(username, isbn, review) {
    // Validate input
    if (!username || !isbn || !review) {
        console.log("Username, ISBN, and review are required.");
        return;
    }

    // Check if user exists
    if (!isValid(username)) {
        console.log(`User "${username}" is not registered.`);
        return;
    }

    // Check if book exists
    if (!books[isbn]) {
        console.log(`Book with ISBN ${isbn} not found.`);
        return;
    }

    // Add or update review
    books[isbn].reviews[username] = review;

    // Display confirmation message and updated reviews
    console.log(`Review added/updated successfully for book "${books[isbn].title}".`);
    console.log("Updated reviews:");
    console.log(JSON.stringify(books[isbn].reviews, null, 2));
}

// Example usage:
addOrUpdateReview("souravKumar", "1", "Amazing book, really enjoyed it!");

/*
Expected Output:

Review added/updated successfully for book "Things Fall Apart".
Updated reviews:
{
  "souravKumar": "Amazing book, really enjoyed it!"
}
*/