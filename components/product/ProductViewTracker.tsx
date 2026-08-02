"use client";

import { useEffect } from 'react';
import { trackEvent } from '@/services/recommendations';

export function ProductViewTracker({ produtoId }: { produtoId: string }) {
  useEffect(() => {
    trackEvent(produtoId, 'view');
  }, [produtoId]);
  
  return null;
}
