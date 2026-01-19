const express = require('express');
const blogController = require('../controller/blogController');

const router = express.Router();

// Routes are now relative (no /blogs prefix here, since app.use('/blogs', blogRoutes) adds it)
router.get('/', blogController.blog_index);  // Becomes /blogs
router.get('/create', blogController.blog_create_get);  // Becomes /blogs/create
router.post('/', blogController.blog_create_post);  // Becomes /blogs (POST)
router.get('/:id', blogController.blog_details);  // Becomes /blogs/:id
router.delete('/:id', blogController.blog_delete);  // Becomes /blogs/:id (DELETE)

module.exports = router;