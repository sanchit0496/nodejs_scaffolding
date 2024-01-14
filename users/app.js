const express = require('express');
const app = express();
const logger = require("./logger"); // Make sure the path is correct
const userRoutes = require('./routes/userRoutes');
const { swaggerSpec, swaggerUi } = require('./swaggerConfig'); // Adjust the path if necessary

app.use(express.json()); // For parsing application/json

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {    
    // Log the request method and URL
    console.log('called')
    logger.info(`Incoming request: ${req.method} ${req.url} Body: ${JSON.stringify(req.body)}`);
    next();
});

// Use the user routes for any requests to '/users'
app.use('/users', userRoutes);

// Export the app for use in index.js
module.exports = app;
