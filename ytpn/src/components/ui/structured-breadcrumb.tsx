'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MetadataBreadcrumb } from './metadata-breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface StructuredBreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function StructuredBreadcrumb({ items, className }: StructuredBreadcrumbProps) {
  const pathname = usePathname();
  
  // Use provided items or generate from pathname
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname);

  if (breadcrumbItems.length <= 1) {
    return null; // Don't show breadcrumbs for single items
  }

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `${process.env.NEXT_PUBLIC_APP_URL || 'https://ytp-net.github.io'}${item.href}` : undefined
    }))
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Visual Breadcrumb */}
      <MetadataBreadcrumb items={breadcrumbItems} className={className} />
    </>
  );
}

function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ];

  let currentPath = '';
  
  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];
    currentPath += `/${segment}`;
    
    // Skip dynamic segments (like [slug])
    if (segment.startsWith('[') && segment.endsWith(']')) {
      continue;
    }
    
    // Handle known route patterns
    if (segment === 'sponsors') {
      breadcrumbs.push({ label: 'Sponsors', href: currentPath });
    } else if (segment === 'events') {
      breadcrumbs.push({ label: 'Events', href: currentPath });
    } else if (segment === 'blog') {
      breadcrumbs.push({ label: 'Blog', href: currentPath });
    } else {
      // For dynamic segments, we'll need to get the actual name
      // This would typically come from the page's metadata or props
      breadcrumbs.push({ label: formatSegmentName(segment) });
    }
  }

  return breadcrumbs;
}

function formatSegmentName(segment: string): string {
  // Convert kebab-case to Title Case
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
