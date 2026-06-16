import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, LogOut, Save, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const API = import.meta.env.VITE_API_URL as string;

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  unit: string;
  description: string;
  inStock: boolean;
}

interface Category {
  id: string;
  name: string;
}

const EMPTY_PRODUCT: Omit<Product, 'id'> = {
  name: '', category: '', price: 0,
  image: '', unit: '', description: '', inStock: true,
};

// ── Admin Login ───────────────────────────────────────────────────────────────

function AdminLogin({ onLogin }: { onLogin: (secret: string) => void }) {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/admin/products`, {
        headers: { 'x-admin-secret': secret },
      });
      if (res.status === 403) throw new Error('Invalid admin secret');
      if (!res.ok) throw new Error('Connection failed');
      onLogin(secret);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Admin Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="secret">Admin Secret</Label>
              <Input
                id="secret"
                type="password"
                placeholder="Enter admin secret"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Verifying...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Product Form ───────────────────────────────────────────────────────────────

function ProductForm({
  initial,
  categories,
  onSave,
  onCancel,
  isNew,
}: {
  initial: Partial<Product>;
  categories: Category[];
  onSave: (data: Partial<Product>) => Promise<void>;
  onCancel: () => void;
  isNew: boolean;
}) {
  const [form, setForm] = useState<Partial<Product>>({ ...EMPTY_PRODUCT, ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (key: keyof Product, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSave(form);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isNew && (
        <div className="space-y-1">
          <Label>Product ID (optional)</Label>
          <Input placeholder="auto-generated if empty" value={form.id ?? ''} onChange={(e) => set('id', e.target.value)} />
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1 col-span-2">
          <Label>Name *</Label>
          <Input value={form.name ?? ''} onChange={(e) => set('name', e.target.value)} required />
        </div>
        <div className="space-y-1">
          <Label>Category *</Label>
          <Select value={form.category ?? ''} onValueChange={(v) => set('category', v)}>
            <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Price (₹) *</Label>
          <Input type="number" min="0" step="0.01" value={form.price ?? ''} onChange={(e) => set('price', parseFloat(e.target.value))} required />
        </div>
        <div className="space-y-1">
          <Label>Unit</Label>
          <Input placeholder="e.g. per kg" value={form.unit ?? ''} onChange={(e) => set('unit', e.target.value)} />
        </div>
        <div className="space-y-1">
          <Label>In Stock</Label>
          <Select value={form.inStock ? 'true' : 'false'} onValueChange={(v) => set('inStock', v === 'true')}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="true">In Stock</SelectItem>
              <SelectItem value="false">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1 col-span-2">
          <Label>Image URL</Label>
          <Input placeholder="https://..." value={form.image ?? ''} onChange={(e) => set('image', e.target.value)} />
        </div>
        <div className="space-y-1 col-span-2">
          <Label>Description</Label>
          <Input value={form.description ?? ''} onChange={(e) => set('description', e.target.value)} />
        </div>
      </div>

      {/* Image preview */}
      {form.image && (
        <div className="w-24 h-24 rounded overflow-hidden bg-muted">
          <ImageWithFallback src={form.image} alt="preview" className="w-full h-full object-cover" />
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={saving}>
          <Save className="mr-1 h-4 w-4" />
          {saving ? 'Saving...' : 'Save'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="mr-1 h-4 w-4" />
          Cancel
        </Button>
      </div>
    </form>
  );
}

// ── Main Admin Panel ──────────────────────────────────────────────────────────

export function Admin() {
  const [secret, setSecret] = useState<string | null>(
    sessionStorage.getItem('admin_secret')
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const headers = { 'x-admin-secret': secret ?? '', 'Content-Type': 'application/json' };

  const load = async (s: string) => {
    const [p, c] = await Promise.all([
      fetch(`${API}/admin/products`, { headers: { 'x-admin-secret': s } }).then((r) => r.json()),
      fetch(`${API}/admin/categories`, { headers: { 'x-admin-secret': s } }).then((r) => r.json()),
    ]);
    setProducts(p);
    setCategories(c);
  };

  const handleLogin = (s: string) => {
    sessionStorage.setItem('admin_secret', s);
    setSecret(s);
    load(s);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_secret');
    setSecret(null);
  };

  useEffect(() => {
    if (secret) load(secret);
  }, []);

  const handleSaveNew = async (data: Partial<Product>) => {
    const res = await fetch(`${API}/admin/products`, {
      method: 'POST', headers,
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.detail ?? 'Create failed');
    setProducts((p) => [...p, json]);
    setAdding(false);
  };

  const handleSaveEdit = async (data: Partial<Product>) => {
    const res = await fetch(`${API}/admin/products/${editingId}`, {
      method: 'PUT', headers,
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.detail ?? 'Update failed');
    setProducts((p) => p.map((x) => (x.id === editingId ? json : x)));
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    const res = await fetch(`${API}/admin/products/${id}`, { method: 'DELETE', headers });
    if (!res.ok) { alert('Delete failed'); return; }
    setProducts((p) => p.filter((x) => x.id !== id));
  };

  if (!secret) return <AdminLogin onLogin={handleLogin} />;

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === 'all' || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="text-lg font-bold">FreshMart Admin</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{products.length} products</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="mr-1 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-6 space-y-6">

        {/* Add Product */}
        {adding ? (
          <Card>
            <CardHeader><CardTitle>Add New Product</CardTitle></CardHeader>
            <CardContent>
              <ProductForm
                initial={{}}
                categories={categories}
                onSave={handleSaveNew}
                onCancel={() => setAdding(false)}
                isNew
              />
            </CardContent>
          </Card>
        ) : (
          <Button onClick={() => setAdding(true)}>
            <Plus className="mr-1 h-4 w-4" /> Add Product
          </Button>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Product List */}
        <div className="space-y-3">
          {filtered.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                {editingId === product.id ? (
                  <ProductForm
                    initial={product}
                    categories={categories}
                    onSave={handleSaveEdit}
                    onCancel={() => setEditingId(null)}
                    isNew={false}
                  />
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
                      <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">{product.name}</span>
                        <Badge variant="outline" className="text-xs">{product.category}</Badge>
                        {!product.inStock && <Badge variant="secondary">Out of Stock</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{product.unit} · {product.description}</p>
                      <p className="font-bold text-primary">₹{Number(product.price).toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button size="sm" variant="outline" onClick={() => setEditingId(product.id)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(product.id)}
                        className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
