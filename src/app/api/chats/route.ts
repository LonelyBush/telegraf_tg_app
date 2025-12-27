import { messageStore } from '@/lib/message-store';
import { NextResponse } from 'next/server';

// GET /api/chats - получить список чатов
export async function GET() {
  const chats = messageStore.getChats();
  return NextResponse.json({ chats });
}
