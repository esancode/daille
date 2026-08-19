import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth/admin'
import { produtoSchema } from '@/lib/validations/produto'
import { createClient } from '@/lib/supabase/server'

// PUT /api/produtos/[id]
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  // 1. Verificação de IDOR/BOLA - Valida se o usuário tem permissão
  const auth = await requireAdmin()
  if (!auth.authorized) {
    return auth.response
  }

  const { id } = await context.params

  try {
    const body = await request.json()
    // Opcionalmente, pode ser um update parcial, usando .partial()
    const result = produtoSchema.partial().safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { imagens, ...produtoData } = result.data

    const supabase = await createClient()

    const { data: produto, error: updateError } = await supabase
      .from('produtos')
      .update(produtoData)
      .eq('id', id)
      .select()
      .single()

    if (updateError || !produto) {
      return NextResponse.json({ error: 'Erro ao atualizar produto ou produto não encontrado' }, { status: 404 })
    }

    // Se houverem imagens sendo enviadas, precisa lidar com substituição ou adição
    // Aqui seria necessário um fluxo para deletar as antigas e inserir as novas, se aplicável.

    return NextResponse.json({ sucesso: true, produto }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Ocorreu um erro no servidor' }, { status: 500 })
  }
}

// DELETE /api/produtos/[id]
export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  // 1. Verificação de IDOR/BOLA
  const auth = await requireAdmin()
  if (!auth.authorized) {
    return auth.response
  }

  const { id } = await context.params

  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('produtos')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: 'Erro ao excluir produto' }, { status: 500 })
    }

    return NextResponse.json({ sucesso: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Ocorreu um erro no servidor' }, { status: 500 })
  }
}
