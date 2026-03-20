// Import required modules
const { users, authenticatedUser } = require('../router/auth_user.js');
const jwt = require('jsonwebtoken');

// Function to login a registered user
function loginUser(username, password) {
    if (!username || !password) {
        console.log("Username and password are required to login.");
        return;
    }

    if (!authenticatedUser(username, password)) {
        console.log("Login failed: Invalid username or password.");
        return;
    }

    // Generate JWT token
    const token = jwt.sign({ username }, "access", { expiresIn: "1h" });

    console.log(`Login successful! Welcome back, ${username}.`);
    console.log(`Your access token: ${token}`);
}

// Example usage:
// Make sure this user exists in users array
loginUser("souravKumar", "12345");

/*
Expected Output:

Login successful! Welcome back, souravKumar.
Your access token: <jwt_token_here>
*/