'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || pathname === '/login') {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold text-gradient">
          Student ID Platform
        </Link>

        <div className="hidden md:flex gap-8">
          <Link href="/dashboard" className="text-dark hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/student-form" className="text-dark hover:text-primary transition-colors">
            Add Student
          </Link>
          <Link href="/excel-import" className="text-dark hover:text-primary transition-colors">
            Import
          </Link>
          <Link href="/id-card-generation" className="text-dark hover:text-primary transition-colors">
            Generate Cards
          </Link>
          <Link href="/batch-management" className="text-dark hover:text-primary transition-colors">
            Batches
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="text-right">
              <p className="text-sm font-medium text-dark">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="bg-danger text-white px-4 py-2 rounded transition-all hover:bg-opacity-90"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
