import { motion } from 'framer-motion';
import Badge from '@/components/atoms/Badge';

const MoodSelector = ({ 
  value, 
  onChange, 
  moods = [], 
  className = '' 
}) => {
  const defaultMoods = [
    { id: 'happy', label: 'Happy', emoji: '😊', color: '#FFE66D' },
    { id: 'excited', label: 'Excited', emoji: '🤩', color: '#4ECDC4' },
    { id: 'cool', label: 'Cool', emoji: '😎', color: '#339AF0' },
    { id: 'love', label: 'Love', emoji: '😍', color: '#FF6B6B' },
    { id: 'surprised', label: 'Surprised', emoji: '😮', color: '#FFD93D' },
    { id: 'chill', label: 'Chill', emoji: '😌', color: '#51CF66' }
  ];

  const moodOptions = moods.length > 0 ? moods : defaultMoods;

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Choose Mood
      </label>
      
      <div className="flex flex-wrap gap-2">
        {moodOptions.map((mood, index) => (
          <motion.button
            key={mood.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange?.(mood.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all duration-200
              ${value === mood.id 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <span className="text-lg">{mood.emoji}</span>
            <span className="font-medium text-sm">{mood.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;