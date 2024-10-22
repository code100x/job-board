import Footer from '@/layouts/footer';
import Header from '@/layouts/header';
import { cn } from '@/lib/utils';
import Providers from '@/providers/providers';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import localFont from 'next/font/local';
import Pwa from '@/components/Pwa';

const satoshi = localFont({
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/satoshi.ttf',
    },
  ],
  variable: '--font-satoshi',
});
export const metadata: Metadata = {
  title: '100xJobs',
  description: 'Get your dream job',
  manifest: './app/mainfest.json',
  keywords: ['jobs', 'job portal', 'remote job', 'saas'],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          'font-satoshi antialiased bg-gradient-light dark:bg-gradient min-h-screen relative flex flex-col',
          satoshi.variable
        )}
      >
        {' '}
        <NextTopLoader color="blue" showSpinner={false} />
        <Providers>
          <Header />
          <main className="grow grid p-4">{children}</main>
          <Footer />
        </Providers>
        <Pwa />
        {/* Commenting this out for temp basis */}
        {/* <ScrollToTop />  */}
      </body>
    </html>
  );
}
