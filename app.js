const express = require('express');
const blogRoutes = require('./routes/blogRoutes'); // Import the router [1]

const app = express();

// Other middleware (e.g., view engine setup, static files) would go here

// Scope the blog routes to only apply when the URL begins with /blogs [6]
app.use('/blogs', blogRoutes); [5, 6]

// Other routes like home or about would remain here
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
