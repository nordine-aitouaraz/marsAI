export default function HeaderBurger({ open, onToggle }) {
  return (
    <button
      type="button"
      aria-label="Ouvrir le menu"
      aria-expanded={open}
      onClick={onToggle}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-black/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:border-blue-500 hover:shadow-blue-500/20"
    >
      <span className="relative flex h-3.5 w-4 flex-col justify-between">
        <span
          className={`h-0.5 w-full rounded-full bg-brand-white transition-transform ${
            open ? 'translate-y-[7px] rotate-45' : ''
          }`}
        />
        <span
          className={`h-0.5 w-full rounded-full bg-brand-white transition-opacity ${
            open ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`h-0.5 w-full rounded-full bg-brand-white transition-transform ${
            open ? '-translate-y-[7px] -rotate-45' : ''
          }`}
        />
      </span>
    </button>
  );
}
