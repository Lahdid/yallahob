'use client';

import { Code, Code2 } from 'lucide-react';
import React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTiptapToolbar } from '@/providers/tiptap-toolbar-provider';

const CodeBlockToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useTiptapToolbar();
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', editor?.isActive('codeBlock') && 'bg-accent', className)}
        onClick={(e) => {
          e.preventDefault();
          editor?.chain().focus().toggleCodeBlock().run();
          onClick?.(e);
        }}
        disabled={!editor?.can().chain().focus().toggleCodeBlock().run()}
        ref={ref}
        {...props}>
        {children || <Code className="h-4 w-4" />}
      </Button>
    );
  },
);

CodeBlockToolbar.displayName = 'CodeBlockToolbar';

export { CodeBlockToolbar };
