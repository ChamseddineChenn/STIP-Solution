import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  RiArrowLeftLine,
  RiAddLine,
  RiText,
  RiFileTextLine,
  RiImageLine,
  RiSaveLine,
  RiLoader4Line,
  RiEyeLine,
  RiCheckLine,
} from 'react-icons/ri';
import BlogTitle from '../components/blog/BlogTitle';
import BlogParagraph from '../components/blog/BlogParagraph';
import BlogImage from '../components/blog/BlogImage';
import BlogPreview from '../components/blog/BlogPreview';
import CustomSelect from '../components/CustomSelect';
import { blogAPI } from '../services/api';

const CreateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mainTitle, setMainTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [contentBlocks, setContentBlocks] = useState([]);
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const isEditMode = !!id;

  const categories = [
    'Soudage',
    'Maintenance Industrielle',
    'Fabrication Personnalisée',
    'Scan et ingénierie',
    "Location de Main d'œuvre",
    'Assemblage',
    'Autre',
  ];

  // Load blog data when editing
  useEffect(() => {
    if (isEditMode && id) {
      fetchBlogData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchBlogData = async () => {
    try {
      const response = await blogAPI.getOne(id);
      if (response.data.success) {
        const blog = response.data.data;
        setMainTitle(blog.mainTitle);
        setAuthor(blog.author || '');
        setCategory(blog.category);
        setIsPublished(blog.published);
        // Add id to content blocks for tracking
        setContentBlocks(
          blog.contentBlocks.map((block) => ({
            ...block,
            id: block._id || `block-${block.order}-${Date.now()}`,
          })),
        );
      }
    } catch (error) {
      console.error('Erreur lors du chargement du blog:', error);
      setSaveMessage({
        type: 'error',
        text: 'Erreur lors du chargement du blog',
      });
    } finally {
      setLoading(false);
    }
  };

  // Add a new content block
  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      content: '',
      publicId: null,
      order: contentBlocks.length,
    };
    setContentBlocks([...contentBlocks, newBlock]);
    setShowAddMenu(false);
  };

  // Update a content block
  const updateBlock = (id, content, publicId = null) => {
    setContentBlocks(
      contentBlocks.map((block) =>
        block.id === id
          ? {
              ...block,
              content: typeof content === 'object' ? content.url : content,
              publicId:
                typeof content === 'object' ? content.publicId : publicId,
            }
          : block,
      ),
    );
  };

  // Delete a content block
  const deleteBlock = (id) => {
    setContentBlocks(contentBlocks.filter((block) => block.id !== id));
  };

  // Save blog to database
  const saveBlog = async () => {
    if (!mainTitle.trim()) {
      setSaveMessage({ type: 'error', text: 'Le titre principal est requis.' });
      return;
    }

    if (!category) {
      setSaveMessage({ type: 'error', text: 'La catégorie est requise.' });
      return;
    }

    setIsSaving(true);
    setSaveMessage(null);

    try {
      // Validate content blocks before saving
      const invalidBlocks = contentBlocks.filter(
        (block) => !block.content || block.content.toString().trim() === '',
      );

      if (invalidBlocks.length > 0) {
        setSaveMessage({
          type: 'error',
          text: 'Tous les blocs de contenu doivent avoir du contenu',
        });
        setIsSaving(false);
        return;
      }

      // Prepare content blocks for API
      const formattedBlocks = contentBlocks.map((block, index) => {
        const formattedBlock = {
          type: block.type,
          content: block.content.toString().trim(),
          order: index,
        };

        // Only include publicId for images
        if (block.type === 'image' && block.publicId) {
          formattedBlock.publicId = block.publicId;
        }

        // Store color for title blocks
        if (block.type === 'title' && block.color) {
          formattedBlock.color = block.color;
        }

        return formattedBlock;
      });

      const blogData = {
        mainTitle,
        author,
        category,
        contentBlocks: formattedBlocks,
        published: isPublished,
      };

      let response;
      if (isEditMode) {
        response = await blogAPI.update(id, blogData);
      } else {
        response = await blogAPI.create(blogData);
      }

      if (response.data.success) {
        setSaveMessage({
          type: 'success',
          text: isEditMode
            ? 'Article mis à jour avec succès!'
            : 'Article créé avec succès!',
        });
        setTimeout(() => {
          navigate('/blogs');
        }, 1500);
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveMessage({
        type: 'error',
        text:
          error.response?.data?.message || "Erreur lors de l'enregistrement.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Render content block based on type
  const renderBlock = (block) => {
    switch (block.type) {
      case 'title':
        return (
          <BlogTitle
            key={block.id}
            content={block.content}
            color={block.color || '#1f2937'}
            onChange={(content) => updateBlock(block.id, content)}
            onColorChange={(color) => {
              setContentBlocks(
                contentBlocks.map((b) =>
                  b.id === block.id ? { ...b, color } : b,
                ),
              );
            }}
            onDelete={() => deleteBlock(block.id)}
          />
        );
      case 'paragraph':
        return (
          <BlogParagraph
            key={block.id}
            content={block.content}
            onChange={(content) => updateBlock(block.id, content)}
            onDelete={() => deleteBlock(block.id)}
          />
        );
      case 'image':
        return (
          <BlogImage
            key={block.id}
            content={block.content}
            publicId={block.publicId}
            onChange={(data) => updateBlock(block.id, data)}
            onDelete={() => deleteBlock(block.id)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto">
      {/* Preview Modal */}
      {showPreview && (
        <BlogPreview
          blog={{
            mainTitle,
            author,
            category,
            contentBlocks,
            createdAt: new Date(),
          }}
          onClose={() => setShowPreview(false)}
        />
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <RiLoader4Line className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/blogs')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <RiArrowLeftLine className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {isEditMode ? "Modifier l'article" : 'Créer un article'}
                </h1>
                <p className="text-sm text-gray-500">
                  {isEditMode
                    ? 'Modifiez le contenu de votre article'
                    : 'Ajoutez du contenu à votre blog'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-end">
              {/* Preview button */}
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <RiEyeLine className="w-5 h-5" />
                <span className="hidden sm:inline">Aperçu</span>
              </button>

              {/* Publish toggle */}
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm text-gray-600">Publier</span>
                <button
                  type="button"
                  onClick={() => setIsPublished(!isPublished)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
                    isPublished ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                      isPublished ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </label>

              {/* Save button */}
              <button
                onClick={saveBlog}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSaving ? (
                  <RiLoader4Line className="w-5 h-5 animate-spin" />
                ) : (
                  <RiSaveLine className="w-5 h-5" />
                )}
                <span className="hidden sm:inline">Enregistrer</span>
              </button>
            </div>
          </div>

          {/* Save message */}
          {saveMessage && (
            <div
              className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
                saveMessage.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {saveMessage.type === 'success' ? (
                <RiCheckLine className="w-5 h-5" />
              ) : (
                <RiEyeLine className="w-5 h-5" />
              )}
              {saveMessage.text}
            </div>
          )}

          {/* Main title input */}
          <div className="bg-white border border-border rounded-lg p-6 mb-4">
            <label className="block text-xs font-medium text-primary-50 uppercase tracking-wide mb-2">
              Titre principal *
            </label>
            <input
              type="text"
              value={mainTitle}
              onChange={(e) => setMainTitle(e.target.value)}
              placeholder="Entrez le titre principal de l'article..."
              className="w-full text-3xl font-bold text-gray-800 border-none outline-none bg-transparent placeholder-gray-300 focus:ring-0"
            />
          </div>

          {/* Category selector */}
          <div className="bg-white border border-border rounded-lg p-6 mb-4">
            <CustomSelect
              label="Catégorie *"
              value={category}
              onChange={setCategory}
              options={[
                { value: '', label: 'Sélectionnez une catégorie...' },
                ...categories.map((cat) => ({ value: cat, label: cat })),
              ]}
            />
          </div>

          {/* Author input */}
          <div className="bg-white border border-border rounded-lg p-6 mb-4">
            <label className="block text-xs font-medium text-primary-50 uppercase tracking-wide mb-2">
              Auteur
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Entrez le nom de l'auteur (optionnel)..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800"
            />
          </div>

          {/* Content blocks */}
          <div className="space-y-4 mb-6">{contentBlocks.map(renderBlock)}</div>

          {/* Add block buttons */}
          <div className="relative">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-50 hover:text-primary-50 transition-all duration-200 cursor-pointer"
            >
              <RiAddLine className="w-5 h-5" />
              <span>Ajouter un élément</span>
            </button>

            {/* Add menu dropdown */}
            {showAddMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-10 overflow-hidden animate-fadeIn">
                <button
                  onClick={() => addBlock('title')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                  <RiText className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <span className="block font-medium text-gray-700">
                      Ajouter un titre
                    </span>
                    <span className="text-xs text-gray-400">
                      Titre de section
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => addBlock('paragraph')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 border-t border-gray-100 cursor-pointer"
                >
                  <RiFileTextLine className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <span className="block font-medium text-gray-700">
                      Ajouter un paragraphe
                    </span>
                    <span className="text-xs text-gray-400">
                      Texte avec mise en forme
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => addBlock('image')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 border-t border-gray-100 cursor-pointer"
                >
                  <RiImageLine className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <span className="block font-medium text-gray-700">
                      Ajouter une image
                    </span>
                    <span className="text-xs text-gray-400">
                      Image depuis votre appareil
                    </span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Click outside to close menu */}
          {showAddMenu && (
            <div
              className="fixed inset-0 z-0"
              onClick={() => setShowAddMenu(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CreateBlog;
