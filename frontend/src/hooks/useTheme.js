import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme] = useState('light');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
    localStorage.setItem('theme', 'light');
  }, []);

  const toggleTheme = () => {};

  return { theme, toggleTheme };
}
