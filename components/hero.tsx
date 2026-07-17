'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 lg:pt-20">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div className="animate-fade-in-up text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Premium Tech, Smarter Prices
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Next-Gen Gadgets &{' '}
              <span className="bg-gradient-tech bg-clip-text text-transparent">
                Electronics
              </span>{' '}
              for Modern Living
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground lg:mx-0 mx-auto">
              Discover the latest smartphones, laptops, audio gear, and smart
              accessories — curated for tech enthusiasts and shipped to your
              door.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start justify-center">
              <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/25">
                <Link href="#products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="#articles">Read Insights</Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-start">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'On orders over ৳5000' },
                { icon: ShieldCheck, label: '2-Year Warranty', sub: 'On all products' },
                { icon: Zap, label: 'Fast Delivery', sub: '2-3 business days' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-fade-in-up [animation-delay:200ms]">
            <div className="relative mx-auto aspect-square max-w-md">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-tech opacity-20 blur-2xl" />
              <div className="relative grid h-full grid-cols-2 gap-4">
                <div className="mt-8 flex items-end justify-center rounded-3xl bg-gradient-to-br from-primary/15 to-primary/5 p-6 animate-float">
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                      <Sparkles className="h-8 w-8" />
                    </div>
                    <p className="text-sm font-semibold">Smartphones</p>
                  </div>
                </div>
                <div className="flex items-start justify-center rounded-3xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 p-6 animate-float [animation-delay:1s]">
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-600">
                      <Zap className="h-8 w-8" />
                    </div>
                    <p className="text-sm font-semibold">Audio</p>
                  </div>
                </div>
                <div className="flex items-start justify-center rounded-3xl bg-gradient-to-br from-amber-500/15 to-amber-500/5 p-6 animate-float [animation-delay:2s]">
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-600">
                      <ShieldCheck className="h-8 w-8" />
                    </div>
                    <p className="text-sm font-semibold">Wearables</p>
                  </div>
                </div>
                <div className="mt-8 flex items-end justify-center rounded-3xl bg-gradient-to-br from-rose-500/15 to-rose-500/5 p-6 animate-float [animation-delay:1.5s]">
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-600">
                      <Truck className="h-8 w-8" />
                    </div>
                    <p className="text-sm font-semibold">Accessories</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
