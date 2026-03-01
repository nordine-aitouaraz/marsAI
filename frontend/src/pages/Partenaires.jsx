import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import banner01 from '../assets/images/banner.jpg';

const Partners = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [partners, setPartners] = useState([]);
  const [error, setError] = useState(null);

  // Récupération des données
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch('/api/partners');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPartners(data);
      } catch (error) {
        console.error('Erreur chargement partenaires:', error);
        setError(
          'Impossible de charger les partenaires. Veuillez réessayer plus tard.',
        );
      }
    };
    fetchPartners();
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div className="bg-[#070819] text-white min-h-screen flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#070819] text-white min-h-screen bg-gradient-to-b from-sky-dark to-sky-light pb-20 font-sans">
      {/* Section Bannière - Inchangée */}
      <div className="relative w-full h-[400px] md:h-[550px] overflow-hidden pt-[120px]">
        <div 
          className="absolute inset-0 z-0 bg-center bg-no-repeat transition-all duration-1000 blur-[1px]"
          style={{ backgroundImage: `url(${banner01})`, backgroundSize: 'contain' }}
        ></div>
        <div className="absolute inset-0 bg-black/20 z-1"></div>
        <div
          className={`relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pb-32 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h1
            className="text-3xl md:text-4xl font-extrabold mb-3 uppercase tracking-tighter"
            style={{
              textShadow:
                '0 0 20px rgba(30, 58, 138, 0.8), 0 0 40px rgba(59, 130, 246, 0.5)',
            }}
          >
            {t('partners.title', 'Nos Partenaires')}
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-[#FF0080] to-[#2933D3] rounded-full mb-5 shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
          <p className="text-white text-base md:text-xl font-medium max-w-xl leading-relaxed drop-shadow-lg">
            {t(
              'partners.subtitle',
              "Ils soutiennent l'innovation et la créativité.",
            )}
          </p>
        </div>
      </div>

      {/* Section Avantages */}
      <div className="max-w-6xl mx-auto px-6 -mt-10 mb-16 relative z-20 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <div className="bg-gradient-to-r from-[#FF0080] to-[#2933D3] hover:from-[#e60073] hover:to-[#1e27a3]  border  p-8 rounded-2xl shadow-xl transform hover:-translate-y-1 transition-all">
            <div className="text-white mb-4 text-2xl font-bold">01. Branding</div>
            <p className="text-gray-300 text-sm leading-relaxed">{t("partners.benefit1", "Exposition maximale de votre logo sur nos supports digitaux.")}</p>
          </div>
          <div className="bg-[#0a0b2e]/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl transform hover:-translate-y-1 transition-all">
            <div className="text-orange-500 mb-4 text-2xl font-bold">
              02. Networking
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t(
                'partners.benefit2',
                "Accès privilégié aux experts de l'IA et aux cinéastes.",
              )}
            </p>
          </div>
          <div className="bg-[#0a0b2e]/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl transform hover:-translate-y-1 transition-all">
            <div className="text-[#2933D3] mb-4 text-2xl font-bold">
              03. Innovation
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t(
                'partners.benefit3',
                'Soutenez le premier festival dédié aux films générés par IA.',
              )}
            </p>
          </div>
        </div>
      </div>

      {/*  Section Impact Numbers */}
      <div className="max-w-5xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <span className="text-5xl font-black bg-gradient-to-r from-[#FF0080] to-[#2933D3] bg-clip-text text-transparent mb-2">
              +5000
            </span>
            <span className="text-gray-400 text-sm uppercase tracking-widest font-bold">
              {t('partners.stats.visitors', 'Participants')}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-black bg-gradient-to-r from-[#FF0080] to-[#2933D3] bg-clip-text text-transparent mb-2">
              +300
            </span>
            <span className="text-gray-400 text-sm uppercase tracking-widest font-bold">
              {t('partners.stats.movies', 'Films AI')}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-black bg-gradient-to-r from-[#FF0080] to-[#2933D3] bg-clip-text text-transparent mb-2">
              100K
            </span>
            <span className="text-gray-400 text-sm uppercase tracking-widest font-bold">
              {t('partners.stats.views', 'Vues Médias')}
            </span>
          </div>
        </div>
      </div>

      {/*  Section Logos avec lien cliquable */}
      <div className="max-w-6xl mx-auto px-6 mt-20 space-y-20">
        <section>
          <h2 className="text-3xl font-bold text-navy mb-10 border-l-4 border-primary pl-4">
            {t('partners.official', 'Partenaires Officiels')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <a
                href={partner.website_url}
                target="_blank"
                rel="noopener noreferrer"
                key={partner.id}
                className="group relative  flex flex-col items-center justify-center p-8 shadow-glass hover:shadow-glow hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="max-h-24 max-w-full opacity-80 group-hover:opacity-100 transition-opacity mb-4"
                />
                <h3 className="text-xl font-semibold text-white/90">
                  {partner.name}
                </h3>
                {partner.description && (
                  <p className="text-gray-400 text-sm mt-2 text-center">
                    {partner.description}
                  </p>
                )}
              </a>
            ))}
          </div>
        </section>

        {/*Section CTA - Inchangée */}
        <div className="border border-white/10 bg-white/5 bg-gradient-to-r from-navy to-sky-dark rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
          <h3 className="text-3xl font-bold mb-6 relative z-10">
            Devenir Partenaire ?
          </h3>
          <p className="mb-8 text-white/90 text-lg max-w-xl mx-auto relative z-10">
            {t('partners.ctaText', "Rejoignez l'aventure MarsAI.")}
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-gradient-to-r from-[#FF0080] to-[#2933D3] hover:from-[#e60073] hover:to-[#1e27a3] text-white font-bold py-2 px-5 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,0,128,0.4)] relative z-10 text-base"
          >
            {t('partners.ctaButton', 'Nous Contacter')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Partners;
