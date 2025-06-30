"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAlert } from "@/context/AlertContext";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/slices/userSlice";
import { getSession } from "next-auth/react";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const { setAlert } = useAlert();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
  } = useForm<FormData>();

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "CredentialsSignin") {
      setError("Invalid email or password.");
    } else if (errorParam) {
      setError("Something went wrong.");
    }
  }, [searchParams]);

  const onSubmit = async (data: FormData) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      // Get session info from NextAuth
      const session = await getSession();
        if (session?.user && session.user.email) {
          setAlert({ type: "success", message: `You have successfully logged in.`})
          const userData = {
              id: session.user.id || "", // Add this via session callback if needed
              name: session.user.name || "",
              email: session.user.email
          };
          dispatch(setUser(userData));
        }
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="page min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              placeholder="Email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
            <div className="text-center" >or</div>
          <button
            onClick={() => signIn("github")}
            className="mt-4 w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
          >
            Sign in with GitHub
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don’t have an account?{" "}
          <Link href="/register" className="text-indigo-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
