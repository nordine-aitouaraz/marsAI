import React, { useEffect, useRef } from 'react';
import SubmitButton from '../ui/SubmitButton';

export default function StepForm({
  children,
  onSubmit,
  onBack,
  backLabel,
  submitLabel,
  submitting,
  error,
  className = '',
}) {
  const formRef = useRef(null);
  useEffect(() => {
    const el = formRef.current?.querySelector('input,select,textarea,button');
    if (el) el.focus();
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit && onSubmit();
      }}
      className={`mt-4 space-y-4 ${className}`}
    >
      {children}

      <div className="flex items-center justify-between pt-2">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-brand-muted hover:text-brand-primary-soft"
          >
            {backLabel}
          </button>
        ) : (
          <div />
        )}

        <SubmitButton loading={submitting}>{submitLabel}</SubmitButton>
      </div>

      {error && (
        <p
          role="status"
          aria-live="polite"
          className="mt-2 rounded-md border border-red-500/60 bg-red-950/40 px-3 py-2 text-xs text-red-200"
        >
          {error}
        </p>
      )}
    </form>
  );
}
