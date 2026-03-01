import { FormField, ErrorAlert } from '../common';

export default function SendNewsletterForm({
  subject,
  setSubject,
  body,
  setBody,
  onSubmit,
  sending,
  sendError,
  sendResult,
}) {
  return (
    <form onSubmit={onSubmit} className="mt-3 space-y-3 text-xs">
      <FormField
        label="Sujet"
        name="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <FormField
        label="Contenu du message"
        name="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={5}
        required
      />
      {sendError && <ErrorAlert message={sendError} />}
      {sendResult && !sendError && (
        <p className="rounded-md border border-emerald-500/60 bg-emerald-950/40 px-3 py-2 text-[11px] text-emerald-200">
          {sendResult}
        </p>
      )}
      <div className="flex justify-end pt-1">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center rounded-full bg-brand-primary px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? 'Envoi...' : 'Envoyer la newsletter'}
        </button>
      </div>
    </form>
  );
}
