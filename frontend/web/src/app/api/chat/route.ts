import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { convertToCoreMessages, streamText } from 'ai';
import { aiConversations, aiMessages, auth, db } from '@hershield/server';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? process.env.GEMINI_API_KEY;
const modelName = process.env.GOOGLE_GENERATIVE_AI_MODEL ?? 'models/gemini-1.5-pro-latest';

export async function POST(req: Request) {
  try {
    const authorizationHeader = req.headers.get('authorization');
    const token = authorizationHeader?.startsWith('Bearer ') ? authorizationHeader.slice(7) : null;

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required for Guardian chat.' },
        { status: 401 },
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI provider unavailable. Set GOOGLE_GENERATIVE_AI_API_KEY or GEMINI_API_KEY.' },
        { status: 503 },
      );
    }

    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    if (!messages.length) {
      return NextResponse.json({ error: 'No messages provided.' }, { status: 400 });
    }

    let userId: string;
    try {
      const decodedToken = await auth.verifyIdToken(token);
      userId = decodedToken.uid;
    } catch {
      return NextResponse.json({ error: 'Invalid or expired authentication token.' }, { status: 401 });
    }

    const recentMessages = messages.slice(-12);
    const coreMessages = convertToCoreMessages(recentMessages);
    const provider = createGoogleGenerativeAI({ apiKey });
    const model = provider(modelName);

    const result = streamText({
      model,
      system: [
        'You are Guardian, HerShield\'s safety-first travel companion.',
        'Give concise, practical guidance for routes, weather, emergencies, check-ins, and trip planning.',
        'Do not invent live safety data, police dispatches, or bookings you cannot verify.',
        'If the user asks for emergency help, tell them to use the SOS flow and local emergency services immediately.',
      ].join(' '),
      messages: coreMessages,
      temperature: 0.4,
      maxTokens: 700,
    });

    if (db) {
      void result.response
        .then(async ({ messages: responseMessages }) => {
          const assistantMessage = responseMessages.find((message) => message.role === 'assistant');
          const assistantContent = assistantMessage?.content;
          const responseText = typeof assistantContent === 'string'
            ? assistantContent
            : Array.isArray(assistantContent)
              ? assistantContent
                  .map((part) => (typeof part === 'object' && part && 'text' in part ? part.text : ''))
                  .filter(Boolean)
                  .join(' ')
              : '';

          const firstUserMessage = recentMessages.find((message: { role?: string; content?: unknown }) => message.role === 'user');
          const conversationTitle = typeof firstUserMessage?.content === 'string' && firstUserMessage.content.trim().length > 0
            ? firstUserMessage.content.trim().slice(0, 120)
            : 'Guardian Chat';

          const [conversation] = await db
            .insert(aiConversations)
            .values({ userId, title: conversationTitle })
            .returning({ id: aiConversations.id });

          const messageRecords = recentMessages.map((message: { role?: string; content?: unknown }) => ({
            conversationId: conversation.id,
            role: message.role === 'assistant' || message.role === 'system' ? message.role : 'user',
            content: typeof message.content === 'string' ? message.content : JSON.stringify(message.content ?? ''),
          }));

          if (responseText) {
            messageRecords.push({
              conversationId: conversation.id,
              role: 'assistant',
              content: responseText,
            });
          }

          if (messageRecords.length > 0) {
            await db.insert(aiMessages).values(messageRecords);
          }
        })
        .catch((error) => {
          console.error('[Chat] Failed to persist conversation:', error);
        });
    }

    return result.toDataStreamResponse({
      init: {
        headers: {
          'Cache-Control': 'no-cache, no-transform',
        },
      },
    });

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process chat' },
      { status: 500 },
    );
  }
}
