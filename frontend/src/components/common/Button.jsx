const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}) => {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60';

  const variants = {
    primary: 'nb-accent-gradient text-white border border-transparent hover:brightness-110',
    secondary: 'bg-[var(--nb-text)] text-[var(--nb-surface)] border border-transparent hover:opacity-90',
    outline: 'border border-[var(--nb-border)] bg-[var(--nb-surface)] text-[var(--nb-text)] hover:border-[var(--nb-accent)]',
    ghost: 'bg-transparent border border-transparent text-[var(--nb-text-muted)] hover:bg-[var(--nb-surface-soft)] hover:text-[var(--nb-text)]',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-7 py-4 text-base',
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
