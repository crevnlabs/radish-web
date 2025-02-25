import { motion } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
}

interface FeaturesSectionProps {
  title: string;
  features: Feature[];
  className?: string;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export const FeaturesSection = ({ title, features, className = "" }: FeaturesSectionProps) => {
  const isLightBg = className.includes('bg-zinc-50');

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={staggerContainer}
      className={`py-20 relative overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <div className="max-w-6xl mx-auto px-4 relative">
        <motion.h2
          variants={item}
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-neo-green to-blue-500"
        >
          {title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className={`p-8 rounded-2xl bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm border ${isLightBg ? 'border-zinc-200/50 hover:border-zinc-300/50' : 'border-white/10 hover:border-white/20'
                } transition-all cursor-pointer relative group`}
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-5xl mb-6 transform transition-transform group-hover:rotate-12"
              >
                {feature.icon}
              </motion.div>
              <h3 className={`text-2xl font-semibold mb-3 ${isLightBg ? 'text-zinc-800' : 'text-white'}`}>
                {feature.title}
              </h3>
              <p className={isLightBg ? 'text-zinc-600 text-lg' : 'text-zinc-300 text-lg'}>
                {feature.description}
              </p>
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${isLightBg ? 'from-white/0 via-black/5 to-white/0' : 'from-white/0 via-white/10 to-white/0'
                  } opacity-0 group-hover:opacity-100`}
                animate={{
                  x: ["-200%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}; 