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
import JobPreview from '../components/job/JobPreview';
import CustomSelect from '../components/CustomSelect';
import { jobAPI } from '../services/api';

const CreateJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [location, setLocation] = useState('');
  const [contractType, setContractType] = useState('');
  const [department, setDepartment] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Intermédiaire');
  const [contentBlocks, setContentBlocks] = useState([]);
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const isEditMode = !!id;

  const locations = ['Montréal', 'Québec', 'Cap-Santé', 'Télétravail', 'Autre'];
  const contractTypes = ['CDI', 'Contrat', 'Temps partiel', 'Stage'];
  const departments = [
    'Soudage',
    'Fabrication',
    'Ingénierie',
    'Maintenance',
    'Gestion',
    'Autre',
  ];
  const experienceLevels = ['Junior', 'Intermédiaire', 'Senior', 'Expert'];

  // Load job data when editing
  useEffect(() => {
    if (isEditMode && id) {
      fetchJobData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchJobData = async () => {
    try {
      const response = await jobAPI.getOne(id);
      if (response.data.success) {
        const job = response.data.data;
        setTitle(job.title);
        setShortDescription(job.shortDescription || '');
        setLocation(job.location);
        setContractType(job.contractType);
        setDepartment(job.department);
        setExperienceLevel(job.experienceLevel || 'Intermédiaire');
        setIsPublished(job.published);
        setContentBlocks(
          job.contentBlocks.map((block) => ({
            ...block,
            id: block._id || `block-${block.order}-${Date.now()}`,
          }))
        );
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'offre:", error);
      setSaveMessage({
        type: 'error',
        text: "Erreur lors du chargement de l'offre",
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
          : block
      )
    );
  };

  // Delete a content block
  const deleteBlock = (id) => {
    setContentBlocks(contentBlocks.filter((block) => block.id !== id));
  };

  // Save job to database
  const saveJob = async () => {
    if (!title.trim()) {
      setSaveMessage({ type: 'error', text: 'Le titre du poste est requis.' });
      return;
    }

    if (!location || !contractType || !department) {
      setSaveMessage({
        type: 'error',
        text: 'Le lieu, type de contrat et département sont requis.',
      });
      return;
    }

    setIsSaving(true);
    setSaveMessage(null);

    try {
      // Validate content blocks before saving
      const invalidBlocks = contentBlocks.filter(
        (block) => !block.content || block.content.toString().trim() === ''
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

        if (block.type === 'image' && block.publicId) {
          formattedBlock.publicId = block.publicId;
        }

        if (block.type === 'title' && block.color) {
          formattedBlock.color = block.color;
        }

        return formattedBlock;
      });

      const jobData = {
        title,
        shortDescription,
        location,
        contractType,
        department,
        experienceLevel,
        contentBlocks: formattedBlocks,
        published: isPublished,
      };

      let response;
      if (isEditMode) {
        response = await jobAPI.update(id, jobData);
      } else {
        response = await jobAPI.create(jobData);
      }

      if (response.data.success) {
        setSaveMessage({
          type: 'success',
          text: isEditMode
            ? 'Offre mise à jour avec succès!'
            : 'Offre créée avec succès!',
        });
        setTimeout(() => {
          navigate('/jobs');
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
                  b.id === block.id ? { ...b, color } : b
                )
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
            uploadEndpoint="/jobs/upload-image"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/jobs')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <RiArrowLeftLine className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isEditMode ? "Modifier l'offre" : "Nouvelle offre d'emploi"}
            </h1>
            <p className="text-gray-500 mt-1">
              {isEditMode
                ? "Modifiez les détails de l'offre"
                : "Créez une nouvelle offre d'emploi"}
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
            onClick={saveJob}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSaving ? (
              <RiLoader4Line className="w-5 h-5 animate-spin" />
            ) : (
              <RiSaveLine className="w-5 h-5" />
            )}
            <span className="hidden sm:inline">
              {isSaving ? 'Enregistrement...' : 'Enregistrer'}
            </span>
          </button>
        </div>
      </div>

      {/* Save message */}
      {saveMessage && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            saveMessage.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {saveMessage.text}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <RiLoader4Line className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <>
          {/* Main title */}
          <div className="bg-white border border-border rounded-lg p-6 mb-4">
            <label className="block text-xs font-medium text-primary-50 uppercase tracking-wide mb-2">
              Titre du poste *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Soudeur certifié CWB"
              className="w-full text-2xl font-bold border-none outline-none bg-transparent placeholder-gray-300 text-gray-800"
            />
          </div>

          {/* Short description */}
          <div className="bg-white border border-border rounded-lg p-6 mb-4">
            <label className="block text-xs font-medium text-primary-50 uppercase tracking-wide mb-2">
              Description courte
            </label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Brève description pour les cartes d'emploi..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800 resize-none"
            />
          </div>

          {/* Filter attributes grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Location */}
            <div className="bg-white border border-border rounded-lg p-6">
              <CustomSelect
                label="Lieu *"
                value={location}
                onChange={setLocation}
                options={[
                  { value: '', label: 'Sélectionnez un lieu...' },
                  ...locations.map((loc) => ({ value: loc, label: loc })),
                ]}
              />
            </div>

            {/* Contract type */}
            <div className="bg-white border border-border rounded-lg p-6">
              <CustomSelect
                label="Type de contrat *"
                value={contractType}
                onChange={setContractType}
                options={[
                  { value: '', label: 'Sélectionnez un type...' },
                  ...contractTypes.map((type) => ({
                    value: type,
                    label: type,
                  })),
                ]}
              />
            </div>

            {/* Department */}
            <div className="bg-white border border-border rounded-lg p-6">
              <CustomSelect
                label="Département *"
                value={department}
                onChange={setDepartment}
                options={[
                  { value: '', label: 'Sélectionnez un département...' },
                  ...departments.map((dept) => ({ value: dept, label: dept })),
                ]}
              />
            </div>

            {/* Experience level */}
            <div className="bg-white border border-border rounded-lg p-6">
              <CustomSelect
                label="Niveau d'expérience"
                value={experienceLevel}
                onChange={setExperienceLevel}
                options={experienceLevels.map((level) => ({
                  value: level,
                  label: level,
                }))}
              />
            </div>
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

      {/* Preview Modal */}
      {showPreview && (
        <JobPreview
          job={{
            title,
            shortDescription,
            location,
            contractType,
            department,
            experienceLevel,
            contentBlocks,
            published: isPublished,
            createdAt: new Date(),
          }}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default CreateJob;
