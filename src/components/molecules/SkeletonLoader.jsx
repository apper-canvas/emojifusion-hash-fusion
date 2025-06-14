import { motion } from 'framer-motion';

const SkeletonLoader = ({ 
  count = 1, 
  type = 'default',
  className = ''
}) => {
  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: { x: '100%' }
  };

  const Shimmer = () => (
    <motion.div
      variants={shimmerVariants}
      initial="initial"
      animate="animate"
      transition={{
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut"
      }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
    />
  );

  const skeletonTypes = {
    default: (
      <div className="space-y-4">
        <div className="relative bg-gray-200 h-4 rounded-lg overflow-hidden">
          <Shimmer />
        </div>
        <div className="relative bg-gray-200 h-4 rounded-lg w-3/4 overflow-hidden">
          <Shimmer />
        </div>
        <div className="relative bg-gray-200 h-4 rounded-lg w-1/2 overflow-hidden">
          <Shimmer />
        </div>
      </div>
    ),
    card: (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="relative bg-gray-200 h-48 rounded-xl mb-4 overflow-hidden">
          <Shimmer />
        </div>
        <div className="space-y-3">
          <div className="relative bg-gray-200 h-6 rounded-lg overflow-hidden">
            <Shimmer />
          </div>
          <div className="relative bg-gray-200 h-4 rounded-lg w-2/3 overflow-hidden">
            <Shimmer />
          </div>
        </div>
      </div>
    ),
    emoji: (
      <div className="bg-white rounded-2xl p-4 shadow-lg">
        <div className="relative bg-gray-200 h-16 w-16 rounded-full mx-auto mb-3 overflow-hidden">
          <Shimmer />
        </div>
        <div className="relative bg-gray-200 h-3 rounded-lg overflow-hidden">
          <Shimmer />
        </div>
      </div>
    ),
    list: (
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="relative bg-gray-200 h-12 w-12 rounded-full overflow-hidden">
            <Shimmer />
          </div>
          <div className="flex-1 space-y-2">
            <div className="relative bg-gray-200 h-4 rounded-lg overflow-hidden">
              <Shimmer />
            </div>
            <div className="relative bg-gray-200 h-3 rounded-lg w-2/3 overflow-hidden">
              <Shimmer />
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {skeletonTypes[type]}
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;