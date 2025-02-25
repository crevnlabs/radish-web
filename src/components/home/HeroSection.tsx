import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";

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

export const HeroSection = () => {
  return (
    <AuroraBackground
      className="relative overflow-hidden bg-black text-white"
      showRadialGradient={true}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 z-10"></div>
      </div>
      <div className="px-10 relative w-full z-20 flex justify-between items-center text-left space-y-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8 backdrop-blur-sm bg-black/10 p-8 rounded-3xl border border-white/10 shadow-xl"
          whileHover={{
            boxShadow: "0 0 30px rgba(0, 255, 0, 0.2)",
            borderColor: "rgba(255, 255, 255, 0.2)",
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div variants={item} className="relative inline-block">
            <motion.h1
              className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neo-green to-blue-500 drop-shadow-md"
              animate={{
                backgroundPosition: ["0%", "100%"],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
              style={{ backgroundSize: "200%" }}
            >
              Radish Markets
            </motion.h1>
            <motion.h4
              className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300 drop-shadow-sm"
              animate={{
                backgroundPosition: ["0%", "100%"],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
              style={{ backgroundSize: "200%" }}
            >
              Say Rad or Not?
            </motion.h4>
            <motion.div
              className="absolute -inset-1 rounded-xl bg-gradient-to-r from-neo-green/20 to-blue-500/20 blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />
          </motion.div>

          <motion.p variants={item} className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-medium drop-shadow-sm leading-relaxed">
            a prediction market where fans bet on their
            favorite content creators&apos; milestones and rivalries
          </motion.p>

          <motion.div variants={item} className="flex gap-4 justify-start pt-4">
            <Link href="/markets">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="text-lg px-8 bg-neo-green text-black hover:bg-neo-green/90 relative overflow-hidden group font-bold shadow-lg">
                  <motion.span
                    className="absolute inset-0 bg-white/30"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  Explore Markets
                </Button>
              </motion.div>
            </Link>

          </motion.div>
        </motion.div>

        {/* Preview Card */}
        <motion.div variants={item} className="w-full max-w-4xl mt-8">
          <motion.div
            className="relative w-full h-80 bg-zinc-800/70 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neo-green/20 to-blue-500/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                }}
                className="flex items-center space-x-8"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="w-24 h-24 bg-neo-green rounded-2xl flex items-center justify-center shadow-lg border border-white/20"
                >
                  <span className="text-4xl">📈</span>
                </motion.div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="text-6xl"
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(255, 255, 0, 0.7))",
                    textShadow: "0 0 15px rgba(255, 255, 0, 0.8)"
                  }}
                >
                  ⚡
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-24 h-24 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg border border-white/20"
                >
                  <span className="text-4xl">🎯</span>
                </motion.div>
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-1/2 opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-neo-green rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                  <span className="text-2xl">👑</span>
                </div>
                <div className="text-left">
                  <span className="text-white font-semibold block drop-shadow-md">MrBeast</span>
                  <span className="text-white text-sm drop-shadow-md">100M Subs</span>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-right">
                  <span className="text-white font-semibold block drop-shadow-md">PewDiePie</span>
                  <span className="text-white text-sm drop-shadow-md">111M Subs</span>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                  <span className="text-2xl">🎮</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}; 