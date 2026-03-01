import { useTranslation } from 'react-i18next';

const LANGS = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
];

export default function HeaderLanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language || 'fr';

  const changeLang = (code) => {
    if (code === current) return;
    i18n.changeLanguage(code);
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-brand-border/60 bg-brand-surface/70 px-1 py-0.5 text-[11px]">
      {LANGS.map((lang) => {
        const active = current.startsWith(lang.code);
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => changeLang(lang.code)}
            className={[
              'px-2 py-0.5 rounded-full font-semibold transition-colors',
              active
                ? 'bg-brand-primary text-slate-900'
                : 'text-slate-300 hover:text-white',
            ].join(' ')}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
