import { NextResponse } from 'next/server';
import { getMenuItems, updateMenuItem } from '@/lib/db';

export async function GET() {
  try {
    const items = await getMenuItems();
    return NextResponse.json({ success: true, items });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const updated = await updateMenuItem(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Menu item not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
