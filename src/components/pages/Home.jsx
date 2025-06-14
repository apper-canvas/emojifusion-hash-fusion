import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { emojiProjectService } from '@/services';

// Import all components
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import ErrorState from '@/components/molecules/ErrorState';
import EmptyState from '@/components/molecules/EmptyState';
import InputModeSelector from '@/components/organisms/InputModeSelector';
import DrawingCanvas from '@/components/organisms/DrawingCanvas';
import PhotoUploader from '@/components/organisms/PhotoUploader';
import TextPromptInput from '@/components/organisms/TextPromptInput';
import EmojiVariantGrid from '@/components/organisms/EmojiVariantGrid';
import CustomizationPanel from '@/components/organisms/CustomizationPanel';
import ExportModal from '@/components/organisms/ExportModal';
import ApperIcon from '@/components/ApperIcon';

const Home = () => {
  // Main state
  const [currentStep, setCurrentStep] = useState('mode-select'); // mode-select, input, generate, customize, export
  const [selectedMode, setSelectedMode] = useState(null);
  const [inputData, setInputData] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [customizations, setCustomizations] = useState({});
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentProjects, setRecentProjects] = useState([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Load recent projects on mount
  useEffect(() => {
    loadRecentProjects();
  }, []);

  const loadRecentProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const projects = await emojiProjectService.getAll();
      setRecentProjects(projects.slice(0, 5)); // Show last 5 projects
    } catch (err) {
      setError(err.message || 'Failed to load recent projects');
      toast.error('Failed to load recent projects');
    } finally {
      setLoading(false);
    }
  };

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setCurrentStep('input');
    setError(null);
  };

  const handleInputChange = (data) => {
    setInputData(data);
  };

  const handleGenerate = async () => {
    if (!inputData) {
      toast.error('Please provide input data first');
      return;
    }

    setGenerating(true);
    setError(null);
    try {
      const generatedVariants = await emojiProjectService.generateVariants(inputData, selectedMode);
      setVariants(generatedVariants);
      setSelectedVariant(generatedVariants[0]);
      setSelectedVariantIndex(0);
      setCurrentStep('customize');
      toast.success(`Generated ${generatedVariants.length} amazing emoji variants!`);
    } catch (err) {
      setError(err.message || 'Failed to generate emoji variants');
      toast.error('Failed to generate emoji variants');
    } finally {
      setGenerating(false);
    }
  };

  const handleVariantSelect = (variant, index) => {
    setSelectedVariant(variant);
    setSelectedVariantIndex(index);
  };

  const handleCustomizationChange = (newCustomizations) => {
    setCustomizations(newCustomizations);
  };

  const handleApplyCustomizations = async (finalCustomizations) => {
    setLoading(true);
    try {
      // Simulate applying customizations
      await new Promise(resolve => setTimeout(resolve, 500));
      setCustomizations(finalCustomizations);
      toast.success('Customizations applied!');
    } catch (err) {
      toast.error('Failed to apply customizations');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (exportData) => {
    try {
      // Create project record
      const projectData = {
        inputType: selectedMode,
        inputData: inputData,
        variants: variants,
        selectedVariant: selectedVariantIndex,
        customizations: customizations
      };

      const savedProject = await emojiProjectService.create(projectData);
      
      // Refresh recent projects
      loadRecentProjects();
      
      toast.success('Project saved and exported successfully!');
      
      // Reset to start for new creation
      handleStartOver();
    } catch (err) {
      toast.error('Failed to save project');
    }
  };

  const handleStartOver = () => {
    setCurrentStep('mode-select');
    setSelectedMode(null);
    setInputData(null);
    setVariants([]);
    setSelectedVariant(null);
    setSelectedVariantIndex(0);
    setCustomizations({});
    setError(null);
  };

  const handleLoadProject = async (projectId) => {
    setLoading(true);
    try {
      const project = await emojiProjectService.getById(projectId);
      if (project) {
        setSelectedMode(project.inputType);
        setInputData(project.inputData);
        setVariants(project.variants);
        setSelectedVariant(project.variants[project.selectedVariant]);
        setSelectedVariantIndex(project.selectedVariant);
        setCustomizations(project.customizations);
        setCurrentStep('customize');
        toast.success('Project loaded successfully!');
      }
    } catch (err) {
      toast.error('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const canGenerate = () => {
    if (!inputData) return false;
    if (selectedMode === 'text' && inputData.trim().length < 3) return false;
    return true;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'mode-select':
        return (
          <InputModeSelector
            onModeSelect={handleModeSelect}
            selectedMode={selectedMode}
          />
        );

      case 'input':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-heading font-bold text-gray-900 mb-2"
              >
                {selectedMode === 'draw' && 'Draw Your Emoji'}
                {selectedMode === 'photo' && 'Upload Your Photo'}
                {selectedMode === 'text' && 'Describe Your Emoji'}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600"
              >
                {selectedMode === 'draw' && 'Use the drawing tools to create your design'}
                {selectedMode === 'photo' && 'Upload a selfie or any photo to transform'}
                {selectedMode === 'text' && 'Tell us what kind of emoji you want to create'}
              </motion.p>
            </div>

            <div className="max-w-2xl mx-auto">
              {selectedMode === 'draw' && (
                <DrawingCanvas onCanvasChange={handleInputChange} />
              )}
              {selectedMode === 'photo' && (
                <PhotoUploader onPhotoChange={handleInputChange} />
              )}
              {selectedMode === 'text' && (
                <TextPromptInput onPromptChange={handleInputChange} />
              )}
            </div>

            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={handleStartOver}
                icon="ArrowLeft"
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleGenerate}
                disabled={!canGenerate() || generating}
                loading={generating}
                icon="Sparkles"
                size="lg"
              >
                Generate Emojis
              </Button>
            </div>
          </div>
        );

      case 'customize':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <EmojiVariantGrid
                variants={variants}
                selectedVariant={selectedVariantIndex}
                onVariantSelect={handleVariantSelect}
                loading={generating}
              />
            </div>
            
            <div className="space-y-6">
              <CustomizationPanel
                variant={selectedVariant}
                onCustomizationChange={handleCustomizationChange}
                onApplyChanges={handleApplyCustomizations}
              />
              
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={handleStartOver}
                  icon="ArrowLeft"
                >
                  Start Over
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setShowExportModal(true)}
                  disabled={!selectedVariant}
                  icon="Download"
                  size="lg"
                  className="flex-1"
                >
                  Export Emoji
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading && currentStep === 'mode-select') {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto max-w-6xl">
          <SkeletonLoader count={3} type="card" />
        </div>
      </div>
    );
  }

  if (error && currentStep === 'mode-select') {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto max-w-6xl">
          <ErrorState
            title="Failed to Load"
            message={error}
            onRetry={loadRecentProjects}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="bg-primary/10 p-3 rounded-2xl"
              >
                <ApperIcon name="Smile" size={32} className="text-primary" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-gray-900">
                  EmojiFusion
                </h1>
                <p className="text-gray-600 text-sm">
                  AI-Powered Emoji Creator
                </p>
              </div>
            </div>

            {currentStep !== 'mode-select' && (
              <Button
                variant="outline"
                onClick={handleStartOver}
                icon="Plus"
                size="sm"
              >
                New Emoji
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Recent Projects Sidebar - Only show on mode-select */}
        {currentStep === 'mode-select' && recentProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <Card className="max-w-md mx-auto">
              <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">
                Recent Creations
              </h3>
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <motion.button
                    key={project.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLoadProject(project.id)}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: project.customizations?.primaryColor || '#FFE66D' }}
                    >
                      <span className="text-sm">
                        {project.customizations?.mood === 'happy' && '😊'}
                        {project.customizations?.mood === 'excited' && '🤩'}
                        {project.customizations?.mood === 'cool' && '😎'}
                        {project.customizations?.mood === 'love' && '😍'}
                        {project.customizations?.mood === 'surprised' && '😮'}
                        {project.customizations?.mood === 'chill' && '😌'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 capitalize truncate">
                        {project.customizations?.mood || 'Custom'} Emoji
                      </p>
                      <p className="text-sm text-gray-600 capitalize">
                        {project.inputType} • {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        variant={selectedVariant}
        onExport={handleExport}
      />
    </div>
  );
};

export default Home;