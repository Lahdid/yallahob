'use client';

import { Heading1, Heading2, Heading3 } from 'lucide-react';
import React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useTiptapToolbar } from '@/providers/tiptap-toolbar-provider';

const HeadingToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useTiptapToolbar();

    const isAnyHeadingActive =
      editor?.isActive('heading', { level: 1 }) ||
      editor?.isActive('heading', { level: 2 }) ||
      editor?.isActive('heading', { level: 3 });

    const getCurrentHeadingIcon = () => {
      if (editor?.isActive('heading', { level: 1 })) {
        return <Heading1 className="h-4 w-4" />;
      }
      if (editor?.isActive('heading', { level: 2 })) {
        return <Heading2 className="h-4 w-4" />;
      }
      if (editor?.isActive('heading', { level: 3 })) {
        return <Heading3 className="h-4 w-4" />;
      }
      return <Heading1 className="h-4 w-4" />;
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-8 w-8', isAnyHeadingActive && 'bg-accent', className)}
            ref={ref}
            {...props}>
            {children || getCurrentHeadingIcon()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleHeading({ level: 1 }).run();
              onClick?.(e as any);
            }}
            className={cn(editor?.isActive('heading', { level: 1 }) && 'bg-accent')}>
            <Heading1 className="mr-2 h-4 w-4" />
            Heading 1
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleHeading({ level: 2 }).run();
              onClick?.(e as any);
            }}
            className={cn(editor?.isActive('heading', { level: 2 }) && 'bg-accent')}>
            <Heading2 className="mr-2 h-4 w-4" />
            Heading 2
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleHeading({ level: 3 }).run();
              onClick?.(e as any);
            }}
            className={cn(editor?.isActive('heading', { level: 3 }) && 'bg-accent')}>
            <Heading3 className="mr-2 h-4 w-4" />
            Heading 3
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

HeadingToolbar.displayName = 'HeadingToolbar';

export { HeadingToolbar };
