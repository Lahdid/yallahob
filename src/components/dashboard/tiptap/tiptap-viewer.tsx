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
import Image from '@tiptap/extension-image';

interface TiptapViewerProps {
  content?: string;
  numberOfSkeletons?: number;
  minHeight?: number;
  maxHeight?: number;
}

// ✅ Extend Image with custom renderHTML
const CustomImage = Image.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      'img',
      {
        ...HTMLAttributes,
        style: 'padding-top: 5px; padding-bottom: 5px;',
      },
    ];
  },
});

const TiptapViewer = ({ content, numberOfSkeletons = 3, minHeight, maxHeight }: TiptapViewerProps) => {
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
    CustomImage.configure({
      allowBase64: true,
      inline: true,
    }),
  ];

  const editor = useEditor({
    extensions: extensions as Extension[],
    editorProps: {
      attributes: {
        class: 'tiptap-editor focus:outline-none',
      },
    },
    content: content,
    immediatelyRender: false,
    editable: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="relative w-full flex-1 overflow-hidden pb-3">
      <div className="tiptap cursor-foreground w-full flex-1">
        <EditorContent
          style={{ minHeight, maxHeight }}
          className="w-full border-none p-2 outline-none"
          editor={editor}
        />
      </div>
    </div>
  );
};

export default TiptapViewer;
