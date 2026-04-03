'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbsProps } from '@/types/ui';

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                    {item.href ? (
                        <Link 
                            href={item.href}
                            className="text-slate-600 hover:text-brand-red transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-brand-red">{item.label}</span>
                    )}
                    {index < items.length - 1 && (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-800" />
                    )}
                </div>
            ))}
        </nav>
    );
}
