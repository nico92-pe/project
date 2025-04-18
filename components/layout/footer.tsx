import Link from 'next/link';
import { QrCode } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            <span className="text-lg font-bold">QRSnap</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Generate and download beautiful QR codes in seconds.
          </p>
        </div>
        
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Product</h3>
          <nav className="flex flex-col gap-2">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
          </nav>
        </div>
        
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Company</h3>
          <nav className="flex flex-col gap-2">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </nav>
        </div>
        
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Legal</h3>
          <nav className="flex flex-col gap-2">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </nav>
        </div>
      </div>
      
      <div className="container mt-8 border-t pt-6">
        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} QRSnap. All rights reserved.
        </p>
      </div>
    </footer>
  );
}