'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, PackageOpen } from 'lucide-react';
import { supabase, type Product } from '@/lib/supabase';
import { CATEGORIES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/product-card';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import ArticlesSection from '@/components/articles-section';
import { cn } from '@/lib/utils';

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 's1',
    title: 'Wireless Noise-Cancelling Headphones',
    price: 249.99,
    category: 'Audio',
    description: 'Immersive sound with adaptive ANC and 40-hour battery life.',
    image_url:
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's2',
    title: 'Smart Watch Series 8',
    price: 399.0,
    category: 'Wearables',
    description: 'Health tracking, ECG, blood oxygen, and always-on display.',
    image_url:
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's3',
    title: 'Flagship Smartphone 5G',
    price: 899.99,
    category: 'Smartphones',
    description: '6.7-inch OLED, triple camera, and all-day battery.',
    image_url:
      'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 's4',
    title: 'Ultrabook Laptop 14"',
    price: 1299.0,
    category: 'Laptops',
    description: 'Lightweight aluminum body, 16GB RAM, 1TB SSD.',
    image_url:
      'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 's5',
    title: 'Mechanical Gaming Keyboard',
    price: 129.99,
    category: 'Gaming',
    description: 'Hot-swappable switches, RGB backlight, aluminum frame.',
    image_url:
      'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 's6',
    title: 'Wireless Charging Pad',
    price: 39.99,
    category: 'Accessories',
    description: '15W fast charging, Qi2 compatible, sleek design.',
    image_url:
      'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 's7',
    title: 'Mirrorless Camera 4K',
    price: 1099.0,
    category: 'Cameras',
    description: '24MP sensor, 4K60 video, in-body stabilization.',
    image_url:
      'https://images.pexels.com/photos/51383/photo-camera-subject-photography-51383.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 's8',
    title: 'Smart Home Hub Pro',
    price: 179.99,
    category: 'Smart Home',
    description: 'Control lights, locks, and thermostats from one app.',
    image_url:
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    created_at: new Date().toISOString(),
  },
];

export default function HomePage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('q') || ''
  );

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      setProducts(SAMPLE_PRODUCTS);
    } else {
      setProducts(data as Product[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filtered = products.filter((p) => {
    const matchCat =
      activeCategory === 'all' ||
      p.category.toLowerCase() === activeCategory.toLowerCase() ||
      p.category.toLowerCase() ===
        CATEGORIES.find((c) => c.slug === activeCategory)?.name.toLowerCase();
    const matchSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={setSearchQuery} />

      <main>
        <Hero />

        {/* Products section */}
        <section id="products" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Featured Products
              </h2>
              <p className="mt-2 text-muted-foreground">
                Handpicked gadgets and electronics for every need.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {filtered.length} products
              </span>
            </div>
          </div>

          {/* Category filter */}
          <div className="mt-8 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all',
                activeCategory === 'all'
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                  : 'border border-border/60 text-foreground/70 hover:border-primary hover:text-primary'
              )}
            >
              All Products
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all',
                  activeCategory === cat.slug
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                    : 'border border-border/60 text-foreground/70 hover:border-primary hover:text-primary'
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search bar (mobile + secondary) */}
          <div className="relative mt-6 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-full pl-10"
            />
          </div>

          {/* Grid */}
          {loading ? (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] rounded-2xl animate-shimmer"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="mt-16 flex flex-col items-center justify-center text-center">
              <PackageOpen className="h-16 w-16 text-muted-foreground/40" />
              <p className="mt-4 text-lg font-medium">No products found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different category or search term.
              </p>
              <Button
                variant="outline"
                className="mt-4 rounded-full"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </section>

        <ArticlesSection />
      </main>

      <Footer />
    </div>
  );
}
