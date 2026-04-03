'use client';

import dynamic from 'next/dynamic';

const UpcomingClientSection = dynamic(
    () => import('@/components/UpcomingClientSection'),
    { ssr: false, loading: () => <div className="h-64 animate-pulse bg-white/5 rounded-2xl" /> }
);

export default function UpcomingSection() {
    return <UpcomingClientSection />;
}
