const nodemailer = require('nodemailer');
const { HttpError } = require('../Utils/http');

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  MAIL_FROM,
} = process.env;

let transporter = null;

function getTransporter() {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !MAIL_FROM) {
    throw new HttpError(500, 'Mail service is not configured');
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // heuristique simple
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  return transporter;
}

async function sendMail({ to, subject, text }) {
  const tx = getTransporter();
  try {
    await tx.sendMail({
      from: MAIL_FROM,
      to,
      subject,
      text,
    });
  } catch (err) {
    throw new HttpError(502, 'Mail sending failed', { cause: err.message });
  }
}

// --- Mails métier ---

async function sendSubmissionConfirmation({ to, filmmakerName, movieTitle }) {
  const subject = 'marsAI – Confirmation de soumission de votre film';
  const text = [
    `Bonjour ${filmmakerName || ''}`.trim(),
    '',
    `Nous avons bien reçu la soumission de votre film "${movieTitle}".`,
    'Il est actuellement en cours de traitement par l’équipe du festival (statut : in_process).',
    '',
    'Vous serez informé(e) par email lorsque votre film sera approuvé, rejeté ou sélectionné.',
    '',
    'L’équipe marsAI',
  ].join('\n');

  await sendMail({ to, subject, text });
}

async function sendYouTubeUploadSuccessEmail({ to, filmmakerName, movieTitle, youtubeUrl }) {
  const subject = 'marsAI – Votre vidéo est en ligne sur YouTube';
  const text = [
    `Bonjour ${filmmakerName || ''}`.trim(),
    '',
    `Votre film "${movieTitle}" a été mis en ligne sur YouTube avec succès.`,
    '',
    `Lien : ${youtubeUrl || ''}`,
    '',
    'L’équipe marsAI',
  ].join('\n');

  await sendMail({ to, subject, text });
}

async function sendUploadFailureEmail({ to, filmmakerName, movieTitle }) {
  const subject = 'marsAI – Échec de l’upload YouTube';
  const text = [
    `Bonjour ${filmmakerName || ''}`.trim(),
    '',
    `L’upload vers YouTube de votre film "${movieTitle}" n’a pas abouti.`,
    'Votre vidéo est bien enregistrée côté festival ; vous serez informé(e) en cas de nouvel envoi vers YouTube.',
    '',
    'L’équipe marsAI',
  ].join('\n');

  await sendMail({ to, subject, text });
}

async function sendStatusUpdate({ to, filmmakerName, movieTitle, status, decisionReason }) {
  let subject;
  const lines = [];

  const hello = `Bonjour ${filmmakerName || ''}`.trim();
  lines.push(hello, '');

  if (status === 'approved') {
    subject = 'marsAI – Votre film est approuvé';
    lines.push(
      `Bonne nouvelle, votre film "${movieTitle}" a été approuvé par le comité du festival.`,
      '',
      'Il reste des étapes internes avant la sélection finale. Vous serez averti(e) en cas de sélection officielle.',
    );
  } else if (status === 'rejected') {
    subject = 'marsAI – Décision concernant votre film';
    lines.push(
      `Après examen, votre film "${movieTitle}" n’a malheureusement pas été retenu.`,
    );
    if (decisionReason) {
      lines.push('', 'Raison de la décision :', decisionReason);
    }
  } else if (status === 'selected') {
    subject = 'marsAI – Votre film est sélectionné !';
    lines.push(
      `Félicitations, votre film "${movieTitle}" est officiellement sélectionné pour le festival marsAI.`,
      '',
      'L’équipe reviendra vers vous avec les informations pratiques (projections, communication, etc.).',
    );
  } else {
    // Statut non concerné par un email
    return;
  }

  lines.push('', 'L’équipe marsAI');

  await sendMail({
    to,
    subject,
    text: lines.join('\n'),
  });
}

module.exports = {
  sendMail,
  sendSubmissionConfirmation,
  sendYouTubeUploadSuccessEmail,
  sendUploadFailureEmail,
  sendStatusUpdate,
};

