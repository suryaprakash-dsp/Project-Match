import React from 'react';

const variants = {
  primary: 'bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] text-white shadow-sm hover:shadow-caramel/25 dark:bg-[#c97e3c] dark:hover:bg-[#b46b2b] dark:text-white',
  secondary: 'bg-white hover:bg-[#f5f0e6] text-[#2d231b] border border-[#e7decb] shadow-sm hover:shadow dark:bg-[#302821] dark:text-[#f6efe6] dark:border-[#42372e] dark:hover:bg-[#3b322a]',
  outline: 'border border-[#b46b2b]/50 text-[#b46b2b] hover:bg-[#fdf5eb] dark:border-[#c97e3c]/50 dark:text-[#c97e3c] dark:hover:bg-[#302821]',
  ghost: 'text-[#4a3e35] dark:text-[#dfd4c5] hover:text-[#b46b2b] dark:hover:text-[#c97e3c] hover:bg-[#f5f0e6] dark:hover:bg-[#302821]',
  danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm hover:shadow',
  success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow',
};

const sizes = {
  xs: 'px-2.5 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  icon: Icon,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
        variants[variant]
      } ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon size={size === 'lg' ? 18 : 16} />
      ) : null}
      {children}
    </button>
  );
}
