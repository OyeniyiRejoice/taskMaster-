const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const authMiddleware = require('../middlewares/auth'); // Assuming you have an auth middleware for JWT verification

const router = express.Router();

// Create a new task
router.post('/addPost', authMiddleware, [
    body('title').notEmpty().withMessage('Title is required.'),
    body('description').optional().isString(),
    body('deadline').optional().isISO8601().toDate(),
    body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high.'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, deadline, priority } = req.body;

    try {
        const task = new Task({
            userId: req.user.id, // Assuming user ID is available in req.user from auth middleware
            title,
            description,
            deadline,
            priority,
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Get all tasks for the authenticated user
router.get('/getPost', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Get a specific task by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Update a task by ID
router.put('/:id', authMiddleware, [
    body('title').optional().notEmpty().withMessage('Title cannot be empty.'),
    body('description').optional().isString(),
    body('deadline').optional().isISO8601().toDate(),
    body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high.'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Delete a task by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.json({ message: 'Task deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;