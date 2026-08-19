import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function requireAdmin() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return {
      authorized: false as const,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    }
  }

  // Verificar se o usuário possui a role de admin.
  // Uma abordagem comum no Supabase é usar app_metadata.role ou checar uma tabela admin_users.
  // Por simplicidade e segurança, vamos checar metadata:
  const isAdmin = user.app_metadata?.role === 'admin' || user.user_metadata?.role === 'admin'

  if (!isAdmin) {
    return {
      authorized: false as const,
      response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
    }
  }

  return {
    authorized: true as const,
    user,
  }
}
