"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
    formState: {},
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

          <button
            type="button"
            onClick={() => signIn("google")}
            className="w-full py-2 px-4 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M21.35 11.1H12v2.92h5.35c-.23 1.22-1.42 3.6-5.35 3.6-3.21 0-5.83-2.63-5.83-5.86s2.62-5.86 5.83-5.86c1.83 0 3.05.78 3.75 1.45l2.56-2.48C16.66 3.83 14.5 3 12 3 6.77 3 2.65 7.13 2.65 12.34s4.12 9.34 9.35 9.34c5.4 0 8.95-3.79 8.95-9.12 0-.61-.06-1.08-.2-1.46z"
              />
            </svg>
            Sign in with Google
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
