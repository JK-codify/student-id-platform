'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [isAuthenticated, loading, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin">
          <div className="w-12 h-12 border-4 border-primary border-t-secondary rounded-full"></div>
        </div>
        <p className="mt-4 text-gray-500">Loading...</p>
      </div>
    </div>
  );
}
