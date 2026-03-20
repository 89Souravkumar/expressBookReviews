// Import users array from auth_user module
const { users } = require('../router/auth_user.js');

// Function to register a new user
function registerUser(username, password) {
    if (!username || !password) {
        console.log("Username and password are required to register.");
        return;
    }

    // Trim username and password
    const usernameClean = username.trim();
    const passwordClean = password.trim();

    if (!usernameClean || !passwordClean) {
        console.log("Username and password cannot be empty or just spaces.");
        return;
    }

    // Check if username already exists
    const userExists = users.some(user => user.username === usernameClean);
    if (userExists) {
        console.log(`Registration failed: Username "${usernameClean}" is already taken.`);
        return;
    }

    // Add new user
    users.push({ username: usernameClean, password: passwordClean });

    // Confirmation message
    console.log(`Registration successful! Welcome, ${usernameClean}.`);
}

// Example usage:
registerUser("souravKumar", "12345");

/*
Expected Output:
Registration successful! Welcome, souravKumar.
*/