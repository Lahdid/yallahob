'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useTiptapToolbar } from '@/providers/tiptap-toolbar-provider';
import type { Extension } from '@tiptap/core';
import type { ColorOptions } from '@tiptap/extension-color';
import type { HighlightOptions } from '@tiptap/extension-highlight';
import { Check, ChevronDown } from 'lucide-react';

type TextStylingExtensions = Extension<ColorOptions, any> | Extension<HighlightOptions, any>;

const TEXT_COLORS = [
  { name: 'noir', color: 'var(--text-default)' },
  { name: 'gris', color: 'var(--text-gray)' },
  { name: 'marron', color: 'var(--text-brown)' },
  { name: 'orange', color: 'var(--text-orange)' },
  { name: 'jaune', color: 'var(--text-yellow)' },
  { name: 'vert', color: 'var(--text-green)' },
  { name: 'bleu', color: 'var(--text-blue)' },
  { name: 'violet', color: 'var(--text-purple)' },
  { name: 'rose', color: 'var(--text-pink)' },
  { name: 'rouge', color: 'var(--text-red)' },
];

const HIGHLIGHT_COLORS = [
  { name: 'noir', color: 'var(--highlight-default)' },
  { name: 'gris', color: 'var(--highlight-gray)' },
  { name: 'marron', color: 'var(--highlight-brown)' },
  { name: 'orange', color: 'var(--highlight-orange)' },
  { name: 'jaune', color: 'var(--highlight-yellow)' },
  { name: 'vert', color: 'var(--highlight-green)' },
  { name: 'bleu', color: 'var(--highlight-blue)' },
  { name: 'violet', color: 'var(--highlight-purple)' },
  { name: 'rose', color: 'var(--highlight-pink)' },
  { name: 'rouge', color: 'var(--highlight-red)' },
];

interface ColorHighlightButtonProps {
  name: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
  isHighlight?: boolean;
}

const ColorHighlightButton = ({ name, color, isActive, onClick, isHighlight }: ColorHighlightButtonProps) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="hover:bg-gray-3 flex w-full items-center justify-between rounded-sm px-2 py-1 text-sm"
      type="button">
      <div className="flex items-center space-x-2">
        <div
          className="rounded-sm border px-1 py-px font-medium"
          style={isHighlight ? { backgroundColor: color } : { color }}>
          A
        </div>
        <span>{name.toUpperCase()}</span>
      </div>
      {isActive && <Check className="h-4 w-4" />}
    </button>
  );
};

export const ColorHighlightToolbar = () => {
  const { editor } = useTiptapToolbar();

  const currentColor = editor?.getAttributes('textStyle').color;
  const currentHighlight = editor?.getAttributes('highlight').color;

  const handleSetColor = (color: string) => {
    editor
      ?.chain()
      .focus()
      .setColor(color === currentColor ? '' : color)
      .run();
  };

  const handleSetHighlight = (color: string) => {
    editor
      ?.chain()
      .focus()
      .setHighlight(color === currentHighlight ? { color: '' } : { color })
      .run();
  };

  const isDisabled = !editor?.can().chain().setHighlight().run() || !editor?.can().chain().setColor('').run();

  return (
    <Popover>
      <div className="relative h-full">
        <PopoverTrigger disabled={isDisabled} asChild>
          <Button
            variant="ghost"
            size="sm"
            style={{
              color: currentColor,
            }}
            className={cn('h-8 w-14 p-0 font-normal')}>
            <span className="text-md">A</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-56 bg-background p-1">
          <ScrollArea className="custom-scrollbar max-h-80 overflow-y-auto pr-2">
            <div className="text-gray-11 mb-2.5 mt-2 px-2 text-xs">Texte</div>
            {TEXT_COLORS.map(({ name, color }) => (
              <ColorHighlightButton
                key={name}
                name={name}
                color={color}
                isActive={currentColor === color}
                onClick={() => handleSetColor(color)}
              />
            ))}

            <Separator className="my-3" />

            <div className="text-gray-11 mb-2.5 w-full px-2 pr-3 text-xs">Fond</div>
            {HIGHLIGHT_COLORS.map(({ name, color }) => (
              <ColorHighlightButton
                key={name}
                name={name}
                color={color}
                isActive={currentHighlight === color}
                onClick={() => handleSetHighlight(color)}
                isHighlight
              />
            ))}
          </ScrollArea>
        </PopoverContent>
      </div>
    </Popover>
  );
};
