import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest): Promise<void> {
  if (request.nextUrl.pathname === '/') {
    redirect('/chat');
  }
}