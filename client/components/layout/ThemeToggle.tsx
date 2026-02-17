'use client';

import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return <div className="btn btn-outline-secondary btn-sm" style={{ width: 38 }} aria-hidden />;
  }

  return (
    <button
      type="button"
      className="btn btn-outline-secondary btn-sm"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'dark' ? (
        <i className="bi bi-sun"></i>
      ) : (
        <i className="bi bi-moon"></i>
      )}
    </button>
  );
}
