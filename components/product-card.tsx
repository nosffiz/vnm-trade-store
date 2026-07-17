'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/supabase';

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const [liked, setLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const displayPrice = typeof product.price === 'number'
    ? product.price
    : Number(product.price);

  return (
    <Card
      className={cn(
        'group relative overflow-hidden border-border/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 animate-fade-in-up'
      )}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        {product.image_url && !imageError ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted/50 to-muted/20">
            <ShoppingCart className="h-12 w-12 text-muted-foreground/40" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.featured && (
            <Badge className="bg-gradient-tech text-white border-0 shadow-sm">
              Featured
            </Badge>
          )}
          {index < 3 && (
            <Badge variant="secondary" className="bg-background/90 shadow-sm">
              New
            </Badge>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur-sm transition-all hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart
            className={cn(
              'h-4 w-4 transition-colors',
              liked ? 'fill-destructive text-destructive' : 'text-muted-foreground'
            )}
          />
        </button>

        {/* Quick actions overlay */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-gradient-to-t from-black/60 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
          <Button size="sm" className="rounded-full shadow-lg">
            <ShoppingCart className="mr-1.5 h-4 w-4" />
            Add to Cart
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-lg"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          {product.category}
        </p>
        <h3 className="mt-1 line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-primary">
          {product.title}
        </h3>
        {product.description && (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">
            ${displayPrice.toFixed(2)}
          </span>
          <div className="flex items-center gap-0.5">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs text-muted-foreground">
              {(4 + (index % 10) / 10).toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
