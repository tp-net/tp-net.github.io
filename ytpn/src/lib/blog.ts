import React from 'react';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  published: boolean;
  featured?: boolean;
  readingTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  Content: React.ComponentType;
}

/**
 * Dynamically scan the blog folder for available posts
 * Returns an array of blog post slugs found in the blog directory
 */
function scanBlogPosts(): string[] {
  try {
    // Get the blog directory path
    const blogDir = join(process.cwd(), 'src', 'app', 'blog');
    
    if (!existsSync(blogDir)) {
      console.warn('Blog directory not found:', blogDir);
      return [];
    }

    // Read all directories in the blog folder
    const entries = readdirSync(blogDir, { withFileTypes: true });
    const postSlugs: string[] = [];

    for (const entry of entries) {
      // Only process directories (potential blog posts)
      if (entry.isDirectory()) {
        const postDir = join(blogDir, entry.name);
        
        // Check if this directory contains a page.mdx file (required for a blog post)
        const mdxFile = join(postDir, 'page.mdx');
        if (existsSync(mdxFile)) {
          postSlugs.push(entry.name);
        }
      }
    }

    return postSlugs;
  } catch (error) {
    console.error('Error scanning blog posts:', error);
    return [];
  }
}

export function getAllPosts(): BlogPost[] {
  // Get all available blog post slugs by scanning the directory
  const availableSlugs = scanBlogPosts();
  
  const allPostsData = availableSlugs
    .map((slug) => {
      try {
        // Try to import metadata from individual metadata file
        let blogPostMetadata;
        try {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const metadataModule = require(`@/app/blog/${slug}/metadata.ts`);
          blogPostMetadata = metadataModule.blogPostMetadata;
        } catch (metadataError) {
          // If no metadata file exists, create default metadata
          console.warn(`No metadata file found for ${slug}, using defaults`);
          blogPostMetadata = {
            slug,
            title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            excerpt: 'No excerpt available',
            date: new Date().toISOString().split('T')[0],
            author: 'YTPN Team',
            tags: [],
            published: true,
            featured: false,
            readingTime: 5
          };
        }
        
        // Only process published posts
        if (!blogPostMetadata.published) {
          return null;
        }

        // Dynamically import the MDX component
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { default: Content } = require(`@/app/blog/${slug}/page.mdx`);
        
        return {
          ...blogPostMetadata,
          Content,
        };
      } catch (error) {
        console.error(`Error loading post ${slug}:`, error);
        return null;
      }
    })
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allPostsData;
}

export function getPostBySlug(slug: string): BlogPost | null {
  // Check if the slug exists by scanning the directory
  const availableSlugs = scanBlogPosts();
  if (!availableSlugs.includes(slug)) {
    return null;
  }

  try {
    // Try to import metadata from individual metadata file
    let blogPostMetadata;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const metadataModule = require(`@/app/blog/${slug}/metadata.ts`);
      blogPostMetadata = metadataModule.blogPostMetadata;
    } catch (metadataError) {
      // If no metadata file exists, create default metadata
      console.warn(`No metadata file found for ${slug}, using defaults`);
      blogPostMetadata = {
        slug,
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        excerpt: 'No excerpt available',
        date: new Date().toISOString().split('T')[0],
        author: 'YTPN Team',
        tags: [],
        published: true,
        featured: false,
        readingTime: 5
      };
    }
    
    if (!blogPostMetadata || !blogPostMetadata.published) {
      return null;
    }

    // Dynamically import the MDX component
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { default: Content } = require(`@/app/blog/${slug}/page.mdx`);

    return {
      ...blogPostMetadata,
      Content,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
}

/**
 * Get featured blog posts
 */
export function getFeaturedPosts(): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.featured);
}

/**
 * Get all unique tags from published posts
 */
export function getAllUniqueTags(): string[] {
  const allPosts = getAllPosts();
  const allTags = allPosts.flatMap((post) => post.tags);
  return Array.from(new Set(allTags)).sort();
}
