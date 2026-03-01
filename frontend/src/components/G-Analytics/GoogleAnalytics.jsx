import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

// Code d'identification unique
const TRACKING_ID = "G-Q2S789KV4W"; 
ReactGA.initialize(TRACKING_ID);

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Affichage dans le panel Google
    const pagePath = location.pathname;
    let pageTitle = "MarsAI - " + pagePath;

    // Envoyer des informations détaillées à Google
    ReactGA.send({ 
      hitType: "pageview", 
      page: pagePath + location.search,
      title: pageTitle 
    });

    // rapport sur la console
    console.log("GA: Data Sent -> Path:",pageTitle);
  }, [location]);

  return null;
};

export default GoogleAnalytics;