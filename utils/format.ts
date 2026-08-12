export function formatDate(iso: string | null, locale = 'pl-PL'): string {
    if (!iso) return '';
    try {
        return new Date(iso).toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
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

export function classNames(
    ...parts: (string | false | null | undefined)[]
): string {
    return parts.filter(Boolean).join(' ');
}
