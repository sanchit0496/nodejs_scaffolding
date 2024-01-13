const express = require('express');
const app = express();

const adminRoutes = require('./routes/adminRoutes');

app.use(express.json()); // For parsing application/json

// Use the user routes for any requests to '/users'
app.use('/admin', adminRoutes);

// Export the app for use in index.js
module.exports = app;
