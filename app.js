const express = require('express');
const morgan = require('morgan');

const app = express();

// Register view engine (not fully detailed in source, but implied for templates)
app.set('view engine', 'ejs');

// Middleware & static files
// This makes everything inside the 'public' folder accessible to the browser [4]
app.use(express.static('public')); 

// Using third-party middleware (Morgan) for logging [6]
app.use(morgan('dev')); 

// Custom middleware example (Logger) [7, 8]
app.use((req, res, next) => {
  console.log('new request was made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next(); // This tells Express to move to the next middleware [8, 9]
});

// Route handlers [10, 11]
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// 404 page (Catch-all middleware)
// This must be at the bottom of the code [7]
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});