import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const PhotoUploader = ({ onPhotoChange, className = '' }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setUploadedImage({
          src: e.target.result,
          file: file,
          width: img.width,
          height: img.height
        });
        onPhotoChange?.(e.target.result);
        setIsLoading(false);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    onPhotoChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <AnimatePresence mode="wait">
        {!uploadedImage ? (
          <motion.div
            key="upload-area"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200
              ${dragActive 
                ? 'border-primary bg-primary/5 scale-105' 
                : 'border-gray-300 hover:border-gray-400 bg-white'
              }
              ${isLoading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            `}
            onClick={openFileDialog}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />

            {isLoading ? (
              <div className="space-y-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <ApperIcon name="Loader2" size={48} className="text-primary mx-auto" />
                </motion.div>
                <p className="text-gray-600">Processing image...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ApperIcon 
                    name="Upload" 
                    size={48} 
                    className={`mx-auto ${dragActive ? 'text-primary' : 'text-gray-400'}`} 
                  />
                </motion.div>
                
                <div>
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Drop your photo here or{' '}
                    <span className="text-primary">browse</span>
                  </p>
                  <p className="text-gray-500">
                    JPG, PNG, or GIF up to 10MB
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="image-preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Uploaded Image</h3>
                <Button
                  variant="outline"
                  size="sm"
                  icon="X"
                  onClick={removeImage}
                >
                  Remove
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="relative">
                <img
                  src={uploadedImage.src}
                  alt="Uploaded"
                  className="w-full h-auto max-h-80 object-contain rounded-xl"
                />
                
                {/* Crop overlay indication */}
                <div className="absolute inset-4 border-2 border-dashed border-primary/50 rounded-xl pointer-events-none">
                  <div className="absolute -top-6 left-0 bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                    Crop Area
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Your photo will be automatically cropped to focus on the main subject
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoUploader;