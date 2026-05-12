'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/context/NotificationContext';
import { studentService } from '@/lib/services';
import * as XLSX from 'xlsx';

const ExcelImportPage = () => {
  const router = useRouter();
  const { addNotification } = useNotification();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) processFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) processFile(droppedFile);
  };

  const processFile = (selectedFile) => {
    // Validate file type
    const validTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    if (!validTypes.includes(selectedFile.type)) {
      addNotification('Please upload a valid Excel or CSV file', 'error');
      return;
    }

    setFile(selectedFile);

    // Preview first 5 rows
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setPreview(jsonData.slice(0, 5));
      addNotification(`File loaded: ${jsonData.length} records found`, 'info');
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleImport = async () => {
    if (!file) {
      addNotification('Please select a file', 'error');
      return;
    }

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const result = await studentService.importBulk(jsonData);
        if (result.success) {
          addNotification(`Successfully imported ${result.count} students!`, 'success');
          router.push('/dashboard');
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      addNotification('Failed to import students', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-main">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-dark mb-2">Import Students</h1>
        <p className="text-gray-600 mb-8">Upload an Excel or CSV file to import multiple students</p>

        {/* Upload Area */}
        <div className="card mb-8">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              dragging ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-300'
            }`}
          >
            <div className="text-4xl mb-2">📁</div>
            <h3 className="text-lg font-bold text-dark mb-1">Drag and drop your file</h3>
            <p className="text-gray-600 mb-4">or click to select a file</p>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="btn-primary cursor-pointer inline-block">
              Choose File
            </label>
            <p className="text-xs text-gray-500 mt-4">Supported formats: Excel (.xlsx, .xls), CSV (.csv)</p>
          </div>

          {file && (
            <div className="mt-4 p-4 bg-light rounded">
              <p className="text-sm text-dark">
                <strong>File:</strong> {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
            </div>
          )}
        </div>

        {/* Preview */}
        {preview.length > 0 && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-dark mb-4">Preview (First 5 records)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    {Object.keys(preview[0]).map((key) => (
                      <th key={key} className="text-left p-2 font-bold text-dark">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      {Object.values(row).map((value, vIdx) => (
                        <td key={vIdx} className="p-2 text-dark">
                          {String(value).substring(0, 20)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleImport}
            disabled={!file || loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? 'Importing...' : 'Import Students'}
          </button>
          <button
            onClick={() => router.back()}
            className="btn-outline"
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
};

export default ExcelImportPage;
