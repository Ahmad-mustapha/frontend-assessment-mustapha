'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from '@/types/ui';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage: number) => {
        if (onPageChange) {
            onPageChange(newPage);
            return;
        }

        // Default: Update URL Search Params (Server-side friendly)
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center justify-center gap-4 py-8">
            <button
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="flex items-center justify-center w-10 h-10 rounded border border-white/10 text-slate-400 hover:text-white hover:border-brand-red disabled:opacity-20 disabled:hover:border-white/10 transition-all"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-black tracking-widest uppercase text-slate-500">
                <span className="text-white">{currentPage}</span>
                <span className="opacity-20">OF</span>
                <span>{totalPages}</span>
            </div>

            <button
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="flex items-center justify-center w-10 h-10 rounded border border-white/10 text-slate-400 hover:text-white hover:border-brand-red disabled:opacity-20 disabled:hover:border-white/10 transition-all"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
