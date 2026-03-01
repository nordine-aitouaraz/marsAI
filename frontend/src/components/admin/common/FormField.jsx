export default function FormField({
  label,
  type = 'text',
  name,
  value,
  onChange,
  required,
  placeholder,
  rows,
  className = '',
}) {
  const inputClass =
    'w-full rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-brand-primary-soft';
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-[11px] font-medium text-brand-muted">
        {label}
      </label>
      {rows ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className={inputClass}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </div>
  );
}
