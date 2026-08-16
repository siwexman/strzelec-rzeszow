import { PostForm } from '@/components/dashboard/PostForm';
import { createPost } from '@/app/dashboard/actions';

export default function NewPostPage() {
    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold text-neutral-900">Nowy wpis</h1>
            <PostForm action={createPost} submitLabel="Opublikuj" />
        </div>
    );
}
