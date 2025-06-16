"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [providers, setProviders] = useState<any>(null); /* eslint-disable  @typescript-eslint/no-explicit-any */

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Sign In</h1>
      {providers &&
        Object.values(providers).map((provider: any) => ( /* eslint-disable  @typescript-eslint/no-explicit-any */
          <div key={provider.name}>
            <button
              onClick={() => signIn(provider.id)}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
}
