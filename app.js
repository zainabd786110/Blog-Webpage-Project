const express = require('express'); // Note: Express setup is implied from previous tutorials [12]
const mongoose = require('mongoose'); 
const Blog = require('./models/blog'); 

// Express app setup (implied from conversation history/source context)
const app = express();

// Connection string to MongoDB Atlas [4]
const dbURI = 'mongodb+srv://netninja:test1234@cluster0.mongodb.net/node-tuts?retryWrites=true&w=majority'; [3, 4]

// Connect to MongoDB using Mongoose [3]
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) 
  .then((result) => app.listen(3000)) // Only listen for requests once connection is established [5, 14]
  .catch((err) => console.log(err)); [14]

// --- Sandbox Routes (For Testing) --- [13]

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog 2',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  }); 

  blog.save() 
    .then((result) => {
      res.send(result); 
    })
    .catch((err) => {
      console.log(err); 
    });
});

app.get('/all-blogs', (req, res) => {
  Blog.find() 
    .then((result) => {
      res.send(result); 
    })
    .catch((err) => {
      console.log(err); 
    });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('5ea99b4d1c9d440000a0f022') 
    .then((result) => {
      res.send(result); 
    })
    .catch((err) => {
      console.log(err); 
    });
});

// --- Main Blog Routes --- [11]

app.get('/', (req, res) => {
  res.redirect('/blogs'); 
});

app.get('/blogs', (req, res) => {
  // Find all blogs and sort by newest first (-1) [20, 21]
  Blog.find().sort({ createdAt: -1 }) 
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result }); 
    })
    .catch((err) => {
      console.log(err); 
    });
});