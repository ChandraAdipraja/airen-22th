export default function Modal({
  open,
  title,
  children,
  primaryText = "OK",
  onPrimary,
  secondaryText,
  onSecondary,
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-5"
      role="dialog"
      aria-modal="true"
      onClick={onClose} // klik backdrop
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Card */}
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-5 shadow-[0_20px_100px_rgba(0,0,0,0.45)]"
        onClick={(e) => e.stopPropagation()} // biar klik card gak nutup
      >
        {title ? (
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        ) : null}

        <div className="mt-3">{children}</div>

        <div className="mt-5 flex gap-2 justify-end">
          {secondaryText ? (
            <button
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 transition"
              onClick={onSecondary}
            >
              {secondaryText}
            </button>
          ) : null}

          <button
            className="rounded-xl border border-pink-400/30 bg-pink-400/15 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-400/20 transition"
            onClick={onPrimary}
          >
            {primaryText}
          </button>
        </div>
      </div>
    </div>
  );
}
