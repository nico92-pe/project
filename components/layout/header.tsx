'use client';

import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, QrCode, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <QrCode className="h-6 w-6" />
            <span className="text-lg font-bold">QRSnap</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-primary">
            Pricing
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                Dashboard
              </Link>
              <Button onClick={signOut} variant="ghost" size="sm">
                Log Out
              </Button>
            </>
          ) : (
            <Button asChild variant="default" size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "fixed inset-x-0 top-16 z-40 w-full border-b bg-background md:hidden transition-all duration-300 ease-in-out",
        mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 invisible"
      )}>
        <div className="container py-4 flex flex-col gap-4">
          <Link 
            href="/" 
            className="text-sm font-medium hover:text-primary px-4 py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/pricing" 
            className="text-sm font-medium hover:text-primary px-4 py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Pricing
          </Link>
          {user ? (
            <>
              <Link 
                href="/dashboard" 
                className="text-sm font-medium hover:text-primary px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Button 
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }} 
                variant="ghost" 
                size="sm"
                className="justify-start px-4"
              >
                Log Out
              </Button>
            </>
          ) : (
            <Button 
              asChild 
              variant="default" 
              size="sm"
              className="mx-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}