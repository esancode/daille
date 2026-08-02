import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { produtoId, tipoEvento, sessionId } = body;

    if (!produtoId || !tipoEvento) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabase
      .from('eventos')
      .insert([
        {
          produto_id: produtoId,
          tipo_evento: tipoEvento,
          session_id: sessionId || 'anonymous',
        }
      ]);

    if (error) {
      console.error("Tracking Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Tracking API Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
