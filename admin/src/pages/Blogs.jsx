import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  RiArticleLine,
  RiAddLine,
  RiLoader4Line,
  RiCheckLine,
  RiCloseLine,
  RiEditLine,
  RiDeleteBinLine,
  RiEyeLine,
} from 'react-icons/ri';
import { blogAPI } from '../services/api';
import BlogPreview from '../components/blog/BlogPreview';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [previewBlog, setPreviewBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getAll();
      if (response.data.success) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePublish = async (id, currentStatus) => {
    setUpdatingId(id);
    try {
      const response = await blogAPI.update(id, {
        published: !currentStatus,
      });
      if (response.data.success) {
        setBlogs(
          blogs.map((blog) =>
            blog._id === id ? { ...blog, published: !currentStatus } : blog
          )
        );
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article?')) {
      return;
    }
    setDeletingId(id);
    try {
      const response = await blogAPI.delete(id);
      if (response.data.success) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="animate-fadeIn">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Blogs</h1>
          <p className="text-gray-500 mt-1">Gérer les articles du blog</p>
        </div>
        <Link
          to="/blogs/create"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-200 active:scale-[0.98] cursor-pointer"
        >
          <RiAddLine className="w-5 h-5" />
          <span className="hidden sm:inline">Nouvel article</span>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <RiLoader4Line className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-card border border-border text-center">
          <RiArticleLine className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Aucun article
          </h3>
          <p className="text-gray-500 mb-6">
            Commencez par créer votre premier article de blog.
          </p>
          <Link
            to="/blogs/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <RiAddLine className="w-5 h-5" />
            Créer un article
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {blog.mainTitle}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="inline-block px-3 py-1 bg-primary-50 text-primary text-xs font-semibold rounded-full">
                      {blog.category}
                    </span>
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        blog.published
                          ? 'bg-green-50 text-green-700'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}
                    >
                      {blog.published ? 'Publié' : 'Brouillon'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Auteur: {blog.author || 'STIP Solutions'}</span>
                    <span>Créé le {formatDate(blog.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-end">
                  {/* Preview button */}
                  <button
                    onClick={() => setPreviewBlog(blog)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 font-medium transition-all duration-200 active:scale-[0.98] cursor-pointer"
                  >
                    <RiEyeLine className="w-5 h-5" />
                    <span className="hidden sm:inline">Aperçu</span>
                  </button>

                  {/* Edit button */}
                  <Link
                    to={`/blogs/edit/${blog._id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium transition-all duration-200 active:scale-[0.98] cursor-pointer"
                  >
                    <RiEditLine className="w-5 h-5" />
                    <span className="hidden sm:inline">Modifier</span>
                  </Link>

                  {/* Delete button */}
                  <button
                    onClick={() => deleteBlog(blog._id)}
                    disabled={deletingId === blog._id}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {deletingId === blog._id ? (
                      <RiLoader4Line className="w-5 h-5 animate-spin" />
                    ) : (
                      <RiDeleteBinLine className="w-5 h-5" />
                    )}
                    <span className="hidden sm:inline">Supprimer</span>
                  </button>

                  {/* Publish button */}
                  <button
                    onClick={() => togglePublish(blog._id, blog.published)}
                    disabled={updatingId === blog._id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                      blog.published
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                  >
                    {updatingId === blog._id ? (
                      <RiLoader4Line className="w-5 h-5 animate-spin" />
                    ) : blog.published ? (
                      <>
                        <RiCloseLine className="w-5 h-5" />
                        <span className="hidden sm:inline">Dépublier</span>
                      </>
                    ) : (
                      <>
                        <RiCheckLine className="w-5 h-5" />
                        <span className="hidden sm:inline">Publier</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewBlog && (
        <BlogPreview blog={previewBlog} onClose={() => setPreviewBlog(null)} />
      )}
    </div>
  );
};

export default Blogs;
