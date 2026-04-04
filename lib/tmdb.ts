import { Movie, MovieResponse } from '@/types/movie';

const TMDB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Fallback data for testing or when API key is not configured
const MOCK_MOVIES: Movie[] = [
    {
        id: 1,
        title: "The Curse of the Black Pearl",
        original_title: "Pirates of the Caribbean",
        overview: "Captain Jack Sparrow teams up with Will Turner to rescue Elizabeth Swann from the cursed pirates of the Black Pearl.",
        poster_path: "/z899_mock.jpg",
        backdrop_path: "/z899_bg_mock.jpg",
        release_date: "2003-07-09",
        vote_average: 8.5,
        vote_count: 15000,
        genre_ids: [28, 12, 14],
        popularity: 950
    },
    {
        id: 2,
        title: "The Incredible Hulk",
        original_title: "The Incredible Hulk",
        overview: "Scientist Bruce Banner scours the planet for an antidote to the unbridled force of rage within him.",
        poster_path: "/hulk_mock.jpg",
        backdrop_path: "/hulk_bg_mock.jpg",
        release_date: "2008-06-12",
        vote_average: 7.2,
        vote_count: 8000,
        genre_ids: [28, 878, 12],
        popularity: 500
    }
];

// Helper to fetch from TMDB with auth. Falls back to mock data
// if the API key is missing or DNS resolution fails (frequent on edge).
async function tmdbFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
    const fallbackData = {
        results: MOCK_MOVIES,
        page: 1,
        total_pages: 1,
        total_results: MOCK_MOVIES.length
    } as unknown as T;

    if (!token || token.includes('YOUR_ACCESS_TOKEN')) {
        console.warn('CRITICAL: NEXT_PUBLIC_TMDB_ACCESS_TOKEN is missing. Falling back to MOCK DATA.');
        return fallbackData;
    }

    const url = `${TMDB_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...options,
            signal: AbortSignal.timeout(5000), // More generous timeout for cold starts
            next: { revalidate: 3600 },
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Unauthorized (Check your .env settings)`);
        }

        return response.json();
    } catch (e) {
        console.error("Fetch failed, falling back to Mock Data.", e);
        return {
            results: MOCK_MOVIES,
            page: 1,
            total_pages: 1,
            total_results: MOCK_MOVIES.length
        } as unknown as T;
    }
}

/**
 * TMDB API Client Service
 */
export const tmdb = {
    // Fetch trending content
    getTrending: async (page: number = 1): Promise<MovieResponse> => {
        return tmdbFetch<MovieResponse>(`/trending/movie/day?page=${page}`);
    },

    // Get Popular Movies (Requirement: F-1)
    getPopular: async (page: number = 1): Promise<MovieResponse> => {
        return tmdbFetch<MovieResponse>(`/movie/popular?page=${page}`);
    },

    // Search Movies (Requirement: F-3)
    searchMovies: async (query: string, page: number = 1): Promise<MovieResponse> => {
        return tmdbFetch<MovieResponse>(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
    },

    // Fetch movie details by ID - wraps in try/catch so a network timeout
    // doesn't propagate up and crash the detail page render.
    getMovieDetails: async (id: string | number): Promise<Movie> => {
        const isMock = !TMDB_ACCESS_TOKEN || TMDB_ACCESS_TOKEN === 'your_read_access_token_here';
        if (isMock) return MOCK_MOVIES[0];
        try {
            const movie = await tmdbFetch<Movie>(`/movie/${id}`);
            // Validate we got an actual Movie shape back (not a fallback MovieResponse)
            if (!movie || typeof movie.vote_average !== 'number') {
                return MOCK_MOVIES[0];
            }
            return movie;
        } catch {
            return MOCK_MOVIES[0];
        }
    },

    // Fetch similar movies — returns empty results on failure to avoid crashing detail page
    getSimilarMovies: async (id: string | number, page: number = 1): Promise<MovieResponse> => {
        try {
            return await tmdbFetch<MovieResponse>(`/movie/${id}/similar?page=${page}`);
        } catch {
            return { results: [], page: 1, total_pages: 0, total_results: 0 };
        }
    },

    // Get Upcoming Movies (Requirement: Component abstraction)
    getUpcoming: async (page: number = 1): Promise<MovieResponse> => {
        return tmdbFetch<MovieResponse>(`/movie/upcoming?page=${page}`);
    },

    // Helper to construct TMDB image URLs. Returns null for mock paths so
    // components fall back to the placeholder UI with no outbound request.
    getImageUrl: (path: string | null, size: 'poster' | 'backdrop' = 'poster') => {
        if (!path) return null;
        if (path.includes('_mock.jpg')) return null;
        const width = size === 'poster' ? 'w500' : 'original';
        return `${TMDB_IMAGE_BASE_URL}/${width}${path}`;
    },

    filterByCategory: (results: Movie[], category?: string) => {
        if (!category || category === 'All') return results;
        const genreMap: Record<string, number> = {
            'Action': 28, 'Adventure': 12, 'Animation': 16, 'Comedy': 35,
            'Crime': 80, 'Documentary': 99, 'Drama': 18, 'Family': 10751, 'Fantasy': 14
        };
        const targetId = genreMap[category];
        return targetId ? results.filter(movie => movie.genre_ids?.includes(targetId)) : results;
    },

    getYear: (date?: string) => date ? new Date(date).getFullYear().toString() : 'N/A'
};
