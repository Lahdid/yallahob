'use client';

import { ListOrdered } from 'lucide-react';
import React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTiptapToolbar } from '@/providers/tiptap-toolbar-provider';

const OrderedListToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useTiptapToolbar();
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', editor?.isActive('orderedList') && 'bg-accent', className)}
        onClick={(e) => {
          e.preventDefault();
          editor?.chain().focus().toggleOrderedList().run();
          onClick?.(e);
        }}
        disabled={!editor?.can().chain().focus().toggleOrderedList().run()}
        ref={ref}
        {...props}>
        {children || <ListOrdered className="h-4 w-4" />}
      </Button>
    );
  },
);

OrderedListToolbar.displayName = 'OrderedListToolbar';

export { OrderedListToolbar };
