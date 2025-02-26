import { motion } from "framer-motion";
import { useRef } from "react";

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
  useMarquee?: boolean;
  marqueeSpeed?: number;
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

export const FeaturesSection = ({
  title,
  features,
  className = "",
  useMarquee = false,
  marqueeSpeed = 20
}: FeaturesSectionProps) => {
  const isLightBg = className.includes('bg-zinc-50');
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Duplicate features for seamless looping if using marquee
  const displayFeatures = useMarquee ? [...features, ...features] : features;

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
      <div className="w-full mx-auto px-4 relative">
        <motion.h2
          variants={item}
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-neo-green to-red-300"
        >
          {title}
        </motion.h2>

        {useMarquee ? (
          // Marquee container
          <div className={`overflow-hidden relative ${useMarquee ? 'mx-0' : 'mx-20'}`}>
            <motion.div
              ref={marqueeRef}
              className="flex gap-6"
              animate={{
                x: [0, -50 * features.length],
              }}
              transition={{
                x: {
                  duration: marqueeSpeed,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {displayFeatures.map((feature, index) => (
                <FeatureCard
                  key={`${feature.title}-${index}`}
                  feature={feature}
                  isLightBg={isLightBg}
                  useMarquee={true}
                />
              ))}
            </motion.div>
          </div>
        ) : (
          // Regular grid layout with 4 items per row on large screens
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayFeatures.map((feature, index) => (
              <FeatureCard
                key={`${feature.title}-${index}`}
                feature={feature}
                isLightBg={isLightBg}
                useMarquee={false}
              />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

// Extracted FeatureCard component to avoid code duplication
interface FeatureCardProps {
  feature: Feature;
  isLightBg: boolean;
  useMarquee: boolean;
}

const FeatureCard = ({ feature, isLightBg, useMarquee }: FeatureCardProps) => {
  return (
    <motion.div
      variants={item}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      className={`p-6 rounded-2xl bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm border ${isLightBg ? 'border-zinc-200/50 hover:border-zinc-300/50' : 'border-white/10 hover:border-white/20'
        } transition-all cursor-pointer relative group ${useMarquee ? 'flex-shrink-0 w-[300px]' : ''}`}
    >
      <motion.div
        initial={{ scale: useMarquee ? 1 : 1.5 }}
        whileHover={{ scale: useMarquee ? 1.2 : 1.5, rotate: 5 }}
        className="text-4xl mb-4 transform transition-transform group-hover:rotate-12 ml-20"
      >
        {feature.icon}
      </motion.div>
      <h3 className={`text-xl font-semibold mb-2 ${isLightBg ? 'text-zinc-800' : 'text-white'}`}>
        {feature.title}
      </h3>
      <p className={isLightBg ? 'text-zinc-600 text-base' : 'text-zinc-300 text-base'}>
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
  );
}; 