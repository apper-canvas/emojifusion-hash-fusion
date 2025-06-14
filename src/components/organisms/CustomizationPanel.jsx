import { useState } from 'react';
import { motion } from 'framer-motion';
import ColorPicker from '@/components/molecules/ColorPicker';
import MoodSelector from '@/components/molecules/MoodSelector';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';

const CustomizationPanel = ({ 
  variant, 
  onCustomizationChange,
  onApplyChanges,
  className = '' 
}) => {
  const [customizations, setCustomizations] = useState({
    primaryColor: variant?.colors?.primary || '#FF6B6B',
    mood: variant?.mood || 'happy',
    skinTone: variant?.skinTone || 'medium',
    theme: variant?.theme || 'general'
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (key, value) => {
    const newCustomizations = { ...customizations, [key]: value };
    setCustomizations(newCustomizations);
    setHasChanges(true);
    onCustomizationChange?.(newCustomizations);
  };

  const applyChanges = () => {
    onApplyChanges?.(customizations);
    setHasChanges(false);
  };

  const resetChanges = () => {
    const reset = {
      primaryColor: variant?.colors?.primary || '#FF6B6B',
      mood: variant?.mood || 'happy',
      skinTone: variant?.skinTone || 'medium',
      theme: variant?.theme || 'general'
    };
    setCustomizations(reset);
    setHasChanges(false);
    onCustomizationChange?.(reset);
  };

  const skinTones = [
    { id: 'light', label: 'Light', color: '#F7D3BA' },
    { id: 'medium', label: 'Medium', color: '#E6A573' },
    { id: 'dark', label: 'Dark', color: '#A0634D' }
  ];

  const themes = [
    { id: 'general', label: 'General', icon: '🙂' },
    { id: 'food', label: 'Food', icon: '🍕' },
    { id: 'animals', label: 'Animals', icon: '🐱' },
    { id: 'nature', label: 'Nature', icon: '🌿' },
    { id: 'tech', label: 'Tech', icon: '💻' },
    { id: 'people', label: 'People', icon: '👤' }
  ];

  if (!variant) {
    return (
      <div className={`${className}`}>
        <Card className="text-center py-12">
          <p className="text-gray-500">Select an emoji variant to customize</p>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-heading font-bold text-gray-900">
          Customize Your Emoji
        </h3>
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex gap-2"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={resetChanges}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={applyChanges}
              icon="Check"
            >
              Apply
            </Button>
          </motion.div>
        )}
      </div>

      <div className="space-y-6">
        {/* Color Customization */}
        <Card>
          <ColorPicker
            label="Primary Color"
            value={customizations.primaryColor}
            onChange={(color) => handleChange('primaryColor', color)}
            presetColors={[
              '#FF6B6B', '#4ECDC4', '#FFE66D', '#339AF0',
              '#51CF66', '#FF8CC8', '#845EC2', '#FFC75F'
            ]}
          />
        </Card>

        {/* Mood Selection */}
        <Card>
          <MoodSelector
            value={customizations.mood}
            onChange={(mood) => handleChange('mood', mood)}
          />
        </Card>

        {/* Skin Tone Selection */}
        <Card>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Skin Tone
            </label>
            <div className="flex gap-3">
              {skinTones.map((tone) => (
                <motion.button
                  key={tone.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChange('skinTone', tone.id)}
                  className={`
                    flex flex-col items-center p-3 rounded-xl border-2 transition-all
                    ${customizations.skinTone === tone.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm mb-2"
                    style={{ backgroundColor: tone.color }}
                  />
                  <span className="text-xs font-medium text-gray-700">
                    {tone.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </Card>

        {/* Theme Selection */}
        <Card>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Theme Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((theme) => (
                <motion.button
                  key={theme.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChange('theme', theme.id)}
                  className={`
                    flex flex-col items-center p-3 rounded-lg border-2 transition-all
                    ${customizations.theme === theme.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="text-lg mb-1">{theme.icon}</span>
                  <span className="text-xs font-medium text-gray-700">
                    {theme.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CustomizationPanel;