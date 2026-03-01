// frontend/src/components/ConfirmationModal.jsx
import React from 'react';

export function ConfirmationModal({ isOpen, onClose, newsletterSubscribed }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center px-4 backdrop-blur-md bg-black/60">
      <div className="relative max-w-md w-full rounded-[32px] border border-white/10 bg-[#0b0d28]/95 p-8 text-center shadow-2xl">
        <h3 className="text-2xl font-black text-white mb-2 italic">
          L'aventure commence maintenant.
        </h3>

        <p className="text-sm text-white/60 mb-6">
          Votre inscription est validée. Merci de porter votre regard sur le
          format court et l'énergie de Marseille.
        </p>

        {newsletterSubscribed && (
          <div className="mb-8 rounded-2xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-white/10 p-5">
            <p className="text-[10px] font-bold text-violet-400 uppercase tracking-[0.2em] mb-2">
              Cercle Privé MarsIA
            </p>
            <p className="text-xs text-white/90 leading-relaxed text-left">
              Bienvenue dans le cercle. Vous recevrez en avant-première toutes
              nos <strong> actualités IA </strong>,.
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full rounded-full bg-white py-4 text-xs font-black text-black transition hover:bg-violet-400 hover:text-white uppercase tracking-widest"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
