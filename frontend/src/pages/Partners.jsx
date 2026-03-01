// Mock data des partenaires
const partnersData = [
  {
    id: 1,
    name: 'CineVision Pro',
    logoUrl:
      'https://via.placeholder.com/200x100/000000/3b82f6?text=CineVision+Pro',
    websiteUrl: 'https://cinevision.example.com',
  },
  {
    id: 2,
    name: 'FilmTech Studios',
    logoUrl: 'https://via.placeholder.com/200x100/000000/3b82f6?text=FilmTech',
    websiteUrl: 'https://filmtech.example.com',
  },
  {
    id: 3,
    name: 'Digital Arts Media',
    logoUrl:
      'https://via.placeholder.com/200x100/000000/3b82f6?text=Digital+Arts',
    websiteUrl: 'https://digitalartsmed.example.com',
  },
  {
    id: 4,
    name: 'Mars Production',
    logoUrl: 'https://via.placeholder.com/200x100/000000/3b82f6?text=Mars+Prod',
    websiteUrl: 'https://marsproduction.example.com',
  },
  {
    id: 5,
    name: 'Creative Vision',
    logoUrl:
      'https://via.placeholder.com/200x100/000000/3b82f6?text=Creative+Vision',
    websiteUrl: 'https://creativevision.example.com',
  },
  {
    id: 6,
    name: 'Stellar Films',
    logoUrl:
      'https://via.placeholder.com/200x100/000000/3b82f6?text=Stellar+Films',
    websiteUrl: 'https://stellarfilms.example.com',
  },
  {
    id: 7,
    name: 'Golden Frame',
    logoUrl:
      'https://via.placeholder.com/200x100/000000/3b82f6?text=Golden+Frame',
    websiteUrl: 'https://goldenframe.example.com',
  },
  {
    id: 8,
    name: 'Urban Cinema',
    logoUrl:
      'https://via.placeholder.com/200x100/000000/3b82f6?text=Urban+Cinema',
    websiteUrl: 'https://urbancinema.example.com',
  },
  {
    id: 9,
    name: 'Pixel Studios',
    logoUrl:
      'https://via.placeholder.com/200x100/000000/3b82f6?text=Pixel+Studios',
    websiteUrl: 'https://pixelstudios.example.com',
  },
  {
    id: 10,
    name: 'Visionary Media',
    logoUrl:
      'https://via.placeholder.com/200x100/000000/3b82f6?text=Visionary+Media',
    websiteUrl: 'https://visionarymedia.example.com',
  },
  {
    id: 11,
    name: 'CineArt Group',
    logoUrl:
      'https://via.placeholder.com/200x100/000000/3b82f6?text=CineArt+Group',
    websiteUrl: 'https://cineart.example.com',
  },
  {
    id: 12,
    name: 'Frame Perfect',
    logoUrl:
      'https://via.placeholder.com/200x100/000000/3b82f6?text=Frame+Perfect',
    websiteUrl: 'https://frameperfect.example.com',
  },
  {
    id: 13,
    name: 'Digital Dream',
    logoUrl:
      'https://via.placeholder.com/200x100/000000/3b82f6?text=Digital+Dream',
    websiteUrl: 'https://digitaldream.example.com',
  },
  {
    id: 14,
    name: 'Motion Masters',
    logoUrl:
      'https://via.placeholder.com/200x100/000000/3b82f6?text=Motion+Masters',
    websiteUrl: 'https://motionmasters.example.com',
  },
  {
    id: 15,
    name: 'Reel Magic',
    logoUrl:
      'https://via.placeholder.com/200x100/000000/3b82f6?text=Reel+Magic',
    websiteUrl: 'https://reelmagic.example.com',
  },
  {
    id: 16,
    name: 'Studio Infinity',
    logoUrl:
      'https://via.placeholder.com/200x100/000000/3b82f6?text=Studio+Infinity',
    websiteUrl: 'https://studioinfinity.example.com',
  },
];

const Partners = () => {
  return (
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Nos Partenaires
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Ils nous font confiance et contribuent au succès du festival
          </p>
        </div>

        {/* Grid de partenaires */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {partnersData.map((partner) => (
            <a
              key={partner.id}
              href={partner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-8 h-full flex flex-col items-center justify-center border border-gray-800 shadow-lg transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2">
                {/* Logo Container */}
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img
                    src={partner.logoUrl}
                    alt={`Logo ${partner.name}`}
                    className="w-48 h-24 object-contain transition-transform duration-300 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                  />
                </div>

                {/* Partner Name */}
                <h3 className="text-white font-semibold text-center text-lg mb-3 transition-colors duration-300 group-hover:text-blue-400">
                  {partner.name}
                </h3>

                {/* Hover Indicator */}
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-blue-500 text-sm flex items-center gap-2">
                    Visiter le site
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-md p-12 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Devenez Partenaire
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Rejoignez notre communauté de partenaires et soutenez l'innovation
              dans le cinéma généré par IA
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105">
              Contactez-nous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
