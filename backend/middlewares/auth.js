const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the user information to the request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token is not valid.' });
    }
};

module.exports = authMiddleware;