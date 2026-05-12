import { authService } from '@/lib/services';

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const result = await authService.login(email, password);
    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 401,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
