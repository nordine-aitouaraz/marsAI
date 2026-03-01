import React, { useState, useEffect } from 'react';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    // Note : Utilise la même clé que dans ton localStorage.setItem plus bas
    const consent = localStorage.getItem('MarsIA_cookie_consent');
    if (!consent) setIsVisible(true);
  }, []);

  let cookieData = null;
  fetch('http://localhost:1337/api/cookie?locale=en')
    .then((response) => response.json())
    .then((data) => {
      cookieData = data;
    })
    .catch((error) => {
      console.error('Error fetching cookie data:', error);
    });

  const accept = () => {
    localStorage.setItem('MarsIA_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    // Style adapté : Fond sombre, bordure fine, effet de flou (backdrop-blur)
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl bg-black/80 backdrop-blur-md text-white p-6 z-[9999] flex flex-col md:flex-row justify-between items-center border border-white/10 rounded-2xl shadow-2xl">
      <div className="mb-4 md:mb-0 md:mr-8 text-center md:text-left">
        <p className="text-sm md:text-base font-light tracking-wide">
          <span className="font-bold text-violet-400">MarsIA</span> utilise des
          cookies pour optimiser votre expérience sur le festival. En
          continuant, vous acceptez notre politique de confidentialité.
        </p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={accept}
          className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-105 transition-transform text-white px-8 py-2 rounded-full font-bold text-sm uppercase tracking-widest"
        >
          Accepter
        </button>
      </div>
    </div>
  );
};
