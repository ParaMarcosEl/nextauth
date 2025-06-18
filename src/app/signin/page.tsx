"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "CredentialsSignin") {
      setError("Invalid email or password.");
    } else if (errorParam) {
      setError("An error occurred. Please try again.");
    }
  }, [searchParams]);

  const onSubmit = async (data: FormData) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input placeholder="Email" {...register("email", { required: true })} />
        {errors.email && <span>Email is required</span>}

        <input type="password" placeholder="Password" {...register("password", { required: true })} />
        {errors.password && <span>Password is required</span>}

        <button type="submit">Sign In</button>
      </form>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

      <hr style={{ margin: "20px 0" }} />

      <button onClick={() => signIn("google")}>
        Sign in with Google
      </button>

      <p style={{ marginTop: 16 }}>
        Don’t have an account?{" "}
        <Link href="/register" style={{ color: "blue", textDecoration: "underline" }}>
          Register here
        </Link>
      </p>
    </div>
  );
}
