const express = require('express');
const mongoose = require('mongoose');
const blogRoutes=require('./routes/blogRoutes');
const dbURI = 'mongodb+srv://hookedink:test1234@node.m7geaba.mongodb.net/node-tuts?appName=node';

// Connect to MongoDB WITHOUT the deprecated options
mongoose.connect(dbURI)
  .then((result) => {
    console.log('Connected to MongoDB Atlas successfully!');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// express app
const app = express();
app.set('view engine', 'ejs');
// listen for requests
const morgan = require('morgan');
// app.listen(3000);
// app.get('/', (req, res) => {
//   res.send('<p>home page</p>');
// });
app.use(morgan('dev'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log('new request was made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs',blogRoutes);
// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about', { title: '|About' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});