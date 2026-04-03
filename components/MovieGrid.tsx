'use client';

import React from 'react';
import MovieCard from './MovieCard';
import { MovieGridProps } from '@/types/ui';

export default function MovieGrid({ movies, title }: MovieGridProps) {
    return (
        <section className="space-y-6">
            {title && (
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white italic border-l-4 border-brand-red pl-4">
                        {title}
                    </h2>
                </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                {movies.map((movie, index) => (
                    <MovieCard 
                        key={`${movie.id}-${index}`} 
                        movie={movie} 
                        priority={index < 4}
                    />
                ))}
            </div>
        </section>
    );
}
