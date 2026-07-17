import { Suspense } from 'react';
import HomePage from './home-content';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <HomePage />
    </Suspense>
  );
}
