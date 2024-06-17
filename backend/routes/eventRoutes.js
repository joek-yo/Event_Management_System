const express = require('express');
const { createEvent, getEvents, getEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const isAuthenticated = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', isAuthenticated, createEvent);
router.get('/', getEvents);
router.get('/:id', getEvent);
router.put('/:id', isAuthenticated, updateEvent);
router.delete('/:id', isAuthenticated, deleteEvent);

module.exports = router;
