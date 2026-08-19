import { z } from 'zod'

export const produtoSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres').max(100, 'O nome deve ter no máximo 100 caracteres'),
  descricao: z.string().max(1000, 'A descrição deve ter no máximo 1000 caracteres').optional(),
  preco: z.number().positive('O preço deve ser maior que zero'),
  preco_prazo: z.number().positive('O preço a prazo deve ser maior que zero').optional().nullable(),
  parcelas: z.number().int().positive('O número de parcelas deve ser maior que zero').optional().nullable(),
  estoque: z.number().int().nonnegative('O estoque não pode ser negativo'),
  categoria: z.string().min(2, 'A categoria é obrigatória'),
  sku: z.string().min(3, 'SKU deve ter no mínimo 3 caracteres').max(50, 'SKU muito longo').optional(),
  status: z.enum(['disponivel', 'indisponivel', 'oculto']).default('disponivel'),
  // Considerando que imagens serão enviadas como URLs após o upload para um bucket
  imagens: z.array(z.string().url('Formato de URL inválido')).max(10, 'No máximo 10 imagens permitidas').optional(),
})

// Tipagem inferida
export type ProdutoType = z.infer<typeof produtoSchema>
