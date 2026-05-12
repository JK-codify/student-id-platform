import { batchService } from '@/lib/services';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year');

  try {
    let batches;
    if (year) {
      batches = await batchService.getByYear(parseInt(year));
    } else {
      batches = await batchService.getAll();
    }

    return new Response(JSON.stringify({ success: true, data: batches }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to fetch batches' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request) {
  const batch = await request.json();

  try {
    const newBatch = await batchService.create(batch);
    return new Response(JSON.stringify({ success: true, data: newBatch }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to create batch' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
