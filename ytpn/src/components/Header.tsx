'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { SimpleThemeToggle } from '@/components/ui/SimpleThemeToggle';
import { APP_CONSTS } from '@/db/app';

export default function Header() {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 text-2xl font-bold">
              <Image
                src="/logo.png"
                alt={APP_CONSTS.APP_NAME}
                width={220}
                height={60}
                className="h-12 w-auto"
                priority
              />
              {APP_CONSTS.APP_NAME}
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-2">
              <Phone 
                size={20}
                className="text-foreground-secondary"
              />
              <Link 
                href={`tel:${APP_CONSTS.APP_CONTACT_PHONE}`} 
                className="text-foreground-secondary hover:text-foreground transition-colors text-sm"
              >
                +61 457 271 181
              </Link>
            </div>
            <SimpleThemeToggle />
            <Link 
              href={`mailto:${APP_CONSTS.APP_CONTACT_EMAIL}`} 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md font-medium transition-colors text-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
