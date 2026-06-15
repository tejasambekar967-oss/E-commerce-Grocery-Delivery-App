import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { fetchProducts, fetchCategories, Product, Category } from '../api';

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data.slice(0, 8))).catch(console.error);
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container flex h-full items-center">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl font-bold tracking-tight">
              Fresh Groceries Delivered to Your Door
            </h1>
            <p className="text-xl text-muted-foreground">
              Shop from our wide selection of fresh produce, dairy, meat, and bakery items. Same-day delivery available.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link to="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/products">Browse Categories</Link>
              </Button>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-30">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1601598851547-4302969d0614?w=1080"
              alt="Grocery shopping"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground">Browse our fresh selection</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground">Fresh picks for you</p>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/products">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl">🚚</div>
              <h3 className="text-xl font-semibold">Fast Delivery</h3>
              <p className="text-muted-foreground">Same-day delivery available on orders before 2 PM</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">🌱</div>
              <h3 className="text-xl font-semibold">Fresh Quality</h3>
              <p className="text-muted-foreground">Sourced from local farms and trusted suppliers</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">💰</div>
              <h3 className="text-xl font-semibold">Best Prices</h3>
              <p className="text-muted-foreground">Competitive prices with regular deals and discounts</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
