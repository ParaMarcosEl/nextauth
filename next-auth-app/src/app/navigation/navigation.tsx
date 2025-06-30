'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-wide">
            Para El | NextJS
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-indigo-400 transition">Home</Link>
            <Link href="/signin" className="hover:text-indigo-400 transition">Sign In</Link>
            <Link href="/dashboard" className="hover:text-indigo-400 transition">Dashboard</Link>
            <Link href="/about" className="hover:text-indigo-400 transition">About</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:ring"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 px-2 pb-4">
            <Link href="/" className="block text-white hover:text-indigo-400 transition">Home</Link>
            <Link href="/signin" className="block text-white hover:text-indigo-400 transition">Sign In</Link>
            <Link href="/dashboard" className="block text-white hover:text-indigo-400 transition">Dashboard</Link>
            <Link href="/about" className="block text-white hover:text-indigo-400 transition">About</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
