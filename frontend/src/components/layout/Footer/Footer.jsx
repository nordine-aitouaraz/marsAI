import FooterMainLinks from './FooterMainLinks';
import FooterLegalLinks from './FooterLegalLinks';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800/50 bg-black/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <FooterMainLinks />
        <FooterLegalLinks />
      </div>
      <div className="border-t border-gray-800/30 py-6">
        <p className="text-center text-xs text-gray-500 tracking-wide">
          © {new Date().getFullYear()} marsAI — Festival de courts-métrages
          générés par IA.
        </p>
      </div>
    </footer>
  );
}
