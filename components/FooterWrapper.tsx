"use client";
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterWrapper() {
    const pathname = usePathname();
    const includeFooterLocations = pathname === '/' || pathname === '/jobs'

    if (!includeFooterLocations)
        return null;

    return <Footer />;
}
