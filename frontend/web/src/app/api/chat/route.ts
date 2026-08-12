import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Context Pruning Architecture (Step 8)
    // 1. Keep only the last 5 messages to save token bandwidth
    const recentMessages = messages.slice(-5);
    const lastMessage = recentMessages[recentMessages.length - 1]?.content?.toLowerCase() || '';

    // 2. Dense Context Injection (Simulated RAG)
    // Instead of injecting a massive 10,000 token JSON object of the entire user profile,
    // we inject a compressed 50 token string of the most vital active hazards.
    const activeContext = `[SYSTEM: User is in Delhi. Severe rain warning. Emergency contacts ready.]`;

    let fullReply = "I'm analyzing the safest routes. I've noted heavy rainfall warnings in that region for the next 48 hours. I'll keep your emergency contacts on standby.";
    
    if (lastMessage.includes('kerala') || lastMessage.includes('kerela')) {
       fullReply = "Kerala is a beautiful destination! However, the Western Ghats region is currently experiencing heavy monsoon showers. I will proactively cache offline maps for Munnar and Wayanad, and monitor landslide warnings along your route.";
    } else if (lastMessage.includes('itinerary') || lastMessage.includes('itenary') || lastMessage.includes('plan')) {
       fullReply = "Here is a safe itinerary suggestion:\n\nDay 1: Arrive in Kochi. Stay in fort area (low flood risk).\nDay 2: Travel to Munnar before 2 PM to avoid evening fog on the ghat roads.\nDay 3: Backwaters in Alleppey. I have verified the boat operators for safety compliance.\n\nWould you like me to book any of these safe transit options?";
    } else if (lastMessage.includes('weather') || lastMessage.includes('rain')) {
       fullReply = "Currently, there is a 85% chance of heavy thunderstorms along your path. I highly recommend delaying travel by 2 hours. Should I notify your emergency contacts of the delay?";
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const words = fullReply.split(' ');
        for (let i = 0; i < words.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 30));
          const textChunk = words[i] + (i === words.length - 1 ? '' : ' ');
          controller.enqueue(encoder.encode(`0:${JSON.stringify(textChunk)}\n`));
        }
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'x-vercel-ai-data-stream': 'v1'
      }
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
