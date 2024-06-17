const Event = require('../models/Event');

const createEvent = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const event = new Event({ title, description, date, createdBy: req.user._id });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'username');
    res.json(events);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'username');
    if (!event) return res.status(404).send('Event not found');
    res.json(event);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).send('Event not found');
    if (event.createdBy.toString() !== req.user._id) return res.status(403).send('Unauthorized');

    Object.assign(event, req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).send('Event not found');
    if (event.createdBy.toString() !== req.user._id) return res.status(403).send('Unauthorized');

    await event.remove();
    res.send('Event deleted');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { createEvent, getEvents, getEvent, updateEvent, deleteEvent };
