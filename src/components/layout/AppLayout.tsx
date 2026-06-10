import type { ComponentChildren } from 'preact';
import { Header } from './Header';
import { Footer } from './Footer';

interface AppLayoutProps {
  children: ComponentChildren;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative selection:bg-primary-500/30">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-400/10 dark:bg-primary-500/5 blur-[100px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 dark:bg-indigo-500/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-blue-400/10 dark:bg-blue-500/5 blur-[100px]" />
      </div>

      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
