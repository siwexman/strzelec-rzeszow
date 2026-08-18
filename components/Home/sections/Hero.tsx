'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { FaArrowRight } from 'react-icons/fa';

import heroImg from '@/assets/images/hero.jpg';

export default function Hero() {
    return (
        <section className="relative isolate overflow-hidden text-white">
            <div className="absolute inset-0 -z-10">
                <Image
                    loading="eager"
                    src={heroImg}
                    alt="Zdjęcie grupowe strzelców"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-br from-primary-900/85 via-primary-900/70 to-primary-800/80" />
            </div>
            <div className="container-content flex min-h-[88vh] flex-col justify-center items-end py-24 text-center md:text-left">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-155"
                >
                    <span className="badge bg-white/10 text-white backdrop-blur">
                        Organizacja patriotyczna
                    </span>
                    <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl text-shadow-xs text-white outline-accent text-shadow-accent">
                        JEDNOSTKA STRZELECKA 2021
                    </h1>
                    <p className="text-md px-8 pt-4">
                        im. płk. Leopolda Lisa-Kuli w Rzeszowie Związku
                        Strzeleckiego &quot;Strzelec&quot; Józefa Piłsudskiego
                    </p>
                    <p className="mt-5 max-w-xl text-lg text-neutral-200 sm:text-xl">
                        Organizacja patriotyczna, paramilitarna i wychowawcza
                        kształtująca odpowiedzialnych obywateli.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/kontakt" className="btn-accent">
                            Dołącz <FaArrowRight size={18} />
                        </Link>
                        <Link
                            href="/aktualnosci"
                            className="btn-outline border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                        >
                            Aktualności
                        </Link>
                    </div>
                </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-white to-transparent" />
        </section>
    );
}
