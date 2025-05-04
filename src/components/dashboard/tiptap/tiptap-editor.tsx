'use client';

import { EditorContent, useEditor, type Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Placeholder from '@tiptap/extension-placeholder';
import { Separator } from '@/components/ui/separator';
import { RedoToolbar } from './toolbars/redo';
import { BoldToolbar } from './toolbars/bold';
import { ItalicToolbar } from './toolbars/italic';
import { BulletListToolbar } from './toolbars/bullet-list';
import { OrderedListToolbar } from './toolbars/ordered-list';
import { ImagePlaceholderToolbar } from './toolbars/image-placeholder-toolbar';
import { ColorHighlightToolbar } from './toolbars/color-and-highlight';
import { ImagePlaceholder } from './extensions/image-placeholder';
import { ImageExtension } from './extensions/image';
import { TiptapToolbarProvider } from '@/providers/tiptap-toolbar-provider';
import { UndoToolbar } from './toolbars/undo';
import { EditorView } from '@tiptap/pm/view';
import { useEffect, useImperativeHandle, forwardRef, useState } from 'react';
import { BlockquoteToolbar } from './toolbars/blockquote';
import { HardBreakToolbar } from './toolbars/hard-break';
import { StrikeThroughToolbar } from './toolbars/strikethrough';
import { HorizontalRuleToolbar } from './toolbars/horizontal-rule';
import { HeadingToolbar } from './toolbars/heading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Maximize2, Minimize2 } from 'lucide-react';

interface TiptapEditorProps {
  disabled?: boolean;
  content?: string;
  onChange?: (value: string) => void;
  numberOfSkeletons?: number;
  showExpandButton?: boolean;
  maxHeight?: number;
  minHeight?: number;
  placeholder?: string;
}

export interface TiptapEditorRef {
  clear: () => void;
}

const TiptapEditor = forwardRef<TiptapEditorRef, TiptapEditorProps>(
  (
    {
      disabled,
      showExpandButton = true,
      onChange,
      content,
      numberOfSkeletons = 4,
      minHeight = 120,
      maxHeight = 120,
      placeholder,
    },
    ref,
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentMinHeight, setCurrentMinHeight] = useState(minHeight);
    const [currentMaxHeight, setCurrentMaxHeight] = useState(maxHeight);

    const extensions = [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc',
          },
        },
        heading: {
          levels: [1, 2, 3, 4],
          HTMLAttributes: {
            class: 'tiptap-heading',
          },
        },
      }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Subscript,
      Superscript,
      Underline,
      Link,
      Color,
      Highlight.configure({ multicolor: true }),
      ImageExtension,
      ImagePlaceholder,
      StrikeThroughToolbar,
      HorizontalRuleToolbar,
      StrikeThroughToolbar,
      HeadingToolbar,
    ];

    const editor = useEditor({
      extensions: extensions as Extension[],
      editorProps: {
        attributes: {
          class: 'tiptap-editor focus:outline-none',
        },
        handlePaste(view, event) {
          const items = event.clipboardData?.items;
          if (!items) return false;

          for (const item of items) {
            if (item.type.indexOf('image') === 0) {
              const file = item.getAsFile();
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  const src = reader.result as string;
                  view.dispatch(view.state.tr.replaceSelectionWith(view.state.schema.nodes.image.create({ src })));
                };
                reader.readAsDataURL(file);
                return true;
              }
            }
          }
          return false;
        },
      },
      immediatelyRender: false,
      content: content,
      editable: !disabled,
      onUpdate: ({ editor }) => {
        onChange?.(editor.isEmpty ? '' : editor.getHTML());
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
      if (editor && content !== undefined) {
        editor.commands.setContent(content, false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content]);

    useImperativeHandle(ref, () => ({
      clear: () => {
        editor?.commands.clearContent();
      },
    }));

    if (!editor) return null;

    return (
      <div className="relative flex-1 overflow-hidden rounded-md border pb-3">
        <div className="sticky left-0 top-0 z-[50] flex w-full items-center justify-between border-b bg-background bg-white  px-2 py-2">
          <TiptapToolbarProvider editor={editor}>
            <div className="z-[50] flex w-full flex-row items-center justify-between gap-2 bg-white">
              <div className="flex flex-wrap items-center gap-2 bg-white">
                <UndoToolbar />
                <RedoToolbar />
                <Separator orientation="vertical" className="h-7" />
                <HeadingToolbar />
                <BoldToolbar />
                <ItalicToolbar />
                <BulletListToolbar />
                <OrderedListToolbar />
                <ImagePlaceholderToolbar />
                <ColorHighlightToolbar />
                <StrikeThroughToolbar />
                <HorizontalRuleToolbar />
              </div>
              {showExpandButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(event) => {
                    event.preventDefault();
                    if (isExpanded) {
                      setCurrentMinHeight(minHeight);
                      setCurrentMaxHeight(maxHeight);
                    } else {
                      setCurrentMinHeight(500);
                      setCurrentMaxHeight(500);
                    }
                    setIsExpanded(!isExpanded);
                  }}>
                  {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </TiptapToolbarProvider>
        </div>
        <div onClick={() => editor.chain().focus().run()} className="tiptap cursor-foreground flex-1 bg-background">
          <EditorContent
            style={{ height: '100%' }}
            className="custom-scrollbar max-h-[350px] overflow-y-auto border-none p-2 outline-none hover:cursor-text"
            editor={editor}
          />
        </div>
      </div>
    );
  },
);

TiptapEditor.displayName = 'TiptapEditor';

export default TiptapEditor;
