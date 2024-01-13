const express = require('express');
const app = express();

app.use(express.json()); // For parsing application/json

// Define your routes here
// For example, app.use('/users', userRoutes);

module.exports = app;
