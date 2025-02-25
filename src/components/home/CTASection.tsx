import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
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

export const CTASection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="py-20 w-full bg-gray-900 relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-neo-green/5 to-red-300/5"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
      <motion.div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex flex-col items-start justify-between">
          <motion.h2
            variants={item}
            className="text-4xl text-start md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neo-green to-red-300 mb-10"
          >
            Ready to Join the Future of Creator Markets?
          </motion.h2>
          <motion.p className="text-xl text-zinc-300 font-medium">
            Start trading on creator milestones and be part of the next
            evolution in social-fi
          </motion.p>
        </div>

        <Link href="/markets">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-neo-green text-black hover:bg-neo-green/90 relative overflow-hidden group whitespace-nowrap"
            >
              <motion.span
                className="absolute inset-0 bg-white/30"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              Start Trading
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </motion.section>
  );
}; 