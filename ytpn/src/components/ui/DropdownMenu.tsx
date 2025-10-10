'use client';

/**
 * FUNCTIONAL REQUIREMENTS:
 * - Dropdown menu component following shadcn/ui patterns
 * - Proper z-index layering for overlays
 * - Click outside to close functionality
 * - Keyboard navigation support (Escape key)
 * - Accessible ARIA attributes
 * - Theme system integration
 * - Portal rendering for proper layering
 */

import { useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface DropdownMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom';
  className?: string;
  triggerClassName?: string;
}

export function DropdownMenu({ 
  trigger, 
  children, 
  align = 'end',
  side = 'bottom',
  className = '',
  triggerClassName = ''
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Calculate dropdown position
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      
      let top = triggerRect.bottom;
      let left = triggerRect.left;
      
      // Adjust for side
      if (side === 'top') {
        top = triggerRect.top - 8; // 8px gap
      } else {
        top = triggerRect.bottom + 8; // 8px gap
      }
      
      // Adjust for alignment
      if (align === 'end') {
        left = triggerRect.right - 192; // 192px = w-48
      } else if (align === 'center') {
        left = triggerRect.left + (triggerRect.width / 2) - 96; // 96px = w-48/2
      }
      
      // Ensure dropdown stays within viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const dropdownWidth = 192; // w-48
      const dropdownHeight = 200; // estimated height
      
      // Horizontal positioning
      if (left + dropdownWidth > viewportWidth) {
        left = viewportWidth - dropdownWidth - 16; // 16px margin
      }
      if (left < 16) {
        left = 16; // 16px margin
      }
      
      // Vertical positioning
      if (side === 'bottom' && top + dropdownHeight > viewportHeight) {
        // If dropdown would go off bottom, show above instead
        top = triggerRect.top - dropdownHeight - 8;
      } else if (side === 'top' && top < 0) {
        // If dropdown would go off top, show below instead
        top = triggerRect.bottom + 8;
      }
      
      setPosition({ top, left });
    }
  }, [isOpen, align, side]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        triggerRef.current && 
        dropdownRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Trigger */}
      <div 
        ref={triggerRef}
        className={`inline-block ${triggerClassName}`}
        onClick={handleTriggerClick}
      >
        {trigger}
      </div>

      {/* Dropdown Menu - Rendered in Portal */}
      {isOpen && typeof window !== 'undefined' && createPortal(
        <div
          ref={dropdownRef}
          className={`
            fixed z-[100] w-48 bg-card border border-border rounded-lg shadow-lg
            ${side === 'top' ? 'animate-in slide-in-from-bottom-2' : 'animate-in slide-in-from-top-2'}
            ${className}
          `}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          role="menu"
          aria-orientation="vertical"
        >
          {children}
        </div>,
        document.body
      )}
    </>
  );
}

interface DropdownMenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function DropdownMenuItem({ 
  children, 
  onClick, 
  className = '',
  disabled = false 
}: DropdownMenuItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        w-full flex items-center text-left px-3 py-2 text-sm
        hover:bg-background-secondary transition-colors
        focus:outline-none focus:bg-background-secondary
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      role="menuitem"
    >
      {children}
    </button>
  );
}

interface DropdownMenuContentProps {
  children: ReactNode;
  className?: string;
}

export function DropdownMenuContent({ 
  children, 
  className = '' 
}: DropdownMenuContentProps) {
  return (
    <div className={`py-1 ${className}`}>
      {children}
    </div>
  );
}
