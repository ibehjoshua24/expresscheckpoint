const express = require('express');
const app = express();
const port = 3000;

// Custom middleware to check if it's working hours
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  const hourOfDay = now.getHours();

  // Check if it's a weekday and within working hours
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    next(); // Continue to the next middleware or route
  } else {
    res.status(403).send('Sorry, the application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
  }
};

// Apply the custom middleware to all routes
app.use(checkWorkingHours);

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

app.get('/contact', (req, res) => {
  res.send('Welcome to contact page');
});

app.get('/service', (req, res) => {
  res.send('Welcome to the service page');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
