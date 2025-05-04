'use client';

import { List } from 'lucide-react';
import React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTiptapToolbar } from '@/providers/tiptap-toolbar-provider';

const BulletListToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useTiptapToolbar();
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', editor?.isActive('bulletList') && 'bg-accent', className)}
        onClick={(e) => {
          e.preventDefault();
          editor?.chain().focus().toggleBulletList().run();
          onClick?.(e);
        }}
        disabled={!editor?.can().chain().focus().toggleBulletList().run()}
        ref={ref}
        {...props}>
        {children || <List className="h-4 w-4" />}
      </Button>
    );
  },
);

BulletListToolbar.displayName = 'BulletListToolbar';

export { BulletListToolbar };
