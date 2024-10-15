const express = require('express');
const routes = require('./routes/index');

// Initialize Express app
const app = express();

// Set port from environment variable or default to 5000
const port = process.env.PORT || 5000;

// Load routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

