'use client';

import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    FaBold,
    FaItalic,
    FaListUl,
    FaListOl,
    FaLink,
    FaUnlink,
    FaHeading,
} from 'react-icons/fa';

function ToolbarButton({
    onClick,
    active,
    label,
    children,
}: {
    onClick: () => void;
    active?: boolean;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            aria-pressed={active}
            className={`btn-ghost !rounded-lg !px-2.5 !py-1.5 ${active ? 'bg-neutral-200 text-neutral-900' : ''}`}
        >
            {children}
        </button>
    );
}

function Toolbar({ editor }: { editor: Editor }) {
    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href as string | undefined;
        const url = window.prompt('Adres URL linku', previousUrl ?? 'https://');
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className="flex flex-wrap items-center gap-1 rounded-t-xl border border-b-0 border-neutral-200 bg-neutral-50 p-2">
            <ToolbarButton
                label="Pogrubienie"
                active={editor.isActive('bold')}
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <FaBold size={14} />
            </ToolbarButton>
            <ToolbarButton
                label="Kursywa"
                active={editor.isActive('italic')}
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <FaItalic size={14} />
            </ToolbarButton>
            <ToolbarButton
                label="Nagłówek"
                active={editor.isActive('heading', { level: 2 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                <FaHeading size={14} />
            </ToolbarButton>
            <ToolbarButton
                label="Lista punktowana"
                active={editor.isActive('bulletList')}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                <FaListUl size={14} />
            </ToolbarButton>
            <ToolbarButton
                label="Lista numerowana"
                active={editor.isActive('orderedList')}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <FaListOl size={14} />
            </ToolbarButton>
            <ToolbarButton label="Dodaj link" active={editor.isActive('link')} onClick={setLink}>
                <FaLink size={14} />
            </ToolbarButton>
            <ToolbarButton
                label="Usuń link"
                onClick={() => editor.chain().focus().unsetLink().run()}
            >
                <FaUnlink size={14} />
            </ToolbarButton>
        </div>
    );
}

export function RichTextEditor({
    value,
    onChange,
}: {
    value: string;
    onChange: (html: string) => void;
}) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [StarterKit],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose-content min-h-[240px] rounded-b-xl border border-neutral-200 bg-white p-4 focus:outline-none',
            },
        },
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
    });

    if (!editor) {
        return (
            <div className="min-h-[280px] animate-pulse rounded-xl border border-neutral-200 bg-neutral-50" />
        );
    }

    return (
        <div>
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
