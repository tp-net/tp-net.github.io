/**
 * Main Blog Page
 * 
 * Functional Requirements:
 * - Display all available blog posts in a dedicated blog listing page
 * - Provide a clean, focused view of blog content
 * - Include page title and description for SEO
 * - Maintain consistent styling with the blog layout
 */

import { Metadata } from 'next';
import BlogSection from '@/components/BlogSection';
import { MetadataBreadcrumb } from '@/components/ui/metadata-breadcrumb';

export const metadata: Metadata = {
  title: 'Blog - YTPN',
  description: 'Read our latest insights on technology, digital transformation, and business solutions.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <MetadataBreadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog' }
            ]}
          />
        </div>
        
        {/* Blog Page Header */}
        <div className="text-center py-3">
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Insights, strategies, and thoughts on technology, digital transformation, 
            and modern business solutions.
          </p>
        </div>

        {/* Blog Section Component */}
        <BlogSection />
      </div>
    </div>
  );
}
