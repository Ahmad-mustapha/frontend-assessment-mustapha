'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MovieGrid from './MovieGrid';
import { tmdb } from '@/lib/tmdb';
import { MovieResponse } from '@/types/movie';

export default function UpcomingClientSection() {
    const { data, isLoading, error } = useQuery<MovieResponse>({
        queryKey: ['upcoming-movies'],
        queryFn: () => tmdb.getUpcoming(),
        staleTime: 60 * 1000,
    });

    if (isLoading) return <div className="h-64 animate-pulse bg-white/5 rounded-2xl" />;
    if (error || !data) return null;

    return (
        <MovieGrid
            movies={data.results.slice(0, 10)}
            title="Coming Soon"
        />
    );
}
