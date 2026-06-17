const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail ?? `Request failed: ${res.status}`);
  }
  return res.json();
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  icon: string;
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface OrderPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  deliveryMethod: string;
  items: { id: string; name: string; price: number; quantity: number; unit: string }[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
}

// ── Products ───────────────────────────────────────────────────────────────

export function fetchProducts(category?: string, sort?: string): Promise<Product[]> {
  const params = new URLSearchParams();
  if (category && category !== 'all') params.set('category', category);
  if (sort) params.set('sort', sort);
  const qs = params.toString();
  return request<Product[]>(`/products${qs ? `?${qs}` : ''}`);
}

export function fetchProduct(id: string): Promise<Product> {
  return request<Product>(`/products/${id}`);
}

// ── Categories ─────────────────────────────────────────────────────────────

export function fetchCategories(): Promise<Category[]> {
  return request<Category[]>('/categories');
}

// ── Auth ───────────────────────────────────────────────────────────────────

export function apiLogin(email: string, password: string) {
  return request<{ access_token: string; user: AuthUser; is_admin: boolean }>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}

export function apiSignup(email: string, password: string) {
  return request<{ message: string }>('/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}

export function apiMe(token: string): Promise<AuthUser> {
  return request<AuthUser>('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function apiLogout(token: string) {
  return request('/auth/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ── Orders ─────────────────────────────────────────────────────────────────

export function placeOrder(payload: OrderPayload) {
  return request<{ orderId: string; message: string }>('/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
