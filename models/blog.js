const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

// Define the structure of the blog documents
const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, { timestamps: true }); 

// Create the model based on the schema
// The name 'Blog' will be pluralised to 'blogs' to find the collection [7, 9]
const Blog = mongoose.model('Blog', blogSchema); 

// Export the model for use in app.js
module.exports = Blog; 