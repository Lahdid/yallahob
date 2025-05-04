'use client';

import { IconPhoto } from '@tabler/icons-react';
import React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTiptapToolbar } from '@/providers/tiptap-toolbar-provider';

const ImagePlaceholderToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useTiptapToolbar();
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', editor?.isActive('image-placeholder') && 'bg-accent', className)}
        onClick={(e) => {
          e.preventDefault();
          editor?.chain().focus().insertImagePlaceholder().run();
          onClick?.(e);
        }}
        ref={ref}
        {...props}>
        {children || <IconPhoto className="h-4 w-4" />}
      </Button>
    );
  },
);

ImagePlaceholderToolbar.displayName = 'ImagePlaceholderToolbar';

export { ImagePlaceholderToolbar };
