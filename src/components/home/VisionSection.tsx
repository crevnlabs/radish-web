import { motion } from "framer-motion";

const fadeIn = {
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className="py-20 text-center relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-neo-green/5 to-blue-500/5"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.h3
          variants={fadeIn}
          className="md:text-3xl text-lg text-zinc-600 leading-relaxed"
        >
          Creator rivalry has always entertained the masses - <span className="text-neo-green">PewDiePie vs T-Series, KSI vs Logan Paul</span> -
          With RADISH, all this hype and fandom can be monetized through prediction markets that resolve
          followers, subscribers & viewer counts. We&apos;re transforming the creator-fan relationship by
          <span className="text-neo-green"> gamifying engagement </span> and enabling fans to monetize their passion.
        </motion.h3>
      </div>
    </motion.section>
  );
}; 