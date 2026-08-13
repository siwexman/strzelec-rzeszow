import { useEffect, useState } from 'react';

interface State<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useAsync<T>(
    fn: () => Promise<T>,
    // deps: unknown[] = [],
): State<T> & { refetch: () => void } {
    const [state, setState] = useState<State<T>>({
        data: null,
        loading: true,
        error: null,
    });
    const [nonce, setNonce] = useState(0);

    useEffect(() => {
        let active = true;
        Promise.resolve().then(() => {
            if (active) setState(s => ({ ...s, loading: true, error: null }));
        });
        fn()
            .then(data => {
                if (active) setState({ data, loading: false, error: null });
            })
            .catch((err: unknown) => {
                if (active)
                    setState({
                        data: null,
                        loading: false,
                        error: err instanceof Error ? err.message : 'Błąd',
                    });
            });
        return () => {
            active = false;
        };
    }, [nonce, fn]);

    return { ...state, refetch: () => setNonce(n => n + 1) };
}
