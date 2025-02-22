"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layouts/MainLayout";
import { CustomConnectButton } from "@/components/ui/CustomConnectButton";

const features = [
  {
    title: "Prediction Markets",
    description:
      "Place bets on creator growth metrics and rivalry outcomes across major platforms",
    icon: "🎯",
    bgColor: "from-green-500/20 to-green-500/10",
  },
  {
    title: "Decentralized & Verifiable",
    description:
      "Built on Lens Blockchain with zktls enabled proofs for secure data verification",
    icon: "⛓️",
    bgColor: "from-blue-500/20 to-blue-500/10",
  },
  {
    title: "Multi-Platform Support",
    description: "Support for YouTube, Twitter, TikTok, and Instagram metrics",
    icon: "🌐",
    bgColor: "from-purple-500/20 to-purple-500/10",
  },
  {
    title: "Community-Driven",
    description:
      "Actively participate in and benefit from creator growth dynamics",
    icon: "👥",
    bgColor: "from-pink-500/20 to-pink-500/10",
  },
];

const futureFeatures = [
  {
    title: "Platform Expansion",
    description:
      "Integration with emerging platforms like Instagram Threads, Twitch, and Patreon",
    icon: "🚀",
    bgColor: "from-orange-500/20 to-orange-500/10",
  },
  {
    title: "Creator Rewards",
    description: "Reward system where creators benefit from fan engagement",
    icon: "🏆",
    bgColor: "from-yellow-500/20 to-yellow-500/10",
  },
  {
    title: "Creator Partnerships",
    description: "Collaborations with influencers to drive platform adoption",
    icon: "🤝",
    bgColor: "from-red-500/20 to-red-500/10",
  },
  {
    title: "Oracle Integration",
    description: "Robust Data oracle systems for market resolution",
    icon: "🔮",
    bgColor: "from-indigo-500/20 to-indigo-500/10",
  },
];

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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
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
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.div
              variants={item}
              className="relative inline-block"
            >
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
            <motion.p
              variants={item}
              className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto"
            >
              The first decentralized prediction market where fans bet on their
              favorite content creators&apos; milestones and rivalries
            </motion.p>
            <motion.div variants={item} className="flex gap-4 justify-center">
              <Link href="/markets">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
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

          <motion.div
            variants={item}
            className="w-full max-w-4xl"
          >
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

      {/* Vision Section */}
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

      {/* Current Features Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 bg-black text-white rounded-3xl relative overflow-hidden"
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
            Why Trade on Radish?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={item}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className={`p-8 rounded-2xl bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer relative group`}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-5xl mb-6 transform transition-transform group-hover:rotate-12"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-zinc-300 text-lg">{feature.description}</p>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100"
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

      {/* Future Features Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 bg-zinc-50 rounded-3xl relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"
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
            Coming Soon
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {futureFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={item}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className={`p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all cursor-pointer relative group overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-30`} />
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-5xl mb-6 relative z-10 transform transition-transform group-hover:rotate-12"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold mb-3 relative z-10">{feature.title}</h3>
                <p className="text-zinc-600 text-lg relative z-10">{feature.description}</p>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100"
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

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
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
        <motion.div
          variants={container}
          className="space-y-8 relative"
        >
          <motion.h2
            variants={item}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neo-green to-blue-500"
          >
            Ready to Join the Future of Creator Markets?
          </motion.h2>
          <motion.p
            variants={item}
            className="text-xl text-zinc-600 max-w-2xl mx-auto"
          >
            Start trading on creator milestones and be part of the next
            evolution in social-fi
          </motion.p>
          <motion.div variants={item} className="flex gap-4 justify-center">
            <Link href="/markets">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="text-lg px-8 bg-neo-green text-black hover:bg-neo-green/90 relative overflow-hidden group">
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
        </motion.div>
      </motion.section>
    </Layout>
  );
}
