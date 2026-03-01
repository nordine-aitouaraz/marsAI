const path = require('path');
const express = require('express');
const cors = require('cors');

const env = require('./Config/env');
const apiRoutes = require('./Routes');
const notFound = require('./Middlewares/notFound');
const errorHandler = require('./Middlewares/errorHandler');
const { checkDatabaseConnection } = require('./Config/db');
const oauth = require('./Routes/oauth');


const app = express();

app.use('/', oauth);

// Middlewares globaux
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true, // Permet l'envoi/réception des cookies
}));
app.use(express.json());

// Fichiers uploadés (vidéos soumises, assets)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Route d'accueil simple 
app.get('/', (req, res) => {
  res.send('MarsAI backend est démarré');
});

// API (MVC)
app.use('/api', apiRoutes);


app.use(notFound);
app.use(errorHandler);

// Démarrage du serveur APRÈS avoir check la DB
(async () => {
  try {
    await checkDatabaseConnection();
    app.listen(env.PORT, () => {
      console.log(`Backend MarsAI démarré sur http://localhost:${env.PORT}`);
    });
  } catch (err) {
    console.error('Startup failed');
    console.error(err.message);
    process.exit(1);
  }
})();


module.exports = app;
