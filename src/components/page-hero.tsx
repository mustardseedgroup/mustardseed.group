export function PageHero({
  title,
  summary,
}: {
  title: string;
  summary: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <h1 className="max-w-5xl font-serif text-6xl font-medium leading-[0.95] md:text-8xl">{title}</h1>
      <p className="mt-8 max-w-3xl text-xl leading-9 text-[var(--muted)]">{summary}</p>
    </section>
  );
}
