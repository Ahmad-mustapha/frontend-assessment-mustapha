'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Video } from 'lucide-react';
import { tmdb } from '@/lib/tmdb';
import { MovieCardProps } from '@/types/ui';

export default function MovieCard({ movie, priority = false }: MovieCardProps) {
    const backdropUrl = tmdb.getImageUrl(movie.backdrop_path, 'backdrop');
    const posterUrl = tmdb.getImageUrl(movie.poster_path);
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

    return (
        <Link 
            href={`/items/${movie.id}`} 
            className="group block relative aspect-video sm:aspect-[3/4] bg-[#121212] rounded-lg border border-white/5 overflow-hidden transition-all duration-200 hover:border-brand-red/40 active:scale-[0.98] shadow-sm hover:shadow-xl hover:shadow-brand-red/5"
        >
            <div className="absolute inset-0">
                {posterUrl ? (
                    <Image
                        src={posterUrl}
                        alt={movie.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={priority}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-700">
                        <Video className="w-6 h-6 opacity-20" />
                    </div>
                )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent group-hover:from-black/100 transition-all" />

            {/* Item Metadata */}
            <div className="absolute bottom-0 left-0 right-0 p-3 space-y-0.5">
                <h3 className="text-white font-black leading-tight line-clamp-1 text-[11px] sm:text-xs uppercase tracking-tight">
                    {movie.title}
                </h3>
                
                <div className="flex items-center justify-between text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-brand-red">
                            <Star className="w-2.5 h-2.5 fill-brand-red" />
                            {movie.vote_average.toFixed(1)}
                        </span>
                        <span className="opacity-20 text-white italic">{releaseYear}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
