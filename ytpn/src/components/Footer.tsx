'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { SimpleThemeToggle } from '@/components/ui/SimpleThemeToggle';
import { LinkedInIcon, FacebookIcon } from '@/components';
import { APP_CONSTS } from '@/db/app';

export default function Footer() {

  return (
    <footer className="bg-background-tertiary text-foreground py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4 gap-3">
              <Image
                src="logo.png"
                alt="YTPN"
                width={20}
                height={20}
                priority
              />
              <span className="text-xl font-bold text-foreground">YTPN</span>
            </div>
            <p className="text-foreground-secondary mb-4">
              YTPN is a Brisbane based organisation.
            </p>
            <Link 
              href="mailto:adpcerqui@gmail.com" 
              className="flex items-center text-foreground-secondary hover:text-foreground transition-colors mb-4"
            >
              <Mail className="mr-2 h-4 w-4" />
              adpcerqui@gmail.com
            </Link>
            <div className="flex space-x-4">
              {/* <Link
                href="https://www.facebook.com/bandtconsulting/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-secondary hover:text-foreground transition-colors"
                aria-label="Visit our Facebook page"
              >
                <FacebookIcon 
                  size={20}
                  color="current"
                  className="h-5 w-5"
                />
              </Link> */}
              {/* <Link
                href="https://www.linkedin.com/company/bandt-consulting"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-secondary hover:text-foreground transition-colors"
                aria-label="Visit our LinkedIn page"
              >
                <LinkedInIcon 
                  size={20}
                  color="current"
                  className="h-5 w-5"
                />
              </Link> */}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">About Us</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-foreground-secondary hover:text-foreground transition-colors">Company</Link>
              <Link href="/blog" className="block text-foreground-secondary hover:text-foreground transition-colors">Blog</Link>
              <Link href="/news" className="block text-foreground-secondary hover:text-foreground transition-colors">News</Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Services</h3>
            <div className="space-y-2">
              <Link href="/services/traditional-it" className="block text-foreground-secondary hover:text-foreground transition-colors">Traditional IT</Link>
              <Link href="/services/applications" className="block text-foreground-secondary hover:text-foreground transition-colors">Applications & Integrations</Link>
              <Link href="/services/surveillance" className="block text-foreground-secondary hover:text-foreground transition-colors">Integrated Surveillance</Link>
              <Link href="/services/asset-management" className="block text-foreground-secondary hover:text-foreground transition-colors">Asset Management</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-foreground-muted text-sm mb-4 md:mb-0">
            © Copyright 2025<br/>
            {APP_CONSTS?.APP_ABN && `ABN: ${APP_CONSTS.APP_ABN}`}
          </div>
          <div className="flex items-center space-x-6">
            <SimpleThemeToggle />
            
          </div>
        </div>
      </div>
    </footer>
  );
}
