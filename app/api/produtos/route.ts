import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth/admin'
import { produtoSchema } from '@/lib/validations/produto'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  // 1. Verificação de autorização (evita acesso indevido / BOLA / IDOR global)
  const auth = await requireAdmin()
  if (!auth.authorized) {
    return auth.response
  }

  try {
    const body = await request.json()

    // 2. Validação rigorosa dos dados via Zod
    const result = produtoSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { imagens, ...produtoData } = result.data

    const supabase = await createClient()

    // 3. Inserção no banco
    const { data: produto, error: insertError } = await supabase
      .from('produtos')
      .insert(produtoData)
      .select()
      .single()

    if (insertError) {
      return NextResponse.json({ error: 'Erro ao cadastrar produto no banco' }, { status: 500 })
    }

    // Se tiver imagens, insere-as
    if (imagens && imagens.length > 0) {
      const imagensPayload = imagens.map((url, index) => ({
        produto_id: produto.id,
        url,
        ordem: index + 1
      }))

      await supabase.from('imagens').insert(imagensPayload)
    }

    return NextResponse.json({ sucesso: true, produto }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Ocorreu um erro no servidor' }, { status: 500 })
  }
}

// Opcionalmente podemos ter o GET público ou protegido
export async function GET(request: Request) {
  // Para vitrine, GET não precisa de admin.
  // Se for painel admin, você chamaria via componente de servidor.
  const supabase = await createClient()
  const { data, error } = await supabase.from('produtos').select('*')
  
  if (error) return NextResponse.json({ error: 'Erro ao buscar' }, { status: 500 })
  return NextResponse.json(data)
}
