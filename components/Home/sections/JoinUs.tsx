import Link from 'next/link';

import { FaArrowRight } from 'react-icons/fa';

import { Reveal } from '@/components/ui/animation/Reveal';

export default function JoinUs() {
    return (
        <section className="section">
            <div className="container-content">
                <Reveal>
                    <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-white sm:px-16 sm:py-20">
                        <div className="absolute inset-0 -z-10 opacity-20">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://images.pexels.com/photos/8438221/pexels-photo-8438221.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <h2 className="font-display text-3xl font-bold sm:text-4xl">
                            Dołącz do nas
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-neutral-200">
                            Zostań częścią organizacji, która kształtuje
                            charakter, uczy służby i buduje wspólnotę. Zapisy
                            trwają przez cały rok.
                        </p>
                        <Link href="/kontakt" className="btn-accent mt-8">
                            Skontaktuj się z nami <FaArrowRight size={18} />
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
