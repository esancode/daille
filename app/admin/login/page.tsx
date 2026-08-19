'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/auth/callback`,
        },
      })

      if (error) {
        // Mensagem genérica para evitar revelar se o usuário existe
        setMessage('Ocorreu um erro ou suas credenciais são inválidas.')
      } else {
        setMessage('Verifique seu e-mail para acessar o painel de administração.')
      }
    } catch (error) {
      setMessage('Ocorreu um erro inesperado.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-200">
        <h1 className="text-2xl font-semibold text-center mb-6">Acesso Administrativo</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              placeholder="admin@exemplo.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Enviar código por e-mail'}
          </button>

          {message && (
            <div className="mt-4 p-4 text-sm text-center border rounded bg-gray-50 text-gray-700">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
