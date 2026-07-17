'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, Loader2 } from 'lucide-react';

export default function LoginDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [loading, setLoading] = useState<'google' | 'facebook' | null>(null);

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    setLoading(provider);
    // Simulate OAuth flow
    setTimeout(() => {
      setLoading(null);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md overflow-hidden p-0">
        <div className="relative bg-gradient-tech p-8 pb-12 text-center text-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="relative">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <span className="text-2xl font-bold">V</span>
            </div>
            <h2 className="text-xl font-bold">Welcome to VNM Trade</h2>
            <p className="mt-1 text-sm text-white/80">
              Sign in to access exclusive deals and track orders
            </p>
          </div>
        </div>

        <div className="space-y-4 p-6 pt-2">
          <DialogHeader className="sr-only">
            <DialogTitle>Customer Login</DialogTitle>
            <DialogDescription>
              Sign in to your VNM Trade account
            </DialogDescription>
          </DialogHeader>

          <Button
            variant="outline"
            className="w-full h-12 rounded-xl border-border/60 transition-all hover:shadow-md hover:border-border"
            onClick={() => handleSocialLogin('google')}
            disabled={loading !== null}
          >
            {loading === 'google' ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Sign in with Google
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 rounded-xl border-border/60 transition-all hover:shadow-md hover:border-border"
            onClick={() => handleSocialLogin('facebook')}
            disabled={loading !== null}
          >
            {loading === 'facebook' ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#1877F2"
                  d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"
                />
              </svg>
            )}
            Sign in with Facebook
          </Button>

          <div className="relative py-2">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
              or
            </span>
          </div>

          <Button
            variant="ghost"
            className="w-full h-12 rounded-xl text-muted-foreground"
            onClick={() => onOpenChange(false)}
          >
            <Mail className="mr-2 h-4 w-4" />
            Continue as guest
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
