# Event Cards Component System

This document provides comprehensive documentation for the Event Cards component system, including usage examples, API reference, and design guidelines.

## Overview

The Event Cards system provides a flexible, scalable solution for displaying event information across different contexts and screen sizes. The system includes three distinct scales and supports eight different event types with full theme system integration.

## Components

### Base Components

- **EventCard**: Base component with configurable scale
- **CompactEventCard**: Optimized for lists and dense layouts
- **StandardEventCard**: Balanced layout for main content areas
- **FeaturedEventCard**: Premium layout for hero sections and highlights

### Event Types

The system supports eight distinct event types, each with unique styling:

| Type | Icon | Color | Use Case |
|------|------|-------|----------|
| `conference` | 🎯 | Primary Blue | Major industry conferences |
| `workshop` | 🛠️ | Accent Purple | Hands-on learning sessions |
| `meetup` | 👥 | Success Green | Casual networking events |
| `networking` | 🤝 | Info Blue | Professional networking |
| `seminar` | 📚 | Warning Orange | Educational presentations |
| `hackathon` | 💻 | Destructive Red | Competitive coding events |
| `panel` | 🎤 | Primary-600 | Expert discussions |
| `keynote` | ⭐ | Primary-800 | Featured presentations |

## API Reference

### EventData Interface

```typescript
interface EventData {
  id: string;                    // Unique identifier
  title: string;                 // Event title
  description: string;           // Event description
  eventType: EventType;         // One of the 8 supported types
  date: string;                 // Event date (formatted string)
  time: string;                 // Event time (formatted string)
  location: string;             // Event location
  image?: string;               // Optional event image URL
  link?: string;                // Optional external link
  content?: ReactNode;          // Optional custom content
  sponsors?: string[];          // Optional sponsor list
  tags?: string[];              // Optional tag list
  organizers?: string[];        // Optional organizer list
  capacity?: number;            // Optional capacity limit
  price?: string;               // Optional price information
  isVirtual?: boolean;          // Virtual event flag
}
```

### EventCardProps Interface

```typescript
interface EventCardProps {
  event: EventData;             // Event data object
  scale?: EventCardScale;       // Card scale ('compact' | 'standard' | 'featured')
  className?: string;           // Additional CSS classes
  onClick?: () => void;         // Click handler
}
```

## Usage Examples

### Basic Usage

```tsx
import { EventCard, sampleEvents } from '@/components';

function EventList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sampleEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          scale="standard"
          onClick={() => console.log('Event clicked:', event)}
        />
      ))}
    </div>
  );
}
```

### Using Specialized Components

```tsx
import { 
  CompactEventCard, 
  StandardEventCard, 
  FeaturedEventCard 
} from '@/components';

function EventDashboard() {
  return (
    <div>
      {/* Featured event */}
      <FeaturedEventCard event={featuredEvent} />
      
      {/* Standard events grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {standardEvents.map((event) => (
          <StandardEventCard key={event.id} event={event} />
        ))}
      </div>
      
      {/* Compact events list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {compactEvents.map((event) => (
          <CompactEventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
```

### Using the Factory Function

```tsx
import { createEventCard, sampleEvents } from '@/components';

function DynamicEventList({ scale }: { scale: EventCardScale }) {
  const EventCardComponent = createEventCard(scale);
  
  return (
    <div className="grid gap-6">
      {sampleEvents.map((event) => (
        <EventCardComponent key={event.id} event={event} />
      ))}
    </div>
  );
}
```

## Scale Specifications

### Compact Scale
- **Use Case**: Lists, sidebars, dense layouts
- **Max Width**: 384px (max-w-sm)
- **Padding**: 16px (p-4)
- **Title Size**: text-lg
- **Description**: text-sm, 2-line clamp
- **Grid**: 1-4 columns responsive
- **Features**: Minimal information, essential details only

### Standard Scale
- **Use Case**: Main content areas, event listings
- **Max Width**: 448px (max-w-md)
- **Padding**: 24px (p-6)
- **Title Size**: text-xl
- **Description**: text-base, 3-line clamp
- **Grid**: 1-3 columns responsive
- **Features**: Comprehensive information, balanced layout

### Featured Scale
- **Use Case**: Hero sections, highlights, premium displays
- **Max Width**: 512px (max-w-lg)
- **Padding**: 32px (p-8)
- **Title Size**: text-2xl
- **Description**: text-lg, 4-line clamp
- **Grid**: 1-2 columns responsive
- **Features**: Premium styling, enhanced animations, full information

## Responsive Design

### Breakpoint Strategy

| Screen Size | Compact | Standard | Featured |
|-------------|---------|----------|----------|
| Mobile (320px+) | 1 column | 1 column | 1 column |
| Tablet (768px+) | 2-3 columns | 2 columns | 1 column |
| Desktop (1024px+) | 3-4 columns | 3 columns | 2 columns |
| Large (1280px+) | 4 columns | 3 columns | 2 columns |

### Mobile Optimizations

- Touch-friendly tap targets (minimum 44px)
- Condensed information display
- Optimized image sizes
- Simplified tag display
- Enhanced readability

## Theme System Integration

### Color Usage

All event cards use semantic color naming from the theme system:

- `bg-card` / `text-card-foreground`: Card background and text
- `bg-background-secondary` / `text-foreground-secondary`: Secondary information
- `bg-background-tertiary` / `text-foreground-tertiary`: Muted information
- `bg-primary` / `text-primary-foreground`: Event type badges
- `text-primary`: Interactive elements and highlights

### Dark Mode Support

All components automatically adapt to dark mode through CSS custom properties:

- Automatic color inversion
- Maintained contrast ratios
- Smooth transitions (300ms)
- Consistent visual hierarchy

## Accessibility Features

### Keyboard Navigation

- Full keyboard support with Tab navigation
- Enter/Space key activation
- Focus indicators with ring styling
- Logical tab order

### Screen Reader Support

- Semantic HTML structure
- ARIA labels and roles
- Descriptive alt text for images
- Proper heading hierarchy

### Visual Accessibility

- WCAG 2.1 AA compliant contrast ratios
- High contrast mode support
- Scalable text and icons
- Clear visual hierarchy

## Performance Considerations

### Optimization Strategies

- CSS-only animations for smooth performance
- Efficient re-renders with React.memo potential
- Lazy loading for images
- Minimal JavaScript overhead

### Bundle Size

- Tree-shakeable exports
- Shared component logic
- Minimal dependencies (only Lucide React icons)

## Best Practices

### Content Guidelines

1. **Titles**: Keep under 60 characters for optimal display
2. **Descriptions**: 2-3 sentences maximum for readability
3. **Tags**: Limit to 3-5 relevant tags
4. **Images**: Use 16:9 aspect ratio, optimize for web
5. **Dates**: Use consistent formatting (e.g., "March 15, 2024")

### Layout Guidelines

1. **Grid Spacing**: Use consistent gap values (4, 6, 8)
2. **Card Spacing**: Maintain adequate white space
3. **Responsive**: Test on all breakpoints
4. **Loading States**: Consider skeleton loading for dynamic content

### Interaction Guidelines

1. **Click Areas**: Ensure adequate click targets
2. **Hover States**: Provide clear visual feedback
3. **Loading**: Handle loading and error states
4. **Navigation**: Provide clear next steps

## Demo and Testing

Visit `/event-cards-demo` to see all event card scales in action with:

- Interactive scale switching
- Sample event data
- Responsive design testing
- Theme system demonstration
- Accessibility testing tools

## Migration Guide

### From Custom Event Cards

1. Replace custom event card components with the new system
2. Map existing event data to the `EventData` interface
3. Choose appropriate scale based on layout requirements
4. Update styling to use theme system classes
5. Test responsive behavior across breakpoints

### Updating Existing Components

1. Import the new event card components
2. Replace hardcoded styling with theme system classes
3. Update event data structure to match interface
4. Test accessibility and keyboard navigation
5. Validate responsive design

## Troubleshooting

### Common Issues

**Cards not displaying properly**
- Check that event data matches the `EventData` interface
- Verify theme system is properly configured
- Ensure Tailwind CSS is compiled with all required classes

**Responsive layout issues**
- Test on actual devices, not just browser dev tools
- Check grid container classes and gap values
- Verify breakpoint-specific styling

**Theme system not working**
- Ensure ThemeProvider is wrapping the application
- Check CSS custom properties are loaded
- Verify dark mode toggle functionality

**Accessibility issues**
- Test with screen readers
- Check keyboard navigation
- Validate color contrast ratios
- Ensure proper ARIA labels

## Future Enhancements

### Planned Features

- Animation presets for different use cases
- Custom event type configuration
- Advanced filtering and sorting
- Integration with calendar systems
- Social sharing capabilities
- Analytics tracking integration

### Extension Points

- Custom event type definitions
- Additional scale variations
- Plugin system for custom fields
- Integration with external APIs
- Custom styling themes
