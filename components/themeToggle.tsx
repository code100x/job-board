'use client'
import { useEffect, useState } from 'react';
import { Icons } from './Icons';

export function ThemeToggle () {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[1.2rem] h-[1.2rem]" />; // Placeholder
  }

  return (
    <>
      {theme === 'light' ? (
        <div>
          <Icons.moon
            onClick={() => setTheme("dark")}
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
        </div>
      ) : (
        <div>
          <Icons.sun
            onClick={() => setTheme("light")}
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
        </div>
      )}
    </>
  );
}