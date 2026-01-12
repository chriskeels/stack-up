'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/app/context/AuthContext';

export default function Home() {
  const { token } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
  }, [token, router]);

  return null;
}
