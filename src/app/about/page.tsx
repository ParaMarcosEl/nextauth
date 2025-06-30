"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-indigo-700">
          About Para El
        </h1>

        {/* Profile Picture */}
        <div className="flex justify-center">
          <div className="w-40 h-40 relative rounded-full overflow-hidden shadow-lg border-4 border-indigo-600">
            <Image
              src="/ProfilePic.jpg" // 👈 Place your image in `public/profile.jpg`
              alt="Profile photo"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>
        <section className="text-lg leading-relaxed">
          <p>
            I&apos;m a seasoned full-stack engineer who thrives on solving complex problems with clean, modern code. I enjoy planning to the end, staying organized, and managing technical risk. I&apos;m passionate about building polished, scalable web applications and taking ideas from concept to production.
          </p>
          <p className="mt-4">
            My experience spans e-commerce, health tech, enterprise platforms, and data visualization, where I&apos;ve led front-end architecture, mentored engineers, and integrated everything from GraphQL APIs to cloud services. I build with React, Next.js, TypeScript, and Node.js — but I&apos;ve never met a tech stack I couldn&apos;t navigate.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Skills</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Languages: JavaScript, TypeScript, Python, C#, Java, HTML5, CSS3</li>
            <li>Frameworks & Tools: ReactJS, Next.js, Jest, React Testing Library</li>
            <li>Databases & APIs: GraphQL, MongoDB, PostgreSQL</li>
            <li>CI/CD & Cloud: GCP, AWS, Shopify Hydrogen, App Bridge</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Experience Highlights</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Grafftopia</strong> – Built and scaled Shopify e-commerce solutions with React/Next.js</li>
            <li><strong>32Health</strong> – Led MVP for a healthcare platform using Next.js, Redux, and GraphQL</li>
            <li><strong>The Home Depot</strong> – Created personalized web experiences and tracked KPIs in New Relic</li>
            <li><strong>Madison Square Garden</strong> – Developed media-rich applications using AWS and React</li>
            <li><strong>d-Wise</strong> – Built data visualizations for clinical trials using D3.js and Neo4j</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Education</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>General Assembly – Web Development Bootcamp (2017)</li>
            <li>Per Scholas – Computer Programming (2016)</li>
            <li>Katherine Gibbs – Networking & Telecommunications (2003)</li>
            <li>Bachelor&apos;s in Computer Science</li>
          </ul>
        </section>

        <section className="text-sm text-gray-500 text-center pt-10">
          <p>Para El · parael82@gmail.com · (347) 927-2728 · Bronx, NY</p>
          <p className="mt-1">
            <Link href="/" className="text-indigo-600 hover:underline">
              Back to Home
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
