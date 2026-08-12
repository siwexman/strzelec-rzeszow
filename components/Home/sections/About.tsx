import { AnimatedCounter } from '@/components/ui/animation/AnimatedCounter';
import { Reveal } from '@/components/ui/animation/Reveal';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function About() {
    return (
        <section className="section bg-neutral-50">
            <div className="container-content">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <Reveal>
                        <div>
                            <p className="eyebrow">O organizacji</p>
                            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                                Wychowujemy młodych Polaków od pokoleń
                            </h2>
                            <p className="mt-5 text-lg text-neutral-600">
                                Strzelec Rzeszów to organizacja, która łączy
                                tradycje II Rzeczpospolitej z nowoczesnym
                                wychowaniem obywatelskim. Prowadzimy szkolenia
                                dla młodzieży i dorosłych, uczymy pierwszej
                                pomocy, orientacji terenowej, historii Polski
                                oraz postaw przywódczych.
                            </p>
                            <p className="mt-4 text-neutral-600">
                                Naszym celem jest kształtowanie odpowiedzialnych
                                obywateli — ludzi, którzy służą społeczeństwu i
                                rozumieją znaczenie wspólnoty.
                            </p>
                            <Link href="/o-nas" className="btn-primary mt-7">
                                Poznaj naszą historię <FaArrowRight size={18} />
                            </Link>
                        </div>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className="grid grid-cols-2 gap-6 rounded-3xl bg-white p-8 shadow-card sm:p-10">
                            <AnimatedCounter
                                value={15}
                                suffix="+"
                                label="Lat działalności"
                            />
                            <AnimatedCounter
                                value={320}
                                suffix="+"
                                label="Członków"
                            />
                            <AnimatedCounter
                                value={48}
                                suffix="+"
                                label="Szkoleń rocznie"
                            />
                            <AnimatedCounter
                                value={120}
                                suffix="+"
                                label="Wolontariuszy"
                            />
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
