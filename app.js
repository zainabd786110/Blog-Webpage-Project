const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog'); // Importing the blog model [2]

// express app
const app = express();

// Connect to mongodb (URI should be your own)
const dbURI = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/node-tuts';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

// [2] MIDDLEWARE to parse incoming request bodies from forms
// This takes URL-encoded data and passes it into an object on the request object [2, 4].
app.use(express.urlencoded({ extended: true }));

// ROUTES

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// [1, 5] GET request to list all blogs
app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// [2, 3, 6] POST request to add a new blog
app.post('/blogs', (req, res) => {
  // req.body contains the title, snippet, and body from the submitted form [3, 4].
  const blog = new Blog(req.body); 

  blog.save()
    .then((result) => {
      // After saving, redirect the user back to the homepage to see the new entry [6, 7].
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

// [1, 5] GET request to show the create blog form
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// [8-10] GET request for a single blog using a route parameter
// The colon (:) denotes that 'id' is a variable route parameter [8, 11].
app.get('/blogs/:id', (req, res) => {
  const id = req.params.id; // Extracting the ID from the URL [8, 9].
  
  Blog.findById(id)
    .then(result => {
      // Renders the details page with the specific blog document [10, 12].
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

// [13, 14] DELETE request to remove a specific blog
app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      // Because this is an AJAX request from the frontend, we cannot redirect directly [13, 14].
      // We send a JSON response back to the browser with a redirect property [14, 15].
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});