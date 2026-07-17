'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Clock, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Article = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  image: string;
  featured?: boolean;
};

const ARTICLES: Article[] = [
  {
    id: 1,
    title:
      'Why Science & Robotics Should Be Taught to Kids via Legos and Tech Toys',
    excerpt:
      'Hands-on building with LEGO and programmable robotics kits builds spatial reasoning, persistence, and engineering intuition far better than textbook-only methods. Here is what the research shows.',
    category: 'Education',
    author: 'Dr. Sarah Chen',
    readTime: '8 min read',
    image:
      'https://images.pexels.com/photos/836301/pexels-photo-836301.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featured: true,
  },
  {
    id: 2,
    title: 'The Rise of Foldable Phones: Gimmick or the Future?',
    excerpt:
      'Foldable displays have matured. We break down the hardware, durability, and whether they deserve a spot in your pocket in 2024.',
    category: 'Mobile',
    author: 'Marcus Reid',
    readTime: '6 min read',
    image:
      'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    title: 'Wireless Charging Explained: Speed, Safety & Standards',
    excerpt:
      'Qi2, MagSafe, AirFuel — what each standard means for your devices and how fast you can really charge without a cable.',
    category: 'Accessories',
    author: 'Priya Nair',
    readTime: '5 min read',
    image:
      'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    title: 'Choosing Your First Mechanical Keyboard: A Beginner Guide',
    excerpt:
      'Switches, layouts, hot-swap, and acoustics — everything you need to know before buying your first mechanical keyboard.',
    category: 'Gaming',
    author: 'Tom Nakamura',
    readTime: '7 min read',
    image:
      'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function ArticlesSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const featured = ARTICLES.find((a) => a.featured);
  const rest = ARTICLES.filter((a) => !a.featured);

  return (
    <section id="articles" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            Knowledge Hub
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Articles & Insights
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Educational deep-dives on tech, science, and the tools shaping
            tomorrow — from robotics for kids to the future of foldable phones.
          </p>
        </div>
        <Button variant="outline" className="rounded-full">
          View All Articles
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Featured article */}
        {featured && (
          <Card
            className="group relative col-span-1 overflow-hidden border-border/50 lg:row-span-2"
            onMouseEnter={() => setHovered(featured.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-[16/12]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <Badge className="bg-primary text-white border-0 shadow-sm">
                  {featured.category}
                </Badge>
                <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl lg:text-3xl text-balance">
                  {featured.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-white/80 lg:line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-white/70">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    {featured.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {featured.readTime}
                  </span>
                </div>
                <Button
                  className="mt-4 rounded-full"
                  variant={hovered === featured.id ? 'default' : 'secondary'}
                >
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Other articles */}
        {rest.map((article, i) => (
          <Card
            key={article.id}
            className="group flex flex-col overflow-hidden border-border/50 transition-all hover:shadow-lg hover:-translate-y-1 animate-fade-in-up sm:flex-row"
            style={{ animationDelay: `${i * 80}ms` }}
            onMouseEnter={() => setHovered(article.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="relative aspect-video w-full overflow-hidden sm:aspect-square sm:w-1/3">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <Badge variant="secondary" className="self-start">
                {article.category}
              </Badge>
              <h3 className="mt-2 line-clamp-2 font-semibold transition-colors group-hover:text-primary">
                {article.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {article.excerpt}
              </p>
              <div className="mt-auto flex items-center gap-4 pt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
