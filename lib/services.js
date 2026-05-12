// Mock API Services - Replace with real API calls

// Mock student data
const mockStudents = [
  {
    id: 'STU001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@school.com',
    phone: '+1234567890',
    program: 'Computer Science',
    year: 2024,
    batch: 'CS-2024-A',
    dateOfBirth: '2005-06-15',
    idNumber: 'CS2024001',
  },
  {
    id: 'STU002',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@school.com',
    phone: '+1234567891',
    program: 'Business',
    year: 2024,
    batch: 'BUS-2024-A',
    dateOfBirth: '2005-08-22',
    idNumber: 'BUS2024001',
  },
  {
    id: 'STU003',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.j@school.com',
    phone: '+1234567892',
    program: 'Engineering',
    year: 2025,
    batch: 'ENG-2025-A',
    dateOfBirth: '2006-03-10',
    idNumber: 'ENG2025001',
  },
];

// Mock batch data
const mockBatches = [
  {
    id: 'BATCH001',
    name: 'CS-2024-A',
    year: 2024,
    program: 'Computer Science',
    studentCount: 45,
    cardsGenerated: 40,
    status: 'Active',
    createdAt: '2024-01-15',
  },
  {
    id: 'BATCH002',
    name: 'BUS-2024-A',
    year: 2024,
    program: 'Business Administration',
    studentCount: 38,
    cardsGenerated: 35,
    status: 'Active',
    createdAt: '2024-02-20',
  },
  {
    id: 'BATCH003',
    name: 'ENG-2025-A',
    year: 2025,
    program: 'Engineering',
    studentCount: 52,
    cardsGenerated: 20,
    status: 'Pending',
    createdAt: '2025-01-10',
  },
  {
    id: 'BATCH004',
    name: 'MED-2024-A',
    year: 2024,
    program: 'Medicine',
    studentCount: 60,
    cardsGenerated: 60,
    status: 'Completed',
    createdAt: '2024-03-05',
  },
];

// Student Services
export const studentService = {
  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockStudents), 500);
    });
  },

  async getById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockStudents.find((s) => s.id === id) || null);
      }, 300);
    });
  },

  async create(student) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newStudent = {
          id: `STU${String(mockStudents.length + 1).padStart(3, '0')}`,
          ...student,
        };
        mockStudents.push(newStudent);
        resolve(newStudent);
      }, 500);
    });
  },

  async update(id, student) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockStudents.findIndex((s) => s.id === id);
        if (index !== -1) {
          mockStudents[index] = { ...mockStudents[index], ...student };
          resolve(mockStudents[index]);
        } else {
          resolve(null);
        }
      }, 500);
    });
  },

  async delete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockStudents.findIndex((s) => s.id === id);
        if (index !== -1) {
          mockStudents.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300);
    });
  },

  async importBulk(students) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const imported = students.map((s, idx) => ({
          id: `STU${String(mockStudents.length + idx + 1).padStart(3, '0')}`,
          ...s,
        }));
        mockStudents.push(...imported);
        resolve({
          success: true,
          count: imported.length,
          students: imported,
        });
      }, 1000);
    });
  },
};

// Batch Services
export const batchService = {
  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockBatches), 500);
    });
  },

  async getById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockBatches.find((b) => b.id === id) || null);
      }, 300);
    });
  },

  async getByYear(year) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockBatches.filter((b) => b.year === year));
      }, 300);
    });
  },

  async create(batch) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBatch = {
          id: `BATCH${String(mockBatches.length + 1).padStart(3, '0')}`,
          ...batch,
          createdAt: new Date().toISOString().split('T')[0],
        };
        mockBatches.push(newBatch);
        resolve(newBatch);
      }, 500);
    });
  },

  async generateCards(batchId, studentIds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const batch = mockBatches.find((b) => b.id === batchId);
        if (batch) {
          batch.cardsGenerated += studentIds.length;
          resolve({
            success: true,
            cardsGenerated: studentIds.length,
            batch,
          });
        } else {
          resolve({ success: false });
        }
      }, 800);
    });
  },
};

// ID Card Services
export const cardService = {
  async generateCard(studentId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const student = mockStudents.find((s) => s.id === studentId);
        if (student) {
          resolve({
            success: true,
            card: {
              id: `CARD${Date.now()}`,
              student,
              generatedAt: new Date().toISOString(),
            },
          });
        } else {
          resolve({ success: false });
        }
      }, 500);
    });
  },

  async generateBulkCards(studentIds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cards = studentIds
          .map((id) => mockStudents.find((s) => s.id === id))
          .filter(Boolean)
          .map((student) => ({
            id: `CARD${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            student,
            generatedAt: new Date().toISOString(),
          }));
        resolve({
          success: true,
          count: cards.length,
          cards,
        });
      }, 1000);
    });
  },
};

// Authentication Services
export const authService = {
  async login(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'admin@school.com' && password === 'password') {
          resolve({
            success: true,
            user: {
              id: 'ADMIN001',
              email,
              name: 'Admin User',
              role: 'administrator',
            },
            token: 'mock-jwt-token-' + Date.now(),
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid email or password',
          });
        }
      }, 800);
    });
  },

  async logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
    });
  },
};

// Statistics Services
export const statsService = {
  async getDashboardStats() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalStudents: mockStudents.length,
          totalBatches: mockBatches.length,
          cardsGenerated: mockBatches.reduce((sum, b) => sum + b.cardsGenerated, 0),
          pendingGeneration: mockBatches.reduce((sum, b) => sum + (b.studentCount - b.cardsGenerated), 0),
          activeBatches: mockBatches.filter((b) => b.status === 'Active').length,
        });
      }, 500);
    });
  },
};
