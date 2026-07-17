'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Gamepad2,
  Camera,
  Home,
  ShoppingBag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/lib/constants';
import LoginDialog from '@/components/login-dialog';

const categoryIcons: Record<string, React.ElementType> = {
  smartphones: Smartphone,
  laptops: Laptop,
  audio: Headphones,
  wearables: Watch,
  accessories: ShoppingBag,
  gaming: Gamepad2,
  cameras: Camera,
  'smart-home': Home,
};

export default function Navbar({
  onSearch,
}: {
  onSearch?: (query: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      router.push(`/?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass shadow-lg shadow-black/5 border-b border-border/40'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-tech shadow-md transition-transform group-hover:scale-110">
                <span className="text-lg font-bold text-white">V</span>
              </div>
              <span className="hidden flex-col leading-tight sm:flex">
                <span className="text-lg font-bold tracking-tight">
                  VNM<span className="text-primary">Trade</span>
                </span>
                <span className="text-[11px] font-medium text-muted-foreground">
                  Next move with victory.
                </span>
              </span>
            </Link>

            {/* Desktop Search */}
            <form
              onSubmit={handleSearch}
              className="hidden flex-1 max-w-xl items-center md:flex"
            >
              <div className="relative w-full group">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  type="search"
                  placeholder="Search gadgets, electronics, accessories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border-border/60 bg-background/60 pl-10 pr-4 transition-all focus-visible:ring-primary/30"
                />
              </div>
            </form>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 lg:flex">
              {/* Categories dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground">
                  Categories
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform',
                      categoriesOpen && 'rotate-180'
                    )}
                  />
                </button>
                {categoriesOpen && (
                  <div className="absolute right-0 top-full w-64 pt-2 animate-fade-in">
                    <div className="overflow-hidden rounded-2xl border border-border/50 bg-popover p-2 shadow-xl shadow-black/10">
                      {CATEGORIES.map((cat) => {
                        const Icon = categoryIcons[cat.slug] || ShoppingBag;
                        return (
                          <Link
                            key={cat.slug}
                            href={`/?category=${cat.slug}`}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent"
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <Icon className="h-4 w-4" />
                            </div>
                            {cat.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/admin"
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
              >
                Admin
              </Link>

              <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="ml-2 rounded-full"
                    onClick={() => setLoginOpen(true)}
                  >
                    <User className="mr-1.5 h-4 w-4" />
                    Login
                  </Button>
                </DialogTrigger>
              </Dialog>
            </nav>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    aria-label="Login"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
              </Dialog>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border/40 glass animate-fade-in">
            <div className="mx-auto max-w-7xl space-y-4 px-4 py-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full pl-10"
                />
              </form>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => {
                  const Icon = categoryIcons[cat.slug] || ShoppingBag;
                  return (
                    <Link
                      key={cat.slug}
                      href={`/?category=${cat.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 rounded-lg border border-border/40 p-3 text-sm transition-colors hover:bg-accent"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      {cat.name}
                    </Link>
                  );
                })}
              </div>
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg border border-border/40 p-3 text-sm font-medium transition-colors hover:bg-accent"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        )}
      </header>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
