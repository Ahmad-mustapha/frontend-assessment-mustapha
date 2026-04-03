import { Movie } from './movie';

export interface MovieCardProps {
    movie: Movie;
    priority?: boolean;
}

export interface MovieGridProps {
    movies: Movie[];
    title?: string;
}

export interface FeaturedHeroProps {
    movie: Movie;
}

export interface GenreFiltersProps {
    activeGenre?: string;
    onGenreSelect?: (genre: string) => void;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
}

export interface BreadcrumbsProps {
    items: {
        label: string;
        href?: string;
    }[];
}
