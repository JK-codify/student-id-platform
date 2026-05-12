'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import { authService } from '@/lib/services';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@school.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const { addNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await authService.login(email, password);
      if (result.success) {
        login(result.user, result.token);
        addNotification('Login successful!', 'success');
        router.push('/dashboard');
      } else {
        addNotification(result.message || 'Login failed', 'error');
      }
    } catch (error) {
      addNotification('An error occurred during login', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gradient mb-8">Student ID Platform</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="admin@school.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-8 p-4 bg-light rounded border border-gray-200">
          <p className="text-sm font-medium text-dark mb-2">Demo Credentials:</p>
          <p className="text-xs text-gray-600">Email: <span className="font-mono">admin@school.com</span></p>
          <p className="text-xs text-gray-600">Password: <span className="font-mono">password</span></p>
        </div>
      </div>
    </div>
  );
}
