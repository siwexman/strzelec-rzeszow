import { useEffect, useRef, useState } from 'react';

export function useCountUp(
    target: number,
    durationMs = 1600,
    start = false,
): number {
    const [value, setValue] = useState(0);
    const raf = useRef<number | null>(null);

    useEffect(() => {
        if (!start) return;
        const t0 = performance.now();
        const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / durationMs);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(eased * target));
            if (p < 1) raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(tick);
        return () => {
            if (raf.current) cancelAnimationFrame(raf.current);
        };
    }, [target, durationMs, start]);

    return value;
}
