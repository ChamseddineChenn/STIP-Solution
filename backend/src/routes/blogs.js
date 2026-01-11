const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  uploadImage,
  deleteImage,
} = require('../controllers/blogController');

// Blog CRUD routes
router.route('/').get(getAllBlogs).post(createBlog);

router.route('/:identifier').get(getBlog);

router.route('/:id').put(updateBlog).delete(deleteBlog);

// Image upload routes
router.post('/upload-image', upload.single('image'), uploadImage);
router.delete('/delete-image/:publicId', deleteImage);

module.exports = router;
