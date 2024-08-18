'use client';
import { FC, ReactNode } from 'react';
import AuthProvider from './auth-provider';
import { ThemeProvider } from './theme-provider';
import { Toaster } from '@/components/ui/toaster';
import ReactQueryClientProvider from './ReactQueryClientProvider';

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ReactQueryClientProvider>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </ReactQueryClientProvider>
  );
};

export default Provider;
