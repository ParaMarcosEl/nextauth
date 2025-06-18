"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
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
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" {...register("email", { required: true })} />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <button type="submit">Sign In</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Don’t have an account?{" "}
        <Link href="/register" style={{ color: "blue" }}>
          Register here
        </Link>
      </p>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  );
}
