"use client";

import { useUser } from "@/hooks/useUser";
import { useAlert } from "@/context/AlertContext";
import { signOut } from "next-auth/react";

export default function DashboardPage() {
  const user = useUser();
  const { setAlert } = useAlert();
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={() => {
              signOut();
              setAlert({ type: "info", message: "You have successfully logged out."});
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Welcome Section */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold">
            Welcome{user?.name ? `, ${user.name}` : ""}!
          </h2>
          <p className="text-gray-600">
            You're signed in with <strong>{user?.email}</strong>
          </p>
        </div>

        {/* Example Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 shadow rounded-xl">
            <h3 className="text-lg font-semibold text-indigo-600">Your Activity</h3>
            <p className="text-gray-600 mt-2">No recent activity.</p>
          </div>

          <div className="bg-white p-5 shadow rounded-xl">
            <h3 className="text-lg font-semibold text-indigo-600">Stats</h3>
            <p className="text-gray-600 mt-2">Coming soon...</p>
          </div>

          <div className="bg-white p-5 shadow rounded-xl">
            <h3 className="text-lg font-semibold text-indigo-600">Settings</h3>
            <p className="text-gray-600 mt-2">Manage your preferences.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
