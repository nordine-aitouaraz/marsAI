const { google } = require('googleapis');
const { HttpError } = require('../Utils/http');

// Toutes les infos viennent directement de process.env (pas de Config/env)
const {
  YOUTUBE_CLIENT_ID,
  YOUTUBE_CLIENT_SECRET,
  YOUTUBE_REDIRECT_URI,
  YOUTUBE_REFRESH_TOKEN,
  YOUTUBE_UPLOAD_PRIVACY,
} = process.env;

if (!YOUTUBE_CLIENT_ID || !YOUTUBE_CLIENT_SECRET || !YOUTUBE_REDIRECT_URI || !YOUTUBE_REFRESH_TOKEN) {
  // On ne jette pas une erreur au démarrage pour laisser tourner l'API
  // mais on jettera une HttpError côté upload si nécessaire.
  // Ici on loggue juste en dev.
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('⚠️ YouTube OAuth2 environment variables are not fully configured.');
  }
}

const oauth2Client = new google.auth.OAuth2(
  YOUTUBE_CLIENT_ID,
  YOUTUBE_CLIENT_SECRET,
  YOUTUBE_REDIRECT_URI
);

if (YOUTUBE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({ refresh_token: YOUTUBE_REFRESH_TOKEN });
}

const youtube = google.youtube({
  version: 'v3',
  auth: oauth2Client,
});

/**
 * Upload d'une vidéo vers YouTube en "unlisted" (par défaut) ou privacy paramétrable.
 * @param {Buffer} fileBuffer
 * @param {string} mimeType
 * @param {Object} metadata { title, description }
 * @returns {Promise<string>} youtubeId
 */
async function uploadVideo(fileBuffer, mimeType, { title, description }) {
  if (!YOUTUBE_CLIENT_ID || !YOUTUBE_CLIENT_SECRET || !YOUTUBE_REDIRECT_URI || !YOUTUBE_REFRESH_TOKEN) {
    throw new HttpError(500, 'YouTube upload is not configured');
  }

  const privacyStatus = YOUTUBE_UPLOAD_PRIVACY || 'unlisted';

  try {
    const res = await youtube.videos.insert({
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title: title || 'marsAI submission',
          description: description || '',
        },
        status: {
          privacyStatus,
        },
      },
      media: {
        body: Buffer.isBuffer(fileBuffer)
          ? require('stream').Readable.from(fileBuffer)
          : fileBuffer,
        mimeType,
      },
    });

    const youtubeId = res?.data?.id;
    if (!youtubeId) {
      throw new Error('Missing YouTube video id in response');
    }
    return youtubeId;
  } catch (err) {
    throw new HttpError(502, 'YouTube upload failed', { cause: err.message });
  }
}

/**
 * Récupère le statut d'upload d'une vidéo YouTube.
 * On se base principalement sur `status.uploadStatus` (uploaded, processed, rejected, etc.).
 * @param {string} youtubeId
 * @returns {Promise<{ uploadStatus: string, rejectionReason: string | null, privacyStatus: string | null }>}
 */
async function getVideoStatus(youtubeId) {
  if (!YOUTUBE_CLIENT_ID || !YOUTUBE_CLIENT_SECRET || !YOUTUBE_REDIRECT_URI || !YOUTUBE_REFRESH_TOKEN) {
    throw new HttpError(500, 'YouTube upload is not configured');
  }

  try {
    const res = await youtube.videos.list({
      part: ['status'],
      id: [youtubeId],
    });

    const item = res?.data?.items && res.data.items[0];
    if (!item || !item.status) {
      throw new Error('Missing YouTube video status in response');
    }

    return {
      uploadStatus: item.status.uploadStatus,
      rejectionReason: item.status.rejectionReason || null,
      privacyStatus: item.status.privacyStatus || null,
    };
  } catch (err) {
    throw new HttpError(502, 'YouTube status check failed', { cause: err.message });
  }
}

module.exports = {
  uploadVideo,
  getVideoStatus,
};

