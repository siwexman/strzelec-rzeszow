export default function Loader({ label = 'Ładowanie...' }: { label?: string }) {
    return (
        <div
            className="flex items-center justify-center py-20"
            role="status"
            aria-live="polite"
        >
            <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-primary" />
                <p className="text-sm text-neutral-500">{label}</p>
            </div>
        </div>
    );
}
