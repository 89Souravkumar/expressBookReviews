// Import the router modules
const { users, isValid } = require('../router/auth_user.js');
const books = require('../router/booksdb.js'); // books via router

// Function to delete a book review
function deleteReview(username, isbn) {
    // Validate input
    if (!username || !isbn) {
        console.log("Username and ISBN are required to delete a review.");
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

    // Check if the user has a review for this book
    if (!books[isbn].reviews[username]) {
        console.log(`No review found for user "${username}" on book "${books[isbn].title}".`);
        return;
    }

    // Delete the review
    delete books[isbn].reviews[username];

    // Display confirmation message and updated reviews
    console.log(`Review by "${username}" deleted successfully for book "${books[isbn].title}".`);
    console.log("Updated reviews:");
    console.log(JSON.stringify(books[isbn].reviews, null, 2));
}

// Example usage:
deleteReview("souravKumar", "1");

/*
Expected Output:

Review by "souravKumar" deleted successfully for book "Things Fall Apart".
Updated reviews:
{}
*/