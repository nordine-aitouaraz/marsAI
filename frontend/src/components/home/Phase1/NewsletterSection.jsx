import NewsletterForm from '../../forms/NewsletterForm';

/**
 * Phase 1 – Section newsletter connectée au back (POST /newsletters/subscribe).
 */
export default function NewsletterSection({
  title = 'Restez informé',
  subtitle = 'Inscrivez-vous pour recevoir les infos du festival : programmation, appels à films et événements.',
}) {
  return (
    <section className="relative py-16 md:py-20 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {title}
        </h2>
        <p className="text-slate-400 text-sm md:text-base mb-8">{subtitle}</p>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
