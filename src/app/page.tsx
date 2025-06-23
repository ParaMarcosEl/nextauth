// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Welcome to <span className="text-indigo-600">YourAppName</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Build faster. Learn smarter. Empower your workflow with a modern full-stack platform.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/signin"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-base font-medium hover:bg-indigo-700 transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 border border-gray-300 text-gray-800 rounded-lg text-base font-medium hover:bg-gray-100 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
