'use client';

import { CornerUpRight } from 'lucide-react';
import React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTiptapToolbar } from '@/providers/tiptap-toolbar-provider';

const RedoToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useTiptapToolbar();

    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', className)}
        onClick={(e) => {
          e.preventDefault();
          editor?.chain().focus().redo().run();
          onClick?.(e);
        }}
        disabled={!editor?.can().chain().focus().redo().run()}
        ref={ref}
        {...props}>
        {children || <CornerUpRight className="h-4 w-4" />}
      </Button>
    );
  },
);

RedoToolbar.displayName = 'RedoToolbar';

export { RedoToolbar };
