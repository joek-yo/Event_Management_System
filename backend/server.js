const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// Set up routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
