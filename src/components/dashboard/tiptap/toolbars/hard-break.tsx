'use client';

import { WrapText } from 'lucide-react';
import React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTiptapToolbar } from '@/providers/tiptap-toolbar-provider';

const HardBreakToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useTiptapToolbar();
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', className)}
        onClick={(e) => {
          e.preventDefault();
          editor?.chain().focus().setHardBreak().run();
          onClick?.(e);
        }}
        ref={ref}
        {...props}>
        {children || <WrapText className="h-4 w-4" />}
      </Button>
    );
  },
);

HardBreakToolbar.displayName = 'HardBreakToolbar';

export { HardBreakToolbar };
