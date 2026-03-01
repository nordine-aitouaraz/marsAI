const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRES_IN = '1h' } = process.env;

if (!JWT_SECRET) {
  // On échoue au démarrage si le secret n'est pas défini
  throw new Error('❌ Missing required environment variable: JWT_SECRET');
}

// Générer token
const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Vérifier token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = { signToken, verifyToken };

