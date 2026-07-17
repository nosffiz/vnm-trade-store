'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Lock,
  Plus,
  Package,
  LogOut,
  Trash2,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Image as ImageIcon,
  Tag,
  FileText,
  Upload,
  X,
} from 'lucide-react';
import { supabase, type Product } from '@/lib/supabase';
import { ADMIN_PASSWORD, CATEGORIES, CURRENCY_SYMBOL, formatPrice } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'vnm_admin_auth';

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [posting, setPosting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [postError, setPostError] = useState('');

  // Products list
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === 'true') setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) fetchProducts();
  }, [authed]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setProducts(data as Product[]);
    setLoadingProducts(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem(STORAGE_KEY, 'true');
        setAuthed(true);
        setAuthError('');
      } else {
        setAuthError('Incorrect password. Please try again.');
      }
      setAuthLoading(false);
    }, 600);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setPassword('');
    router.push('/');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPostError('Please select a valid image file.');
      return;
    }

    setPostError('');
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview('');
  };

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split('.').pop() || 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const bucketName = 'products';
    console.log('[v0] Uploading to Supabase bucket:', bucketName, '| file:', fileName);

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(fileName);

    return publicUrl;
  };

  const handlePostProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setPosting(true);
    setPostError('');
    setPostSuccess(false);

    if (!title || !price || !category) {
      setPostError('Title, price, and category are required.');
      setPosting(false);
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setPostError('Please enter a valid price.');
      setPosting(false);
      return;
    }

    // Upload the selected image to the Supabase "products" storage bucket and
    // use the resulting public URL for the product record.
    let finalImageUrl: string | null = null;
    if (imageFile) {
      try {
        setUploading(true);
        finalImageUrl = await uploadImage(imageFile);
      } catch (err) {
        setPostError(
          `Failed to upload image: ${err instanceof Error ? err.message : 'Unknown error'}`
        );
        setUploading(false);
        setPosting(false);
        return;
      }
      setUploading(false);
    }

    const { data, error } = await supabase
      .from('products')
      .insert({
        title,
        price: priceNum,
        category,
        description: description || null,
        image_url: finalImageUrl,
        featured,
      })
      .select()
      .single();

    if (error) {
      setPostError(`Failed to post product: ${error.message}`);
      setPosting(false);
      return;
    }

    if (data) {
      setProducts([data as Product, ...products]);
      setPostSuccess(true);
      setTitle('');
      setPrice('');
      setCategory('');
      setDescription('');
      clearImage();
      setFeatured(false);
      setTimeout(() => setPostSuccess(false), 3000);
    }

    setPosting(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // ---- Login screen ----
  if (!authed) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/20 to-primary/5 px-4">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <Card className="w-full max-w-md overflow-hidden border-border/50 shadow-2xl shadow-black/10 animate-scale-in">
          <div className="relative bg-gradient-tech p-8 text-center text-white">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Lock className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-white/80">
              Enter your password to access the product management panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 p-8">
            <div className="space-y-2">
              <Label htmlFor="password">Admin Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {authError && (
              <p className="text-sm text-destructive animate-fade-in">
                {authError}
              </p>
            )}

            <Button
              type="submit"
              className="w-full h-12 rounded-xl"
              disabled={authLoading || !password}
            >
              {authLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Lock className="mr-2 h-4 w-4" />
              )}
              {authLoading ? 'Authenticating...' : 'Access Dashboard'}
            </Button>

          </form>
        </Card>
      </div>
    );
  }

  // ---- Dashboard ----
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Top bar */}
      <header className="sticky top-0 z-40 glass border-b border-border/40 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-tech shadow-md">
              <Package className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">VNM Trade Store Manager</p>
            </div>
          </div>
          <Button variant="outline" className="rounded-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <Plus className="h-5 w-5 text-primary" />
                Post New Product
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill in the details below to add a product to the store.
              </p>

              {postSuccess && (
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700 animate-fade-in">
                  <CheckCircle2 className="h-4 w-4" />
                  Product posted successfully!
                </div>
              )}

              {postError && (
                <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive animate-fade-in">
                  {postError}
                </div>
              )}

              <form onSubmit={handlePostProduct} className="mt-6 space-y-5">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g. Wireless Earbuds Pro"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price" className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-muted-foreground">
                      {CURRENCY_SYMBOL}
                    </span>
                    Price (Taka) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="e.g. 9999.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5">
                    <Package className="h-3.5 w-3.5 text-muted-foreground" />
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.slug} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Product description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Product Image upload */}
                <div className="space-y-2">
                  <Label htmlFor="image" className="flex items-center gap-1.5">
                    <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    Product Image
                  </Label>

                  {!imagePreview ? (
                    <label
                      htmlFor="image"
                      className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border/60 bg-muted/30 px-4 py-8 text-center transition-colors hover:border-primary/50 hover:bg-muted/50"
                    >
                      <Upload className="h-6 w-6 text-muted-foreground" />
                      <span className="text-sm font-medium">Tap to choose a photo</span>
                      <span className="text-xs text-muted-foreground">
                        Take a photo or pick from your gallery
                      </span>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleFileSelect}
                      />
                    </label>
                  ) : (
                    <div className="relative overflow-hidden rounded-lg border border-border/40">
                      <img
                        src={imagePreview}
                        alt="Selected product preview"
                        className="h-40 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
                        aria-label="Remove selected image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      {imageFile && (
                        <p className="truncate bg-background/80 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm">
                          {imageFile.name}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Featured toggle */}
                <div className="flex items-center justify-between rounded-lg border border-border/40 p-3">
                  <div>
                    <Label htmlFor="featured" className="cursor-pointer">
                      Featured Product
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Show on homepage as featured
                    </p>
                  </div>
                  <Switch
                    id="featured"
                    checked={featured}
                    onCheckedChange={setFeatured}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl"
                  disabled={posting}
                >
                  {posting ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-5 w-5" />
                  )}
                  {uploading
                    ? 'Uploading image...'
                    : posting
                      ? 'Posting...'
                      : 'Post Product'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Product list */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Store Products
                <Badge variant="secondary" className="ml-2">
                  {products.length}
                </Badge>
              </h2>
            </div>

            {loadingProducts ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-24 rounded-2xl animate-shimmer" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <Card className="flex flex-col items-center justify-center p-12 text-center">
                <Package className="h-12 w-12 text-muted-foreground/40" />
                <p className="mt-4 font-medium">No products yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Use the form to post your first product.
                </p>
              </Card>
            ) : (
              <div className="space-y-3">
                {products.map((product, i) => (
                  <Card
                    key={product.id}
                    className={cn(
                      'flex items-center gap-4 border-border/50 p-4 transition-all hover:shadow-md animate-fade-in-up'
                    )}
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-muted-foreground/40" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate font-semibold">{product.title}</h3>
                        {product.featured && (
                          <Badge className="shrink-0 bg-gradient-tech text-white border-0">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {product.category}
                      </p>
                      {product.description && (
                        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                          {product.description}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-bold">
                        {formatPrice(Number(product.price))}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="mt-1 h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(product.id)}
                        aria-label="Delete product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
