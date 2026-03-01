import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import AProposPage from '../pages/AProposPage';
import Participer from '../pages/Participer';
import Partenaires from '../pages/Partenaires';
import CGV from '../pages/CGV';
import CGU from '../components/CGU/CGU';
import Admin from '../pages/Admin';
import Jury from '../components/jury/Jury';
import Contact from '../pages/Contact';
import TimerTest from '../pages/TimerTest';
import Gallery from '../pages/Gallery';
import { HomePhase2 } from '../components/home/Phase2';
import { CookieBanner } from '../components/ui/CookieBanner'; // Importation du composant cookie banner
import VideoDetail from '../pages/VideoDetail';
import About from '../pages/Partenaires';
import Winners from '../pages/Winners';

export default function AppRouter() {
  return (
    <Routes>
      {/* HOME */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/catalogue" element={<Gallery />} />
      <Route path="/a-propos" element={<AProposPage />} />
      <Route path="/participer" element={<Participer />} />
      <Route path="/partenaires" element={<Partenaires />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/jury" element={<Jury />} />
      <Route path="/Partenaires" element={<About />} />
      <Route path="/cgv" element={<CGV />} />
      <Route path="/cgu" element={<CGU />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/videoDetail/:id" element={<VideoDetail />} />
      <Route path="/timer-test" element={<TimerTest />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/cookie-consent" element={<CookieBanner />} />
      <Route path="/watch/:id" element={<VideoDetail />} />
      <Route path="/winners" element={<Winners />} />
    </Routes>
  );
}
