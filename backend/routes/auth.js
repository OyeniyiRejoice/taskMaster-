const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const loginRoute = express.Router();
const registerRoute = express.Router();

// Register
registerRoute.post('/register', [
    body('firstname').notEmpty().withMessage('First name is required.'),
    body('lastname').notEmpty().withMessage('Last name is required.'),
    body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 

    const { firstname, lastname, username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser  = await User.findOne({ username });
        if (existingUser ) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({ firstName: firstname, lastName: lastname, username, passwordHash });
        await user.save();
        console.log("new user", user)

        res.status(201).json({ message: 'User  registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
        console.log("error", error)
    }
});

// Login
loginRoute.post('/login', [
    body('username').notEmpty().withMessage('Username is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, username: user.username, firstname: user.firstname, lastname: user.lastname } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = {loginRoute, registerRoute};