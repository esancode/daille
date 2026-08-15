import { supabase } from '@/lib/supabase';
import { getProdutos } from './products'; // Assuming there's a cached getProdutos to map details
import { Produto } from '@/types';

export async function getPopularProducts(limit = 8) {
  const { data, error } = await supabase
    .from('score_produtos')
    .select('produto_id')
    .order('popularity_score', { ascending: false })
    .limit(limit);
    
  const allProducts = await getProdutos();
  let recommended: Produto[] = [];

  if (!error && data) {
    const ids = data.map(d => d.produto_id);
    recommended = ids.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as Produto[];
  }
  
  // Fallback: Se o banco tem poucos produtos ou as pontuações não existirem, preencha com produtos normais
  if (recommended.length < limit) {
    const extra = allProducts.filter(p => !recommended.some(r => r.id === p.id)).slice(0, limit - recommended.length);
    recommended = [...recommended, ...extra];
  }

  return recommended;
}

export async function getTrendingProducts(limit = 8) {
  const { data, error } = await supabase
    .from('score_produtos')
    .select('produto_id')
    .order('trending_score', { ascending: false })
    .limit(limit);
    
  const allProducts = await getProdutos();
  let recommended: Produto[] = [];

  if (!error && data) {
    const ids = data.map(d => d.produto_id);
    recommended = ids.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as Produto[];
  }
  
  if (recommended.length < limit) {
    const extra = allProducts.filter(p => !recommended.some(r => r.id === p.id)).slice(0, limit - recommended.length);
    recommended = [...recommended, ...extra];
  }

  return recommended;
}

export async function getFreshProducts(limit = 8) {
  const { data, error } = await supabase
    .from('score_produtos')
    .select('produto_id')
    .order('freshness_score', { ascending: false })
    .limit(limit);
    
  const allProducts = await getProdutos();
  let recommended: Produto[] = [];

  if (!error && data) {
    const ids = data.map(d => d.produto_id);
    recommended = ids.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as Produto[];
  }
  
  if (recommended.length < limit) {
    const extra = allProducts.filter(p => !recommended.some(r => r.id === p.id)).slice(0, limit - recommended.length);
    recommended = [...recommended, ...extra];
  }

  return recommended;
}

export async function trackEvent(produtoId: string, tipoEvento: 'view' | 'wpp_click' | 'favorite_add' | 'cart_add') {
  // Chamada de fire-and-forget
  if (typeof window !== 'undefined') {
    fetch('/api/tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ produtoId, tipoEvento })
    }).catch(console.error);
  }
}
