'use client';

/**
 * FUNCTIONAL REQUIREMENTS:
 * - Share button with dropdown menu for multiple sharing options
 * - Copy link functionality with visual feedback
 * - Email sharing with pre-filled subject and body
 * - Social media sharing options (Twitter, LinkedIn, Facebook)
 * - Accessible dropdown with keyboard navigation
 * - Responsive design that works on mobile and desktop
 * - Theme system integration with proper contrast
 * - Click outside to close dropdown functionality
 * - Visual feedback for successful actions (copy, share)
 * - Proper z-index layering using shadcn/ui patterns
 */

import { useState } from 'react';
import { Share2, Copy, Mail, Twitter, Linkedin, Facebook, Check } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/DropdownMenu';

interface ShareButtonProps {
  eventTitle: string;
  eventUrl: string;
  eventDate?: string;
  eventLocation?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ShareButton({ 
  eventTitle, 
  eventUrl, 
  eventDate, 
  eventLocation, 
  className = '',
  size = 'md'
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Check out this event: ${eventTitle}`);
    const body = encodeURIComponent(
      `I thought you might be interested in this event:\n\n${eventTitle}\n\n` +
      `${eventDate ? `Date: ${eventDate}\n` : ''}` +
      `${eventLocation ? `Location: ${eventLocation}\n` : ''}` +
      `\nMore details: ${eventUrl}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`Check out this event: ${eventTitle}`);
    const url = encodeURIComponent(eventUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(eventUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(eventUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const shareButton = (
    <button
      data-prevent-navigation
      className={`
        ${sizeClasses[size]}
        inline-flex items-center justify-center
        bg-background-secondary text-foreground-secondary
        border border-border rounded-lg
        hover:bg-background-tertiary hover:text-foreground
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
      `}
      aria-label="Share event"
    >
      <Share2 className={iconSizes[size]} />
    </button>
  );

  return (
    <div className={className}>
      <DropdownMenu trigger={shareButton} align="end">
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleCopyLink}>
            {copied ? (
              <>
                <Check className={`${iconSizes[size]} mr-3 text-success`} />
                <span className="text-success">Copied!</span>
              </>
            ) : (
              <>
                <Copy className={`${iconSizes[size]} mr-3`} />
                <span>Copy Link</span>
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleEmailShare}>
            <Mail className={`${iconSizes[size]} mr-3`} />
            <span>Email</span>
          </DropdownMenuItem>

          {/* <DropdownMenuItem onClick={handleTwitterShare}>
            <Twitter className={`${iconSizes[size]} mr-3`} />
            <span>Twitter</span>
          </DropdownMenuItem> */}

          {/* <DropdownMenuItem onClick={handleLinkedInShare}>
            <Linkedin className={`${iconSizes[size]} mr-3`} />
            <span>LinkedIn</span>
          </DropdownMenuItem> */}

          {/* <DropdownMenuItem onClick={handleFacebookShare}>
            <Facebook className={`${iconSizes[size]} mr-3`} />
            <span>Facebook</span>
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
