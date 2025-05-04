'use client';

import { ItalicIcon } from 'lucide-react';
import React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTiptapToolbar } from '@/providers/tiptap-toolbar-provider';

const ItalicToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useTiptapToolbar();
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', editor?.isActive('italic') && 'bg-accent', className)}
        onClick={(e) => {
          e.preventDefault();

          editor?.chain().focus().toggleItalic().run();
          onClick?.(e);
        }}
        disabled={!editor?.can().chain().focus().toggleItalic().run()}
        ref={ref}
        {...props}>
        {children || <ItalicIcon className="h-4 w-4" />}
      </Button>
    );
  },
);

ItalicToolbar.displayName = 'ItalicToolbar';

export { ItalicToolbar };
