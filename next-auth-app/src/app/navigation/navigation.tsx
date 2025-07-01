'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ConnectButton } from "@rainbow-me/rainbowkit";

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
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
            <div className="ml-4">
              <ConnectButton />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden px-2 pt-2 pb-4 space-y-2">
            <NavLinks mobile />
            <div className="pt-2">
              <ConnectButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// 🔗 Shared Nav Links Component
function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const linkClass = mobile
    ? "block text-white hover:text-indigo-400 transition px-3 py-2 rounded-md"
    : "hover:text-indigo-400 transition";

  return (
    <>
      <Link href="/" className={linkClass}>Home</Link>
      <Link href="/signin" className={linkClass}>Sign In</Link>
      <Link href="/dashboard" className={linkClass}>Dashboard</Link>
      <Link href="/about" className={linkClass}>About</Link>
      <Link target="_blank" href="http://github.com/paramarcosel/nextauth" className={linkClass}>Github</Link>
    </>
  );
}
