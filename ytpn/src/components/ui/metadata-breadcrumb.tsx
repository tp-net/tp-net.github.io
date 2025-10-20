'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb';
import { APP_CONSTS } from '@/db/app';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface MetadataBreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

// Default breadcrumb mappings for common routes
const defaultBreadcrumbs: Record<string, BreadcrumbItem[]> = {
  '/partners': [{ label: 'Home', href: '/' }, { label: 'Partners' }],
  '/events': [{ label: 'Home', href: '/' }, { label: 'Events' }],
  '/blog': [{ label: 'Home', href: '/' }, { label: 'Blog' }],
};

export function MetadataBreadcrumb({
  items,
  className,
}: MetadataBreadcrumbProps) {
  const pathname = usePathname();

  // Use provided items or generate from pathname
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname);

  if (breadcrumbItems.length <= 1) {
    return null; // Don't show breadcrumbs for single items
  }

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <div key={index} className='flex items-center'>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href || '#'}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  // Check for exact matches first
  if (defaultBreadcrumbs[pathname]) {
    return defaultBreadcrumbs[pathname];
  }

  // Handle dynamic routes
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

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

// Hook for getting breadcrumb data with metadata
export function useBreadcrumbs(
  pageTitle?: string,
  pageType?: string
): BreadcrumbItem[] {
  const pathname = usePathname();

  // If we have a page title, use it for the last breadcrumb
  if (pageTitle && pageType) {
    const baseBreadcrumbs = generateBreadcrumbsFromPath(pathname);

    // Replace the last item with the actual page title
    if (baseBreadcrumbs.length > 0) {
      baseBreadcrumbs[baseBreadcrumbs.length - 1] = { label: pageTitle };
    }

    return baseBreadcrumbs;
  }

  return generateBreadcrumbsFromPath(pathname);
}
