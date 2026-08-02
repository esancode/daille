import { supabase } from '@/lib/supabase';
import { getProdutos } from './products'; // Assuming there's a cached getProdutos to map details

export async function getPopularProducts(limit = 8) {
  const { data, error } = await supabase
    .from('score_produtos')
    .select('produto_id')
    .order('popularity_score', { ascending: false })
    .limit(limit);
    
  if (error || !data) return [];
  
  const allProducts = await getProdutos();
  const ids = data.map(d => d.produto_id);
  
  // Map back to standard product objects keeping the scored order
  const recommended = ids.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
  return recommended;
}

export async function getTrendingProducts(limit = 8) {
  const { data, error } = await supabase
    .from('score_produtos')
    .select('produto_id')
    .order('trending_score', { ascending: false })
    .limit(limit);
    
  if (error || !data) return [];
  
  const allProducts = await getProdutos();
  const ids = data.map(d => d.produto_id);
  
  const recommended = ids.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
  return recommended;
}

export async function getFreshProducts(limit = 8) {
  const { data, error } = await supabase
    .from('score_produtos')
    .select('produto_id')
    .order('freshness_score', { ascending: false })
    .limit(limit);
    
  if (error || !data) return [];
  
  const allProducts = await getProdutos();
  const ids = data.map(d => d.produto_id);
  
  const recommended = ids.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
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
