# Forest Theme System

This project includes a comprehensive dark and light mode forest-themed system built with Tailwind CSS 4 and React. The system provides intelligent color management with natural forest colors, smooth transitions, and excellent accessibility features.

## Features

### 🌲 Forest Color Palette

- **HSL-based colors** for better color manipulation
- **Semantic color naming** for intuitive usage
- **Automatic dark mode adaptation** with proper contrast ratios
- **10-shade primary color system** (50-900) in forest greens
- **Natural semantic colors** inspired by forest elements (earth browns, autumn golds, stream blues)

### 🌲 Forest Theme Modes

- **Light Mode**: Warm, natural interface with cream backgrounds and forest green accents
- **Dark Mode**: Deep forest atmosphere with dark greens and mint highlights
- **System Mode**: Automatically follows user's system preference
- **Smooth transitions** between themes (300ms ease)

### 💾 Persistence

- **localStorage integration** to remember user preferences
- **Hydration-safe** implementation to prevent flash of unstyled content
- **System preference detection** with real-time updates

### ♿ Accessibility

- **WCAG 2.1 compliant** contrast ratios
- **Focus indicators** for keyboard navigation
- **Screen reader friendly** with proper ARIA labels
- **High contrast support** for better visibility

## Usage

### Basic Theme Toggle

```tsx
import { SimpleThemeToggle } from "@/components/ui/SimpleThemeToggle";

function Header() {
  return (
    <header className="bg-background border-b border-border">
      <SimpleThemeToggle />
    </header>
  );
}
```

### Advanced Theme Control

```tsx
import { useTheme } from "@/components/providers/ThemeProvider";

function ThemeSelector() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {resolvedTheme}</p>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("system")}>System</button>
    </div>
  );
}
```

### Using Theme Colors

```tsx
// Background colors
<div className="bg-background">Main background</div>
<div className="bg-background-secondary">Secondary background</div>
<div className="bg-background-tertiary">Tertiary background</div>
<div className="bg-background-muted">Muted background</div>

// Text colors
<p className="text-foreground">Primary text</p>
<p className="text-foreground-secondary">Secondary text</p>
<p className="text-foreground-tertiary">Tertiary text</p>
<p className="text-foreground-muted">Muted text</p>

// Primary colors
<button className="bg-primary text-primary-foreground">Primary button</button>
<div className="bg-primary-100 text-primary-900">Light primary</div>
<div className="bg-primary-900 text-primary-100">Dark primary</div>

// Semantic colors
<div className="bg-success text-success-foreground">Success message</div>
<div className="bg-warning text-warning-foreground">Warning message</div>
<div className="bg-destructive text-destructive-foreground">Error message</div>
<div className="bg-info text-info-foreground">Info message</div>
```

## Color System

### Light Mode Colors - Forest Theme

- **Background**: Warm cream (#fefdf8)
- **Foreground**: Deep forest green (#1a2e1a)
- **Primary**: Rich forest green (#2d5a2d)
- **Secondary**: Light sage green (#f0f4f0)
- **Accent**: Earth brown (#8b4513)

### Dark Mode Colors - Forest Theme

- **Background**: Very dark forest green (#0d1b0d)
- **Foreground**: Light mint green (#e8f5e8)
- **Primary**: Medium forest green (#4a7c59)
- **Secondary**: Dark forest green (#1a2e1a)
- **Accent**: Warm brown (#cd853f)

### Semantic Colors - Forest Theme

- **Success**: Forest green (#228b22)
- **Warning**: Goldenrod - autumn leaves (#daa520)
- **Destructive**: Saddle brown - forest fire (#8b4513)
- **Info**: Steel blue - forest streams (#4682b4)

## Components

### ThemeProvider

The main provider that manages theme state and applies CSS classes.

```tsx
import { ThemeProvider } from "@/components/providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <YourApp />
    </ThemeProvider>
  );
}
```

### ThemeToggle

A comprehensive theme selector with three options (Light, Dark, System).

### SimpleThemeToggle

A compact toggle that cycles through themes (Light → Dark → System → Light).

## CSS Custom Properties

The theme system uses CSS custom properties for all colors:

```css
:root {
  /* Light mode - Forest Theme */
  --background: 60 20% 99%; /* Warm cream */
  --foreground: 120 30% 15%; /* Deep forest green */
  --primary: 120 35% 25%; /* Rich forest green */
  /* ... more colors */
}

.dark {
  /* Dark mode - Forest Theme */
  --background: 120 40% 8%; /* Very dark forest green */
  --foreground: 120 30% 90%; /* Light mint green */
  --primary: 120 25% 45%; /* Medium forest green */
  /* ... more colors */
}
```

## Tailwind Configuration

The theme is configured in `tailwind.config.ts` with semantic color names:

```ts
theme: {
  extend: {
    colors: {
      background: {
        DEFAULT: "hsl(var(--background))",
        secondary: "hsl(var(--background-secondary))",
        // ...
      },
      // ... more color definitions
    }
  }
}
```

## Best Practices

1. **Use semantic color names** instead of hardcoded colors
2. **Test in both light and dark modes** during development
3. **Use the theme toggle** to verify contrast and readability
4. **Prefer opacity modifiers** for hover states (e.g., `hover:bg-primary/90`)
5. **Use the demo page** (`/theme-demo`) to test all color combinations

## Demo

Visit `/theme-demo` to see the theme system in action with:

- Color palette showcase
- UI component examples
- Interactive theme toggle
- Accessibility features demonstration

## Browser Support

- Modern browsers with CSS custom properties support
- Automatic fallback to light mode for older browsers
- Progressive enhancement approach

## Performance

- **CSS-only transitions** for smooth theme switching
- **No JavaScript required** for basic theme application
- **Minimal bundle size** impact
- **Efficient re-renders** with React context optimization

## Keeping Forest Palette and CSS Aligned

> **IMPORTANT:**
> The forest color palette used in JS/TS (`src/styles/palette.ts`) and the CSS custom properties in `globals.css` must always be kept in sync. Any time you update a color in one, update the other to match. This ensures a single source of truth for both CSS and JS/TS color usage, and prevents visual inconsistencies.
>
> - Use `palette.ts` for all color values in JS/TS (e.g., for embedded component theming, JS-driven styles, etc.)
> - Use CSS variables in `globals.css` for all Tailwind and CSS-based styling.
>
> **When adding or changing a forest color:**
>
> 1. Update the value in both `globals.css` and `palette.ts`.
> 2. Double-check the mapping for both light and dark mode.
> 3. Test in both modes to ensure consistency.
> 4. Maintain the forest theme aesthetic with natural, earthy tones.
