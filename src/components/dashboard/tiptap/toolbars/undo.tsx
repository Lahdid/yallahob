'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTiptapToolbar } from '@/providers/tiptap-toolbar-provider';
import { CornerUpLeft } from 'lucide-react';
import React from 'react';

const UndoToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useTiptapToolbar();

    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', className)}
        onClick={(e) => {
          e.preventDefault();
          editor?.chain().focus().undo().run();
          onClick?.(e);
        }}
        disabled={!editor?.can().chain().focus().undo().run()}
        ref={ref}
        {...props}>
        {children || <CornerUpLeft className="h-4 w-4" />}
      </Button>
    );
  },
);

UndoToolbar.displayName = 'UndoToolbar';

export { UndoToolbar };
