import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Badge from '@/components/atoms/Badge';

const TextPromptInput = ({ onPromptChange, className = '' }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);

  const suggestions = [
    'happy cat', 'coffee lover', 'pizza time', 'sleepy panda',
    'party emoji', 'thumbs up', 'heart eyes', 'mind blown',
    'cool sunglasses', 'crying laughing', 'facepalm', 'chef kiss',
    'fire emoji', 'rainbow', 'unicorn', 'rocket ship',
    'dancing', 'music notes', 'birthday cake', 'graduation cap'
  ];

  const handlePromptChange = (e) => {
    const value = e.target.value;
    setPrompt(value);
    onPromptChange?.(value);
  };

  const handleSuggestionClick = (suggestion) => {
    if (selectedSuggestions.includes(suggestion)) {
      // Remove suggestion
      const newSuggestions = selectedSuggestions.filter(s => s !== suggestion);
      setSelectedSuggestions(newSuggestions);
      const newPrompt = newSuggestions.join(' + ');
      setPrompt(newPrompt);
      onPromptChange?.(newPrompt);
    } else {
      // Add suggestion
      const newSuggestions = [...selectedSuggestions, suggestion];
      setSelectedSuggestions(newSuggestions);
      const newPrompt = newSuggestions.join(' + ');
      setPrompt(newPrompt);
      onPromptChange?.(newPrompt);
    }
  };

  const clearAll = () => {
    setPrompt('');
    setSelectedSuggestions([]);
    onPromptChange?.('');
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Input
          label="Describe your emoji"
          placeholder="e.g., happy coffee cup with sunglasses"
          value={prompt}
          onChange={handlePromptChange}
          icon="Type"
        />
        
        {prompt && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={clearAll}
            className="mt-2 text-sm text-gray-500 hover:text-primary transition-colors"
          >
            Clear all
          </motion.button>
        )}
      </motion.div>

      {/* Popular Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Popular Ideas
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={suggestion}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`
                px-3 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${selectedSuggestions.includes(suggestion)
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {suggestion}
              {selectedSuggestions.includes(suggestion) && ' ✓'}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Selected Prompt Preview */}
      {selectedSuggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/5 rounded-xl p-4"
        >
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Your Prompt:
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedSuggestions.map((suggestion) => (
              <Badge
                key={suggestion}
                variant="primary"
                animated
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}

      {/* Helpful Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-accent/10 rounded-xl p-4"
      >
        <h4 className="text-sm font-medium text-gray-900 mb-2">
          💡 Tips for better results:
        </h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Be specific about emotions and expressions</li>
          <li>• Include objects, animals, or characters</li>
          <li>• Add style keywords like "cartoon", "cute", or "3D"</li>
          <li>• Combine multiple concepts with "+"</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default TextPromptInput;