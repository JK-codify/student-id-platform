import { studentService } from '@/lib/services';

export async function GET() {
  try {
    const students = await studentService.getAll();
    return new Response(JSON.stringify({ success: true, data: students }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to fetch students' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request) {
  const student = await request.json();

  try {
    const newStudent = await studentService.create(student);
    return new Response(JSON.stringify({ success: true, data: newStudent }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to create student' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
