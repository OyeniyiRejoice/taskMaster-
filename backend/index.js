
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

dotenv.config();

const app = express();
/*
// Custom CORS options
const corsOptions = {
    origin: ['https://taskmaster-deploy-hotr.vercel.app/', 'https://taskmaster-deploy-hotr-hmywmdy6h.vercel.app/'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    exposedHeaders: ['Content-Length', 'X-Knowledge-Base'], // Exposed headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    maxAge: 3600, // Cache preflight response for 1 hour
};
app.use(cors(corsOptions));*/


app.use(cors({
    origin: 'https://taskmaster-deploy-hotr.vercel.app/', 
}));

app.use(express.json());

// Connect to MongoDB 
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a root route
app.get('/', (req, res) => {
    res.send('Welcome to the API!'); // or any message you want
});


// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
/*app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});