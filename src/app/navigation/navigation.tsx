import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Brand */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold tracking-wide">
              UserLoginApp
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-indigo-400 transition">Home</Link>
            <Link href="/signin" className="hover:text-indigo-400 transition">Sign In</Link>
            <Link href="/dashboard" className="hover:text-indigo-400 transition">Dashboard</Link>
          </div>

          {/* Mobile Menu Icon (optional logic can be added) */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white focus:outline-none focus:ring">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
