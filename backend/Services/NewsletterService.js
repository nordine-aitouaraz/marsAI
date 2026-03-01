const { query } = require('../Utils/db');
const { HttpError } = require('../Utils/http');
const { sendMail } = require('./../Services/mail.service');

async function listSubscribers() {
  const rows = await query(`SELECT * FROM newsletters ORDER BY id DESC`);
  return rows.map((row) => ({
    id: row.id,
    email: row.email,
  }));
}

async function subscribe(email) {
  if (!email) {
    throw new HttpError(400, 'Missing email');
  }

  try {
    await query(
      'INSERT INTO newsletters (email) VALUES (:email)',
      { email }
    );
  } catch (err) {
    // 1062 = duplicate key (email unique) → on ignore simplement
    if (!(err && err.code === 'ER_DUP_ENTRY')) {
      throw err;
    }
  }

  return { email };
}

async function sendNewsletter({ subject, text }) {
  if (!subject || !text) {
    throw new HttpError(400, 'Missing subject or text');
  }

  const subscribers = await listSubscribers();

  if (!subscribers.length) {
    return { sent: 0 };
  }

  // Envoi simple, un email par abonné
  let sent = 0;
  for (const sub of subscribers) {
    await sendMail({
      to: sub.email,
      subject,
      text,
    });
    sent += 1;
  }

  return { sent };
}

module.exports = {
  listSubscribers,
  subscribe,
  sendNewsletter,
};


