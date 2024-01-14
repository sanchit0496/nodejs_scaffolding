const express = require('express');
const app = express();
const logger = require("./logger"); // Make sure the path is correct
const userRoutes = require('./routes/userRoutes');

app.use(express.json()); // For parsing application/json

app.use((req, res, next) => {    
    // Log the request method and URL
    logger.info(`Incoming request: ${req.method} ${req.url} Body: ${JSON.stringify(req.body)}`);
    next();
});

// Use the user routes for any requests to '/users'
app.use('/users', userRoutes);

// Export the app for use in index.js
module.exports = app;
