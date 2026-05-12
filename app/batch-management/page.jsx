'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useNotification } from '@/context/NotificationContext';
import { batchService } from '@/lib/services';

const BatchManagementPage = () => {
  const [batches, setBatches] = useState([]);
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const { addNotification } = useNotification();

  const years = [2024, 2025, 2026];

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const data = await batchService.getAll();
        setBatches(data);
        setFilteredBatches(data);
      } catch (error) {
        addNotification('Failed to load batches', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchBatches();
  }, [addNotification]);

  useEffect(() => {
    let filtered = batches;

    // Filter by year
    if (yearFilter) {
      filtered = filtered.filter((batch) => batch.year === parseInt(yearFilter));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((batch) =>
        batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        batch.program.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBatches(filtered);
  }, [searchTerm, yearFilter, batches]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setYearFilter('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="inline-block animate-spin">
          <div className="w-12 h-12 border-4 border-primary border-t-secondary rounded-full"></div>
        </div>
      </div>
    );
  }

  const totalStudents = filteredBatches.reduce((sum, b) => sum + b.studentCount, 0);
  const totalGenerated = filteredBatches.reduce((sum, b) => sum + b.cardsGenerated, 0);

  return (
    <main className="container-main">
      <h1 className="text-4xl font-bold text-dark mb-2">Batch Management</h1>
      <p className="text-gray-600 mb-8">Manage and organize student batches</p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card">
          <p className="text-sm text-gray-500">Total Batches</p>
          <p className="text-3xl font-bold text-dark">{filteredBatches.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-3xl font-bold text-dark">{totalStudents}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Cards Generated</p>
          <p className="text-3xl font-bold text-dark">{totalGenerated}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-dark mb-2">Search Batch</label>
            <input
              type="text"
              placeholder="Search by batch name or program..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-dark mb-2">Filter by Year</label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="input-field w-full"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleClearFilters}
            className="btn-outline"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Batches Grid */}
      {filteredBatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBatches.map((batch) => {
            const progress = batch.studentCount > 0 
              ? (batch.cardsGenerated / batch.studentCount) * 100 
              : 0;
            
            return (
              <div key={batch.id} className="card hover:shadow-hover">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-dark mb-1">{batch.name}</h3>
                  <p className="text-sm text-gray-600">{batch.program}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-medium text-dark">{batch.studentCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Generated:</span>
                    <span className="font-medium text-dark">{batch.cardsGenerated}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 text-right">{Math.round(progress)}% Complete</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className={`badge badge-${batch.status.toLowerCase()}`}>
                    {batch.status}
                  </span>
                  <span className="text-xs text-gray-500">{batch.year}</span>
                </div>

                <div className="flex gap-2">
                  <Link href="/id-card-generation" className="btn-primary text-sm flex-1 text-center">
                    Generate Cards
                  </Link>
                  <button className="btn-outline text-sm">
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card text-center py-12">
          <p className="text-gray-600 mb-4">No batches found</p>
          <p className="text-sm text-gray-500">Try adjusting your filters or create a new batch</p>
        </div>
      )}
    </main>
  );
};

export default BatchManagementPage;
