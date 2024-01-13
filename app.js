const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');

app.use(express.json()); // For parsing application/json

// Use the user routes for any requests to '/users'
app.use('/users', userRoutes);

// Export the app for use in index.js
module.exports = app;
