import { Suspense } from "react";
import SignInForm from "./signinForm";
import React from "react";

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading sign-in form...</div>}>
      <SignInForm />
    </Suspense>
  );
}
