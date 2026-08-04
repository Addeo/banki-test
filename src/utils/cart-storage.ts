const STORAGE_KEY = 'banki-shop-cart';

export function loadCartIds(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((id): id is number => typeof id === 'number');
  } catch {
    return [];
  }
}

export function saveCartIds(ids: number[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}
