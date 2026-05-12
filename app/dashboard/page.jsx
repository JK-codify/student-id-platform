'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardCard from '@/components/DashboardCard';
import { statsService, batchService } from '@/lib/services';
import { useNotification } from '@/context/NotificationContext';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await statsService.getDashboardStats();
        const batchesData = await batchService.getAll();
        setStats(statsData);
        setBatches(batchesData.slice(0, 5));
      } catch (error) {
        addNotification('Failed to load dashboard data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [addNotification]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="inline-block animate-spin">
          <div className="w-12 h-12 border-4 border-primary border-t-secondary rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="container-main">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dark mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Students"
          value={stats?.totalStudents || 0}
          color="primary"
        />
        <DashboardCard
          title="Cards Generated"
          value={stats?.cardsGenerated || 0}
          color="secondary"
        />
        <DashboardCard
          title="Pending Generation"
          value={stats?.pendingGeneration || 0}
          color="accent"
        />
        <DashboardCard
          title="Active Batches"
          value={stats?.activeBatches || 0}
          color="primary"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-dark mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/student-form" className="card text-center hover:shadow-hover">
            <div className="text-2xl mb-2">➕</div>
            <h3 className="font-bold text-dark">Add Student</h3>
            <p className="text-sm text-gray-600">Add a new student manually</p>
          </Link>
          <Link href="/excel-import" className="card text-center hover:shadow-hover">
            <div className="text-2xl mb-2">📤</div>
            <h3 className="font-bold text-dark">Import Students</h3>
            <p className="text-sm text-gray-600">Upload Excel file</p>
          </Link>
          <Link href="/batch-management" className="card text-center hover:shadow-hover">
            <div className="text-2xl mb-2">📦</div>
            <h3 className="font-bold text-dark">Manage Batches</h3>
            <p className="text-sm text-gray-600">Organize student batches</p>
          </Link>
        </div>
      </div>

      {/* Recent Batches */}
      <div>
        <h2 className="text-2xl font-bold text-dark mb-4">Recent Batches</h2>
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-bold text-dark">Batch Name</th>
                <th className="text-left p-4 font-bold text-dark">Year</th>
                <th className="text-left p-4 font-bold text-dark">Students</th>
                <th className="text-left p-4 font-bold text-dark">Generated</th>
                <th className="text-left p-4 font-bold text-dark">Status</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={batch.id} className="border-b border-gray-100 hover:bg-light">
                  <td className="p-4 font-medium text-dark">{batch.name}</td>
                  <td className="p-4 text-dark">{batch.year}</td>
                  <td className="p-4 text-dark">{batch.studentCount}</td>
                  <td className="p-4 text-dark">{batch.cardsGenerated}</td>
                  <td className="p-4">
                    <span className={`badge badge-${batch.status.toLowerCase()}`}>
                      {batch.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
