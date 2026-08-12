import { ReactNode } from 'react';

import { Reveal } from '../ui/animation/Reveal';

interface Props {
    eyebrow?: string;
    title: ReactNode;
    description?: ReactNode;
    align?: 'left' | 'center';
}

export function SectionHeading({
    eyebrow,
    title,
    description,
    align = 'left',
}: Props) {
    return (
        <Reveal>
            <div
                className={
                    align === 'center'
                        ? 'mx-auto max-w-2xl text-center'
                        : 'max-w-2xl'
                }
            >
                {eyebrow && <p className="eyebrow">{eyebrow}</p>}
                <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
                {description && (
                    <p className="mt-4 text-lg text-neutral-600">
                        {description}
                    </p>
                )}
            </div>
        </Reveal>
    );
}
