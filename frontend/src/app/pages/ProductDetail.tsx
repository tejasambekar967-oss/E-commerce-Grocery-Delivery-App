import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ProductCard } from '../components/ProductCard';
import { fetchProduct, fetchProducts, type Product } from '../api';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchProduct(id)
      .then((p) => {
        setProduct(p);
        return fetchProducts(p.category);
      })
      .then((all) => setRelated(all.filter((p) => p.id !== id).slice(0, 4)))
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button asChild><Link to="/products">Back to Products</Link></Button>
      </div>
    );
  }

  if (!product) return <div className="container py-12 text-center">Loading...</div>;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="container py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/products">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
          <ImageWithFallback src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground">{product.unit}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold">₹{product.price.toFixed(2)}</span>
            {product.inStock ? (
              <Badge variant="default">In Stock</Badge>
            ) : (
              <Badge variant="secondary">Out of Stock</Badge>
            )}
          </div>

          <div className="border-t border-b py-6 space-y-4">
            <h3 className="font-semibold">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="space-y-4">
            <label className="font-semibold">Quantity</label>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={!product.inStock}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)} disabled={!product.inStock}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={!product.inStock}>
            <Plus className="mr-2 h-5 w-5" />
            Add {quantity} to Cart — ₹{(product.price * quantity).toFixed(2)}
          </Button>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
