// Import the books object from booksdbs.js
const books = require('../router/booksdbs.js');

// Function to get all books as an array
function getAllBooks() {
    return Object.keys(books).map(id => {
        return { id: id, ...books[id] };
    });
}

// Get the books array
const booksArray = getAllBooks();

// Display the books in the console
console.log("List of books:");
booksArray.forEach(book => {
    console.log(`ID: ${book.id}, Title: "${book.title}", Author: ${book.author}`);
});


/*
Expected Output:

List of books:
ID: 1, Title: "Things Fall Apart", Author: Chinua Achebe
ID: 2, Title: "Fairy tales", Author: Hans Christian Andersen
ID: 3, Title: "The Divine Comedy", Author: Dante Alighieri
ID: 4, Title: "The Epic Of Gilgamesh", Author: Unknown
ID: 5, Title: "The Book Of Job", Author: Unknown
ID: 6, Title: "One Thousand and One Nights", Author: Unknown
ID: 7, Title: "Njál's Saga", Author: Unknown
ID: 8, Title: "Pride and Prejudice", Author: Jane Austen
ID: 9, Title: "Le Père Goriot", Author: Honoré de Balzac
ID: 10, Title: "Molloy, Malone Dies, The Unnamable, the trilogy", Author: Samuel Beckett
*/