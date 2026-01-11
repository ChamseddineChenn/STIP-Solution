const Blog = require('../models/Blog');
const { cloudinary } = require('../config/cloudinary');

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private (Admin)
const createBlog = async (req, res) => {
  try {
    const {
      mainTitle,
      contentBlocks,
      author,
      published,
      metaDescription,
      coverImage,
      category,
    } = req.body;

    if (!mainTitle) {
      return res.status(400).json({
        success: false,
        message: 'Le titre principal est requis',
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'La catégorie est requise',
      });
    }

    const blog = await Blog.create({
      mainTitle,
      contentBlocks: contentBlocks || [],
      author: author || 'STIP Solutions',
      published: published || false,
      metaDescription,
      coverImage: coverImage || { url: null, publicId: null },
      category,
    });

    res.status(201).json({
      success: true,
      message: 'Blog créé avec succès',
      data: blog,
    });
  } catch (error) {
    console.error('Erreur création blog:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du blog',
      error: error.message,
    });
  }
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getAllBlogs = async (req, res) => {
  try {
    const { published, limit = 10, page = 1 } = req.query;

    const query = {};
    if (published !== undefined) {
      query.published = published === 'true';
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: blogs,
    });
  } catch (error) {
    console.error('Erreur récupération blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des blogs',
      error: error.message,
    });
  }
};

// @desc    Get single blog by ID or slug
// @route   GET /api/blogs/:identifier
// @access  Public
const getBlog = async (req, res) => {
  try {
    const { identifier } = req.params;

    // Check if identifier is a valid MongoDB ObjectId
    const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/);

    const blog = isObjectId
      ? await Blog.findById(identifier)
      : await Blog.findOne({ slug: identifier });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog non trouvé',
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Erreur récupération blog:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du blog',
      error: error.message,
    });
  }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private (Admin)
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const blog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog non trouvé',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog mis à jour avec succès',
      data: blog,
    });
  } catch (error) {
    console.error('Erreur mise à jour blog:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du blog',
      error: error.message,
    });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private (Admin)
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog non trouvé',
      });
    }

    // Delete images from Cloudinary
    const imagesToDelete = [];

    if (blog.coverImage?.publicId) {
      imagesToDelete.push(blog.coverImage.publicId);
    }

    blog.contentBlocks.forEach((block) => {
      if (block.type === 'image' && block.publicId) {
        imagesToDelete.push(block.publicId);
      }
    });

    // Delete all images from Cloudinary
    for (const publicId of imagesToDelete) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error(`Erreur suppression image Cloudinary ${publicId}:`, err);
      }
    }

    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Blog supprimé avec succès',
    });
  } catch (error) {
    console.error('Erreur suppression blog:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du blog',
      error: error.message,
    });
  }
};

// @desc    Upload image to Cloudinary
// @route   POST /api/blogs/upload-image
// @access  Private (Admin)
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Aucune image fournie',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Image téléchargée avec succès',
      data: {
        url: req.file.path,
        publicId: req.file.filename,
      },
    });
  } catch (error) {
    console.error('Erreur upload image:', error);
    res.status(500).json({
      success: false,
      message: "Erreur lors du téléchargement de l'image",
      error: error.message,
    });
  }
};

// @desc    Delete image from Cloudinary
// @route   DELETE /api/blogs/delete-image/:publicId
// @access  Private (Admin)
const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;

    await cloudinary.uploader.destroy(publicId);

    res.status(200).json({
      success: true,
      message: 'Image supprimée avec succès',
    });
  } catch (error) {
    console.error('Erreur suppression image:', error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression de l'image",
      error: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  uploadImage,
  deleteImage,
};
