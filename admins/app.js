const express = require("express");
const app = express();
const adminRoutes = require("./routes/adminRoutes");
const logger = require("./logger"); // Make sure the path is correct
const { swaggerSpec, swaggerUi } = require('./swaggerConfig'); // Adjust the path if necessary

app.use(express.json()); // For parsing application/json

// Logger middleware to log each incoming request
app.use((req, res, next) => {
  // Log the request method and URL
  logger.info(`Incoming request: ${req.method} ${req.url} Body: ${JSON.stringify(req.body)}`);
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use the admin routes for any requests to '/admin'
app.use("/admin", adminRoutes);

// Export the app for use in index.js
module.exports = app;
