'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useNotification } from '@/context/NotificationContext';
import { studentService } from '@/lib/services';

const StudentFormPage = () => {
  const router = useRouter();
  const { addNotification } = useNotification();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await studentService.create(data);
      addNotification('Student added successfully!', 'success');
      router.push('/dashboard');
    } catch (error) {
      addNotification('Failed to add student', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-main">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-dark mb-2">Add Student</h1>
        <p className="text-gray-600 mb-8">Enter student information manually</p>

        <form onSubmit={handleSubmit(onSubmit)} className="card space-y-8">
          {/* Personal Information */}
          <div>
            <h2 className="text-2xl font-bold text-dark mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">First Name *</label>
                <input
                  {...register('firstName', { required: 'First name is required' })}
                  className="input-field"
                  placeholder="John"
                />
                {errors.firstName && <p className="text-danger text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Last Name *</label>
                <input
                  {...register('lastName', { required: 'Last name is required' })}
                  className="input-field"
                  placeholder="Doe"
                />
                {errors.lastName && <p className="text-danger text-xs mt-1">{errors.lastName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Date of Birth *</label>
                <input
                  type="date"
                  {...register('dateOfBirth', { required: 'Date of birth is required' })}
                  className="input-field"
                />
                {errors.dateOfBirth && <p className="text-danger text-xs mt-1">{errors.dateOfBirth.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">ID Number *</label>
                <input
                  {...register('idNumber', { required: 'ID number is required' })}
                  className="input-field"
                  placeholder="CS2024001"
                />
                {errors.idNumber && <p className="text-danger text-xs mt-1">{errors.idNumber.message}</p>}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-dark mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Email *</label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="input-field"
                  placeholder="student@school.com"
                />
                {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Phone *</label>
                <input
                  {...register('phone', { required: 'Phone is required' })}
                  className="input-field"
                  placeholder="+1234567890"
                />
                {errors.phone && <p className="text-danger text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h2 className="text-2xl font-bold text-dark mb-4">Academic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Program *</label>
                <input
                  {...register('program', { required: 'Program is required' })}
                  className="input-field"
                  placeholder="Computer Science"
                />
                {errors.program && <p className="text-danger text-xs mt-1">{errors.program.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Year *</label>
                <select
                  {...register('year', { required: 'Year is required' })}
                  className="input-field"
                >
                  <option value="">Select year</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
                {errors.year && <p className="text-danger text-xs mt-1">{errors.year.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Batch *</label>
                <input
                  {...register('batch', { required: 'Batch is required' })}
                  className="input-field"
                  placeholder="CS-2024-A"
                />
                {errors.batch && <p className="text-danger text-xs mt-1">{errors.batch.message}</p>}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Add Student'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default StudentFormPage;
