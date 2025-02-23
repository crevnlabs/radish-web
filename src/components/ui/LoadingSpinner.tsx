import { motion } from 'framer-motion';

export const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
    <motion.div
      animate={{
        rotate: 360,
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
      className="w-16 h-16 border-4 border-neo-green border-t-transparent rounded-full"
    />
    <p className="text-xl text-zinc-600">Loading markets...</p>
  </div>
); 