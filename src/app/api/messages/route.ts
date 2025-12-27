import { NextRequest, NextResponse } from 'next/server';
import { sendMessageToChat } from '@/lib/chat-bot';
import { messageStore } from '@/lib/message-store';

// GET /api/messages - получить сообщения
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const chatId = searchParams.get('chatId');
  const since = searchParams.get('since');

  let messages;
  if (since) {
    messages = messageStore.getMessagesSince(
      parseInt(since, 10),
      chatId ? parseInt(chatId, 10) : undefined,
    );
  } else {
    messages = messageStore.getMessages(
      chatId ? parseInt(chatId, 10) : undefined,
    );
  }
  console.log(messages);
  return NextResponse.json({ messages });
}

// POST /api/messages - отправить сообщение
export async function POST(request: NextRequest) {
  try {
    const { chatId, text } = await request.json();

    if (!chatId || !text) {
      return NextResponse.json(
        { error: 'chatId and text are required' },
        { status: 400 },
      );
    }

    await sendMessageToChat(chatId, text);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 },
    );
  }
}
