const express = require('express');
const router = express.Router(); // Create a new instance of a router object [1]
const blogController = require('../controllers/blogController'); // Import the controller [7]

// Map routes to controller functions [7]
// Note: We don't use '/blogs' here because it's already scoped in app.js [8]
router.get('/', blogController.blog_index); 
router.post('/', blogController.blog_create_post); 
router.get('/create', blogController.blog_create_get); // This must be above /:id [10, 11]
router.get('/:id', blogController.blog_details); 
router.delete('/:id', blogController.blog_delete); 

module.exports = router; // Export the router for use in app.js