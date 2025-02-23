import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CustomConnectButton } from "@/components/ui/CustomConnectButton";

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
    <section className="rounded-3xl min-h-screen relative overflow-hidden bg-gradient-to-b from-black to-zinc-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-r from-neo-green/20 to-blue-500/20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 py-32 flex flex-col justify-center items-center text-center space-y-12">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
          <motion.div variants={item} className="relative inline-block">
            <motion.h1
              className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neo-green to-blue-500"
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
              Rad or Not?
            </motion.h1>
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
          
          <motion.p variants={item} className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto">
            The first decentralized prediction market where fans bet on their
            favorite content creators&apos; milestones and rivalries
          </motion.p>
          
          <motion.div variants={item} className="flex gap-4 justify-center">
            <Link href="/markets">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="text-lg px-8 bg-neo-green text-black hover:bg-neo-green/90 relative overflow-hidden group">
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
            <CustomConnectButton />
          </motion.div>
        </motion.div>

        {/* Preview Card */}
        <motion.div variants={item} className="w-full max-w-4xl">
          <motion.div
            className="relative w-full h-80 bg-zinc-800/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-zinc-700/50"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neo-green/10 to-blue-500/10" />
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
                  className="w-24 h-24 bg-neo-green rounded-2xl flex items-center justify-center shadow-lg"
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
                >
                  ⚡
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-24 h-24 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <span className="text-4xl">🎯</span>
                </motion.div>
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-1/2" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-neo-green rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">👑</span>
                </div>
                <div className="text-left">
                  <span className="text-white font-semibold block">MrBeast</span>
                  <span className="text-zinc-400 text-sm">100M Subs</span>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-right">
                  <span className="text-white font-semibold block">PewDiePie</span>
                  <span className="text-zinc-400 text-sm">111M Subs</span>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🎮</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}; 