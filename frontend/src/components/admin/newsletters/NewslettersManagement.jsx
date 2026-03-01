import { useState } from 'react';
import { SectionHeader, ErrorAlert, SectionCard } from '../common';
import { useNewsletterSubscribers } from '../hooks';
import SubscribersList from './SubscribersList';
import SendNewsletterForm from './SendNewsletterForm';

export default function NewslettersManagement() {
  const { subscribers, loading, error } = useNewsletterSubscribers();
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [sendResult, setSendResult] = useState(null);

  const handleSend = async (e) => {
    e.preventDefault();
    setSendError(null);
    setSendResult(null);
    if (!subject.trim() || !body.trim()) {
      setSendError('Sujet et contenu sont obligatoires.');
      return;
    }
    setSending(true);
    try {
      const admin = require('../../../services/admin').default;
      const data = await admin.sendNewsletter({ subject, text: body });
      setSendResult(
        typeof data.sent === 'number'
          ? `Newsletter envoyée à ${data.sent} abonné(s).`
          : 'Newsletter envoyée.',
      );
      setSubject('');
      setBody('');
    } catch (err) {
      setSendError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Gestion des newsletters"
        subtitle="Consultez les inscrits et envoyez des campagnes d'emailing."
      />
      <div className="grid gap-4 md:grid-cols-[2fr,1.2fr]">
        <SectionCard
          title="Inscrits à la newsletter"
          action={
            <span className="text-[11px] text-brand-muted">
              Basé sur les abonnements newsletter des réalisateurs.
            </span>
          }
        >
          <ErrorAlert message={error} className="mb-3" />
          <SubscribersList subscribers={subscribers} loading={loading} />
        </SectionCard>
        <SectionCard title="Envoyer une newsletter" action={null}>
          <p className="mt-1 text-[11px] text-brand-muted">
            Un email sera envoyé à tous les abonnés.
          </p>
          <SendNewsletterForm
            subject={subject}
            setSubject={setSubject}
            body={body}
            setBody={setBody}
            onSubmit={handleSend}
            sending={sending}
            sendError={sendError}
            sendResult={sendResult}
          />
        </SectionCard>
      </div>
    </div>
  );
}
