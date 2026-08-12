'use client';

import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '@/hooks/useCountUp';

interface Props {
    value: number;
    suffix?: string;
    label: string;
}

export function AnimatedCounter({ value, suffix = '', label }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [start, setStart] = useState(false);
    const display = useCountUp(value, 1600, start);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    setStart(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.3 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={ref} className="text-center">
            <div className="font-display text-4xl font-bold text-primary sm:text-5xl">
                {display.toLocaleString('pl-PL')}
                {suffix}
            </div>
            <div className="mt-2 text-sm font-medium uppercase tracking-wider text-neutral-500">
                {label}
            </div>
        </div>
    );
}
