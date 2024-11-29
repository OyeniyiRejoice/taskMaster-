
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const {loginRoute, registerRoute} = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

dotenv.config();

const app = express();


app.use(cors({
    origin: ['https://taskmaster-deploy-hotr.vercel.app/', 'http://127.0.0.1:5500'], 
    
}));


app.use(express.json());

// Connect to MongoDB 
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a root route
app.get('/', (req, res) => {
    res.send('Welcome to the API!'); 
});


// Use routes
app.use('/', loginRoute);
app.use('/', registerRoute)
app.use('/tasks', taskRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
/*app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});