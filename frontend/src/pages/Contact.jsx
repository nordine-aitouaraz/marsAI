import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    newsletter: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmed = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    if (
      !trimmed.name ||
      !trimmed.email ||
      !trimmed.subject ||
      !trimmed.message
    ) {
      setError(t('contact.form.error.required'));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
      setError(t('contact.form.error.email'));
      return;
    }
    if (trimmed.message.length < 20) {
      setError(t('contact.form.error.messageLength'));
      return;
    }

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSuccess(t('contact.form.success'));
      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        newsletter: form.newsletter,
      });
    } catch {
      setError(t('contact.error.generic'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white">
      <Background />

      <section className="px-6 pt-32 pb-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-8 shadow-[0_25px_90px_rgba(0,0,0,.18)] backdrop-blur">
            <HeaderBadge
              badgeText={t('contact.badge')}
              title={t('contact.title')}
              subtitle={t('contact.subtitle')}
            />

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-sm">
              <div className="grid gap-4 md:grid-cols-2">
                <InputField
                  label={t('contact.form.name')}
                  value={form.name}
                  onChange={handleChange('name')}
                  minLength={2}
                  maxLength={120}
                />
                <InputField
                  label={t('contact.form.email')}
                  value={form.email}
                  onChange={handleChange('email')}
                  type="email"
                  maxLength={200}
                />
              </div>

              <InputField
                label={t('contact.form.subject')}
                value={form.subject}
                onChange={handleChange('subject')}
                minLength={3}
                maxLength={150}
              />

              <TextAreaField
                label={t('contact.form.message')}
                value={form.message}
                onChange={handleChange('message')}
                minLength={20}
                maxLength={2000}
                rows={5}
              />

              <div className="flex items-center justify-between gap-3 pt-2">
                <CheckboxField
                  label={t('contact.form.newsletter')}
                  checked={form.newsletter}
                  onChange={handleChange('newsletter')}
                />

                <SubmitButton
                  submitting={submitting}
                  label={t('contact.form.submit')}
                />
              </div>

              <StatusMessage error={error} success={success} />
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

const Background = () => (
  <>
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[#070819]" />
    <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#0b0d28]/70 via-[#070819] to-[#05060f]" />
  </>
);

const HeaderBadge = ({ badgeText, title, subtitle }) => (
  <>
    <p className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-brand-primary-soft">
      {badgeText}
    </p>
    <h1 className="mt-4 text-2xl font-extrabold tracking-tight md:text-3xl">
      {title}
    </h1>
    <p className="mt-2 text-sm text-white/70">{subtitle}</p>
  </>
);

const InputField = ({
  label,
  value,
  onChange,
  type = 'text',
  minLength,
  maxLength,
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-brand-muted">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required
      minLength={minLength}
      maxLength={maxLength}
      className="rounded-md border border-slate-800/80 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-primary-soft"
    />
  </div>
);

const TextAreaField = ({
  label,
  value,
  onChange,
  minLength,
  maxLength,
  rows,
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-brand-muted">{label}</label>
    <textarea
      rows={rows}
      value={value}
      onChange={onChange}
      required
      minLength={minLength}
      maxLength={maxLength}
      className="resize-none rounded-md border border-slate-800/80 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-primary-soft"
    />
  </div>
);

const CheckboxField = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 text-xs text-brand-muted">
    <input
      type="checkbox"
      checked={!!checked}
      onChange={onChange}
      className="h-3 w-3 rounded border-slate-600 bg-slate-900 text-brand-primary"
    />
    {label}
  </label>
);

const SubmitButton = ({ submitting, label }) => (
  <button
    type="submit"
    disabled={submitting}
    className="inline-flex items-center rounded-full bg-brand-primary px-5 py-2 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
  >
    {submitting ? 'Envoi...' : label}
  </button>
);

const StatusMessage = ({ error, success }) => {
  if (error) return <p className="text-[11px] text-red-300">{error}</p>;
  if (success) return <p className="text-[11px] text-emerald-300">{success}</p>;
  return null;
};
