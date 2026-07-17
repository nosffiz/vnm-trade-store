'use client';

import Link from 'next/link';
import {
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CONTACT_EMAIL, CATEGORIES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/40 bg-gradient-to-b from-background to-muted/30">
      {/* Newsletter band */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative -translate-y-1/2 overflow-hidden rounded-3xl bg-gradient-tech p-8 shadow-2xl shadow-primary/20 sm:p-12">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Stay ahead of the tech curve
              </h3>
              <p className="mt-2 text-white/80">
                Subscribe for exclusive deals, new arrivals, and tech insights
                delivered to your inbox.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 flex-1 border-white/20 bg-white/10 text-white placeholder:text-white/60 focus-visible:ring-white/40"
              />
              <Button
                type="submit"
                size="lg"
                variant="secondary"
                className="h-12 shrink-0 rounded-xl bg-white text-primary hover:bg-white/90"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-tech shadow-md">
                <span className="text-lg font-bold text-white">V</span>
              </div>
              <span className="text-lg font-bold tracking-tight">
                VNM<span className="text-primary">Trade</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your trusted destination for premium gadgets, electronics, and
              mobile accessories. Quality tech, competitive prices.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Categories
            </h4>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/?category=${cat.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5">
              {['About Us', 'Contact', 'Blog & Insights', 'Shipping Info', 'Returns'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Get in Touch
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary group"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="group-hover:underline">{CONTACT_EMAIL}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} VNM Trade. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
