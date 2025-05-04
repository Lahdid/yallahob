'use client';

import { Strikethrough } from 'lucide-react';
import React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTiptapToolbar } from '@/providers/tiptap-toolbar-provider';

const StrikeThroughToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useTiptapToolbar();
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', editor?.isActive('strike') && 'bg-accent', className)}
        onClick={(e) => {
          e.preventDefault();
          editor?.chain().focus().toggleStrike().run();
          onClick?.(e);
        }}
        disabled={!editor?.can().chain().focus().toggleStrike().run()}
        ref={ref}
        {...props}>
        {children || <Strikethrough className="h-4 w-4" />}
      </Button>
    );
  },
);

StrikeThroughToolbar.displayName = 'StrikeThroughToolbar';

export { StrikeThroughToolbar };
