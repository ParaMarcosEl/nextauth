// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl text-center space-y-6">
        <br />
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
        <div className="max-w-4xl mx-auto space-y-8">

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900"> 👑 Purpose</h2>
            <p className="text-gray-700">
              This application was created as a technical showcase for potential employers.
              It demonstrates full-stack proficiency by building a performant, feature-rich,
              and scalable financial platform from scratch.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl text-gray-700 font-bold mb-2">🔍 Features</h2>
            <div className="max-w-xl mx-auto text-left">
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Real-time stock search with live charts</li>
                <li>Persistent favorites dashboard</li>
                <li>Secure user authentication with session management</li>
                <li>Responsive, mobile-friendly design</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">🛠️ Technologies Used</h2>
            
            <div className="max-w-xl mx-auto text-left">
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li><strong>Frontend:</strong> React, TypeScript, Tailwind CSS, Recharts</li>
              <li><strong>Backend:</strong> Next.js App Router, Prisma, PostgreSQL</li>
              <li><strong>Auth:</strong> NextAuth.js</li>
              <li><strong>State Management:</strong> Redux Toolkit</li>
              <li><strong>API:</strong> Polygon.io</li>
              <li><strong>Hosting:</strong> Vercel</li>
              </ul>
            </div>
          </section>
        </div>

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
        <br />
      </div>
    </main>
  );
}
