# Forms Documentation

## BaseEmbedableForm Component

The `BaseEmbedableForm` component provides a reusable way to embed external forms (Google Forms, Typeform, etc.) with consistent styling, loading states, and success handling.

### Usage

```tsx
import { BaseEmbedableForm } from '@/components';

function MyFormSection() {
  return (
    <BaseEmbedableForm
      formUrl="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
      height={600}
      successMessage={{
        title: "Thank You!",
        description: "We'll be in touch soon."
      }}
      headerContent={
        <div className="text-center">
          <h3>Join Our Network</h3>
          <p>Fill out the form below to get started</p>
        </div>
      }
      footerContent={
        <div className="text-center">
          <p>Questions? Contact us</p>
        </div>
      }
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `formUrl` | `string` | **required** | The URL of the form to embed |
| `height` | `number` | `800` | Height of the embedded form in pixels |
| `successMessage` | `object` | `{ title: "Thank You!", description: "We'll be in touch soon." }` | Custom success message |
| `loadingMessage` | `string` | `"Loading form..."` | Custom loading message |
| `showSuccessOverlay` | `boolean` | `true` | Whether to show the success overlay |
| `containerClassName` | `string` | `""` | Custom CSS classes for the form container |
| `iframeClassName` | `string` | `""` | Custom CSS classes for the iframe |
| `onFormLoad` | `function` | `undefined` | Callback when form loads |
| `onFormSubmit` | `function` | `undefined` | Callback when form is submitted |
| `headerContent` | `ReactNode` | `undefined` | Custom content above the form |
| `footerContent` | `ReactNode` | `undefined` | Custom content below the form |

### Features

- **Loading States**: Smooth loading animation with customizable message
- **Success Handling**: Automatic success overlay with customizable message
- **Responsive Design**: Works across all screen sizes
- **Customizable Styling**: Support for custom CSS classes
- **Event Callbacks**: Hooks for form load and submit events
- **Flexible Content**: Support for custom header and footer content
- **Form Integration**: Works with Google Forms, Typeform, and other embeddable forms

### Examples

#### Simple Form
```tsx
<BaseEmbedableForm
  formUrl="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
/>
```

#### Custom Styled Form
```tsx
<BaseEmbedableForm
  formUrl="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
  height={600}
  containerClassName="my-custom-container"
  iframeClassName="my-custom-iframe"
  successMessage={{
    title: "Success!",
    description: "Your response has been recorded."
  }}
/>
```

#### Form with Custom Content
```tsx
<BaseEmbedableForm
  formUrl="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
  headerContent={
    <div className="text-center mb-6">
      <h2 className="text-3xl font-bold mb-2">Join Our Community</h2>
      <p className="text-gray-600">Fill out the form to get started</p>
    </div>
  }
  footerContent={
    <div className="text-center mt-6">
      <p className="text-sm text-gray-500">
        Need help? <a href="/contact" className="text-blue-600">Contact us</a>
      </p>
    </div>
  }
/>
```

### Migration from RegisterInterestSection

The `RegisterInterestSection` component has been refactored to use `BaseEmbedableForm`. The form functionality is now reusable across the application while maintaining the same visual design and user experience.

### Best Practices

1. **Form URLs**: Always use the embedded version of form URLs (with `?embedded=true` for Google Forms)
2. **Height**: Set appropriate heights based on your form content (typically 600-1000px)
3. **Loading States**: The component handles loading states automatically
4. **Success Messages**: Customize success messages to match your brand voice
5. **Responsive Design**: The component is fully responsive by default
6. **Accessibility**: Ensure your embedded forms meet accessibility standards
