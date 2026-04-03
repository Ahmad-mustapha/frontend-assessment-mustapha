import React, { Suspense } from 'react';
import { tmdb } from '@/lib/tmdb';
import FeaturedHero from '@/components/FeaturedHero';
import MovieGrid from '@/components/MovieGrid';
import Pagination from '@/components/Pagination';

type Props = {
    searchParams: Promise<{ page?: string }>;
};

function PopularSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="h-4 w-48 bg-white/10 rounded"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="aspect-video sm:aspect-[3/4] bg-white/5 rounded-lg border border-white/5"></div>
                ))}
            </div>
        </div>
    );
}

async function PopularMoviesSection({ page }: { page: number }) {
    const popularData = await tmdb.getPopular(page);
    return (
        <div className="space-y-12">
            <MovieGrid 
                movies={popularData.results} 
                title="Popular Movies" 
            />
            <Pagination 
                currentPage={page} 
                totalPages={Math.min(popularData.total_pages, 500)} // TMDB limit
            />
        </div>
    );
}

export default async function Home({ searchParams }: Props) {
    const { page: pageStr } = await searchParams;
    const page = Number(pageStr) || 1;

    // Fetch ONLY initial trending movie data here, preventing blocking of the first paint
    const trendingData = await tmdb.getTrending();
    const featuredMovie = trendingData.results[0];

    return (
        <div className="space-y-16 animate-in fade-in duration-1000">
            {featuredMovie && <FeaturedHero movie={featuredMovie} />}

            <div className="space-y-12">
                {/* Wrap slower data fetch inside React 18 Suspense Boundary */}
                <Suspense fallback={<PopularSkeleton />}>
                    <PopularMoviesSection page={page} />
                </Suspense>

                {/* Second row for visual variety */}
                <MovieGrid 
                    movies={trendingData.results.slice(1, 11)} 
                    title="Trending Today" 
                />
            </div>
        </div>
    );
}
