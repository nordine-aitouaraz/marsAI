import { Link } from 'react-router-dom';

export default function FooterMainLinks() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-base font-semibold tracking-wide text-white">
          marsAI
        </p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-400">
          Le premier festival mondial dédié aux courts-métrages générés par
          l&apos;intelligence artificielle.
        </p>
      </div>

      <nav className="flex flex-wrap gap-4 text-sm">
        <Link
          to="/"
          className="text-slate-400 transition-colors duration-300 hover:text-blue-400"
        >
          Accueil
        </Link>
        <Link
          to="/participer"
          className="text-slate-400 transition-colors duration-300 hover:text-blue-400"
        >
          Participer
        </Link>
        <Link
          to="/partenaires"
          className="text-slate-400 transition-colors duration-300 hover:text-blue-400"
        >
          Partenaires
        </Link>
      </nav>
    </div>
  );
}
