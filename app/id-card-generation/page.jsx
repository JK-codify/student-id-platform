'use client';

import { useEffect, useState } from 'react';
import { useNotification } from '@/context/NotificationContext';
import { studentService, cardService } from '@/lib/services';

const IdCardGenerationPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await studentService.getAll();
        setStudents(data);
      } catch (error) {
        addNotification('Failed to load students', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [addNotification]);

  const toggleStudent = (id) => {
    const newSelected = new Set(selectedStudents);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedStudents(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedStudents.size === students.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(students.map((s) => s.id)));
    }
  };

  const handleGenerateCards = async () => {
    if (selectedStudents.size === 0) {
      addNotification('Please select at least one student', 'error');
      return;
    }

    setGenerating(true);
    try {
      const result = await cardService.generateBulkCards(Array.from(selectedStudents));
      if (result.success) {
        addNotification(`Generated ${result.count} ID cards!`, 'success');
        setSelectedStudents(new Set());
      }
    } catch (error) {
      addNotification('Failed to generate cards', 'error');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadCards = () => {
    if (selectedStudents.size === 0) {
      addNotification('Please select at least one student', 'error');
      return;
    }
    addNotification('Download will start shortly...', 'info');
  };

  const handlePrintCards = () => {
    if (selectedStudents.size === 0) {
      addNotification('Please select at least one student', 'error');
      return;
    }
    window.print();
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

  return (
    <main className="container-main">
      <h1 className="text-4xl font-bold text-dark mb-2">Generate ID Cards</h1>
      <p className="text-gray-600 mb-8">Select students and generate their ID cards</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Student Selection */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark">Students</h2>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedStudents.size === students.length && students.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-medium text-dark">Select All</span>
              </label>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {students.map((student) => (
                <label
                  key={student.id}
                  className="flex items-center gap-3 p-3 rounded hover:bg-light transition-colors cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedStudents.has(student.id)}
                    onChange={() => toggleStudent(student.id)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-dark">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {student.idNumber} • {student.program}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ID Card Preview */}
        <div>
          {selectedStudents.size > 0 && (
            <div className="card">
              <h2 className="text-2xl font-bold text-dark mb-4">Preview</h2>
              {Array.from(selectedStudents).slice(0, 1).map((studentId) => {
                const student = students.find((s) => s.id === studentId);
                return (
                  <div
                    key={studentId}
                    className="bg-gradient-to-br from-primary to-secondary text-white rounded-lg p-6 aspect-video flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      <p className="text-xs opacity-75 mb-2">STUDENT ID CARD</p>
                      <h3 className="text-lg font-bold">
                        {student?.firstName} {student?.lastName}
                      </h3>
                    </div>
                    <div className="text-xs space-y-1">
                      <p>ID: <span className="font-mono">{student?.idNumber}</span></p>
                      <p>{student?.program}</p>
                      <p>Year: {student?.year}</p>
                    </div>
                  </div>
                );
              })}
              <p className="text-xs text-gray-500 mt-4 text-center">
                {selectedStudents.size} student{selectedStudents.size > 1 ? 's' : ''} selected
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-8 right-8 flex gap-3 print:hidden">
        <button
          onClick={handlePrintCards}
          disabled={selectedStudents.size === 0 || generating}
          className="btn-secondary disabled:opacity-50 rounded-full w-14 h-14 flex items-center justify-center text-xl"
          title="Print Cards"
        >
          🖨️
        </button>
        <button
          onClick={handleDownloadCards}
          disabled={selectedStudents.size === 0 || generating}
          className="btn-secondary disabled:opacity-50 rounded-full w-14 h-14 flex items-center justify-center text-xl"
          title="Download Cards"
        >
          💾
        </button>
        <button
          onClick={handleGenerateCards}
          disabled={selectedStudents.size === 0 || generating}
          className="btn-primary disabled:opacity-50 rounded-full w-14 h-14 flex items-center justify-center text-xl shadow-lg"
          title="Generate Cards"
        >
          {generating ? '⏳' : '✓'}
        </button>
      </div>
    </main>
  );
};

export default IdCardGenerationPage;
