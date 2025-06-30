import React, { Suspense } from "react";
import SignInForm from "./signinForm";

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading sign-in form...</div>}>
      <SignInForm />
    </Suspense>
  );
}
