'use client';
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

export default function Home() {
  return (
    <main className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center space-y-6 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
        {/* Animated SVG Blob */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-100 opacity-40 rounded-full blur-3xl animate-float z-0" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-100 opacity-30 rounded-full blur-3xl animate-float z-0" />

        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 animate-fade-in">
            Welcome to <br /><span className="text-indigo-600">Your App Name Here</span>
          </h1>
          <br/>
          <span className="text-xl md:text-4xl text-gray-600 max-w-2xl mt-4 animate-fade-in">
            Build faster. Learn smarter. Empower your workflow with a modern full-stack platform.
          </span>

          <div className="flex justify-center gap-6 pt-6 animate-fade-in">
            <Link href="/signin" className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition">
              Sign In
            </Link>
            <Link href="/register" className="px-6 py-3 border border-gray-300 text-gray-800 rounded-lg text-lg font-medium hover:bg-gray-100 transition">
              Register
            </Link>
          </div>
        </div>
      </section>


      {/* Purpose */}
      <AnimatedSection title="👑 Purpose" bgFrom="#ffddff" bgTo="#16213e">
        <motion.section
            className="flex flex-col justify-center items-center text-white px-6 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
        >
          <p className="text-lg md:text-3xl text-gray-700">
            This application was created as a technical showcase for potential employers.
            It demonstrates full-stack proficiency by building a performant, feature-rich,
            and scalable financial platform from scratch.
          </p>
        </motion.section>
      </AnimatedSection>

      {/* Features */}
        
      <AnimatedSection title="🔍 Features" bgFrom="#ffffff" bgTo="#003483">
        <motion.section
            className="flex flex-col justify-center items-center text-white px-6 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
        >
          <ul className="max-w-xl md:text-2xl mx-auto list-disc text-left text-lg text-white pl-6 space-y-2">
            <li>Real-time stock search with live charts</li>
            <li>Persistent favorites dashboard</li>
            <li>Secure user authentication with session management</li>
            <li>Responsive, mobile-friendly design</li>
            <li>🚀 NFT minting from saved stock data</li>
            <li>🦊 MetaMask wallet integration for on-chain interaction</li>
            <li>🔗 Smart contract deployment & local test network support</li>
          </ul>
        </motion.section>
      </AnimatedSection>

      {/* Tech Stack */}

      <AnimatedSection title="🛠️ Technologies" bgFrom="#ffffff" bgTo="#00ffcc">
        <motion.section
            className="flex flex-col justify-center items-center text-white px-6 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
        >
          <ul className="max-w-xl md:text-2xl mx-auto list-disc text-left text-lg text-gray-700 pl-6 space-y-2">
            <li><strong>Frontend:</strong> React, TypeScript, Tailwind CSS, Recharts</li>
            <li><strong>Backend:</strong> Next.js App Router, Prisma, PostgreSQL</li>
            <li><strong>Auth:</strong> NextAuth.js</li>
            <li><strong>State Management:</strong> Redux Toolkit</li>
            <li><strong>Blockchain:</strong> Hardhat, Ethers.js, Solidity, OpenZeppelin</li>
            <li><strong>Wallet:</strong> MetaMask, RainbowKit, WalletConnect</li>
            <li><strong>API:</strong> Polygon.io</li>
            <li><strong>Hosting:</strong> Vercel</li>
          </ul>
        </motion.section>
        <div className="flex justify-center gap-6 pt-6 animate-fade-in">
          <Link href="/signin" className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition">
            Sign In
          </Link>
          <Link href="/register" className="px-6 py-3 border border-gray-300 text-gray-800 rounded-lg text-lg font-medium hover:bg-gray-100 transition">
            Register
          </Link>
        </div>
      </AnimatedSection>
    </main>
  );
}
