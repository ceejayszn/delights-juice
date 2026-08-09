import { NextResponse } from 'next/server';
import { getCustomers } from '@/lib/db';

export async function GET() {
  try {
    const customers = await getCustomers();
    return NextResponse.json({ success: true, customers });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch customers: ' + error.message },
      { status: 500 }
    );
  }
}
