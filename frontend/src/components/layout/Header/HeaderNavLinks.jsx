import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../../../contexts';

const links = [
  { to: '/', labelKey: 'nav.home', defaultLabel: 'Accueil' },
  { to: '/a-propos', labelKey: 'nav.about', defaultLabel: 'À Propos' },
  { to: '/contact', labelKey: 'nav.contact', defaultLabel: 'Contact' },
  { to: '/jury', labelKey: 'nav.jury', defaultLabel: 'Jury' },
  { to: '/partenaires', labelKey: 'nav.partners', defaultLabel: 'Partenaires' },
  { to: '/catalogue', labelKey: 'nav.catalogue', defaultLabel: 'Catalogue' },
];

export default function HeaderNavLinks({
  orientation = 'horizontal',
  onNavigate,
}) {
  const { t } = useTranslation();
  const { isAuthenticated: isAdmin, checking } = useAdmin();
  const showAdminLink = !checking && isAdmin;

  const base =
    'text-sm font-medium tracking-wide transition-colors duration-200';

  const active = ({ isActive }) =>
    [
      base,
      isActive
        ? 'text-brand-primary font-semibold'
        : 'text-slate-200 hover:text-white',
    ].join(' ');

  if (orientation === 'vertical') {
    return (
      <div className="flex flex-col gap-4 text-center">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `text-lg font-medium transition-colors ${isActive ? 'text-brand-primary' : 'text-slate-200'}`
            }
            onClick={onNavigate}
          >
            {t(link.labelKey, link.defaultLabel)}
          </NavLink>
        ))}
        {showAdminLink && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `text-lg font-medium transition-colors ${isActive ? 'text-brand-primary' : 'text-slate-200'}`
            }
            onClick={onNavigate}
          >
            {t('nav.admin', 'Admin')}
          </NavLink>
        )}
        <NavLink
          to="/participer"
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-primary px-4 py-3 text-sm font-bold text-slate-900 shadow-soft-sm uppercase"
          onClick={onNavigate}
        >
          {t('nav.participate', 'Participer')}
        </NavLink>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} className={active}>
          {t(link.labelKey, link.defaultLabel)}
        </NavLink>
      ))}
      {showAdminLink && (
        <NavLink to="/admin" className={active}>
          {t('nav.admin', 'Admin')}
        </NavLink>
      )}
    </div>
  );
}
