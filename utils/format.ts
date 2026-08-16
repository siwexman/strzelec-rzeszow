export function formatDate(iso: string | null, locale = 'pl-PL'): string {
    if (!iso) return '';
    try {
        const date = new Date(iso);
        date.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.getTime() === today.getTime()) {
            return 'Dzisiaj';
        } else if (date.getTime() === yesterday.getTime()) {
            return 'Wczoraj';
        } else {
            return date.toLocaleDateString(locale, {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        }
    } catch {
        return iso;
    }
}

export function formatDateTime(iso: string | null, locale = 'pl-PL'): string {
    if (!iso) return '';
    try {
        return new Date(iso).toLocaleString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch {
        return iso;
    }
}

export function readingTime(content: string | null): string {
    if (!content) return '1 min';
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min`;
}

export function stripHtml(html: string | null): string {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').trim();
}

export function classNames(
    ...parts: (string | false | null | undefined)[]
): string {
    return parts.filter(Boolean).join(' ');
}
