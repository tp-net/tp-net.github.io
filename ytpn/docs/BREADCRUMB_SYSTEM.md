# Breadcrumb System Documentation

This document describes the breadcrumb system implemented using shadcn/ui components with metadata support.

## Components

### 1. MetadataBreadcrumb
A client-side breadcrumb component that automatically generates breadcrumbs based on the current pathname or accepts custom breadcrumb items.

**Features:**
- Automatic path-based breadcrumb generation
- Custom breadcrumb items support
- Responsive design
- Theme integration
- Accessibility support

**Usage:**
```tsx
import { MetadataBreadcrumb } from '@/components/ui/metadata-breadcrumb';

// Automatic generation
<MetadataBreadcrumb />

// Custom items
<MetadataBreadcrumb 
  items={[
    { label: 'Home', href: '/' },
    { label: 'Sponsors', href: '/sponsors' },
    { label: 'B&T Digital' }
  ]}
/>
```

### 2. StructuredBreadcrumb
An enhanced breadcrumb component that includes structured data for SEO optimization.

**Features:**
- All features of MetadataBreadcrumb
- JSON-LD structured data for search engines
- SEO optimization
- Schema.org compliance

**Usage:**
```tsx
import { StructuredBreadcrumb } from '@/components/ui/structured-breadcrumb';

<StructuredBreadcrumb 
  items={[
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: 'YTPN Annual Conference 2024' }
  ]}
/>
```

### 3. Base Breadcrumb Components
The system includes individual shadcn/ui breadcrumb components:

- `Breadcrumb` - Main container
- `BreadcrumbList` - List container
- `BreadcrumbItem` - Individual breadcrumb item
- `BreadcrumbLink` - Clickable breadcrumb link
- `BreadcrumbPage` - Current page (non-clickable)
- `BreadcrumbSeparator` - Separator between items
- `BreadcrumbEllipsis` - Ellipsis for truncated breadcrumbs

## Implementation

### Dependencies
- `@radix-ui/react-slot` - For polymorphic components
- `lucide-react` - For icons
- `clsx` and `tailwind-merge` - For className merging

### Configuration
The system is configured via `components.json`:
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## Usage Examples

### Sponsor Pages
```tsx
<MetadataBreadcrumb 
  items={[
    { label: 'Home', href: '/' },
    { label: 'Sponsors', href: '/sponsors' },
    { label: sponsor.name }
  ]}
/>
```

### Event Pages
```tsx
<StructuredBreadcrumb 
  items={[
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: event.title }
  ]}
/>
```

### Blog Pages
```tsx
<MetadataBreadcrumb 
  items={[
    { label: 'Home', href: '/' },
    { label: 'Blog' }
  ]}
/>
```

## SEO Benefits

The structured breadcrumb component provides:
- JSON-LD structured data for search engines
- Improved navigation understanding
- Better search result snippets
- Enhanced user experience
- Schema.org compliance

## Styling

The breadcrumb components use Tailwind CSS classes and integrate with the existing theme system:
- Responsive design
- Dark/light mode support
- Consistent spacing and typography
- Hover states and transitions

## Accessibility

The breadcrumb system includes:
- Proper ARIA labels
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Future Enhancements

Potential improvements:
- Dynamic breadcrumb generation from route metadata
- Breadcrumb caching for performance
- Custom separator icons
- Breadcrumb truncation for long paths
- Integration with Next.js router events
