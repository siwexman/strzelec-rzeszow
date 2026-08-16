'use client';

import { deletePost } from '@/app/dashboard/actions';

export function DeletePostButton({ id, title }: { id: number; title: string }) {
    return (
        <form
            action={deletePost}
            onSubmit={e => {
                if (!window.confirm(`Usunąć wpis „${title}” wraz ze wszystkimi zdjęciami?`)) {
                    e.preventDefault();
                }
            }}
        >
            <input type="hidden" name="id" value={id} />
            <button type="submit" className="btn-ghost !text-accent-600 hover:!bg-accent-50">
                Usuń
            </button>
        </form>
    );
}
