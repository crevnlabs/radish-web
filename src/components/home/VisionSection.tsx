import { motion } from "framer-motion";

// Variants for the container to stagger child animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

// Variants for child elements (heading and paragraphs)
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export const VisionSection = () => {
  return (
    <motion.section
      className="w-full px-10 py-20 bg-primary relative overflow-hidden text-center"
    >
      {/* Background gradient with pulsing opacity */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-neo-green/5 to-red-300/5"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      {/* Content container with staggered animations */}
      <motion.div
        className="relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.p
          variants={childVariants}
          className="text-3xl w-4xl font-black text-black leading-relaxed mb-4"
        >
          <span className="text-4xl">
            Creator rivalry has always entertained the masses —{" "}
          </span>
          <span className="font-bold text-3xl">PewDiePie vs T-Series, KSI vs Logan Paul</span>. With RADISH, all this hype and fandom can be monetized through prediction markets that resolve followers, subscribers, and viewer counts.
        </motion.p>
        <motion.p
          variants={childVariants}
          className="text-2xl text-zinc-900 leading-relaxed"
        >
          We&apos;re transforming the creator-fan relationship by{" "}
          gamifying engagement and enabling fans to monetize their passion.
        </motion.p>
      </motion.div>
    </motion.section>
  );
};