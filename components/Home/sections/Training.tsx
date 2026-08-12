import { SectionHeading } from '@/components/layout/SectionHeading';

export default function Training() {
    return (
        <section className="section">
            <div className="container-content">
                <SectionHeading
                    align="center"
                    eyebrow="Szkolenia"
                    title="Czego uczymy"
                    description="Program szkoleń obejmuje zarówno umiejętności praktyczne, jak i wiedzę historyczną oraz postawy obywatelskie."
                />
                <div className="mt-12">
                    {trainings.loading ? (
                        <Spinner />
                    ) : trainings.error ? (
                        <ErrorState message={trainings.error} />
                    ) : (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {trainings.data?.slice(0, 8).map((t, i) => {
                                const Icon =
                                    (t.icon_name && ICONS[t.icon_name]) || Flag;
                                return (
                                    <Reveal key={t.id} delay={i * 0.05}>
                                        <div className="card card-hover h-full p-6">
                                            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent">
                                                <Icon />
                                            </div>
                                            <h3 className="mt-4 font-bold">
                                                {t.title}
                                            </h3>
                                            <p className="mt-1.5 line-clamp-3 text-sm text-neutral-600">
                                                {t.description}
                                            </p>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    )}
                </div>
                <div className="mt-10 text-center">
                    <Link href="/szkolenia" className="btn-outline">
                        Zobacz wszystkie szkolenia <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
