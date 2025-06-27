// src/components/Redirector.tsx
'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useAlert } from '@/context/AlertContext';
import { useUser } from '@/hooks/useUser';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

type RedirectorProps = {
  children: ReactNode;
};

export default function Redirector({ children }: RedirectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { setAlert } = useAlert();
  const { user } = useUser();

  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!user?.id) {
      router.push(`/signin`);
      setAlert({ type: "error", message: "You must be signed in to view this page."});
      return;
    }

    setLoading(false);
  }, [status, session, pathname]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
}
