import { NextResponse } from 'next/server';
import { getUserFromApiRoute } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getUserFromApiRoute();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ user });
}
