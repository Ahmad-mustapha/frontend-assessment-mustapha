export interface PageSearchParams {
    page?: string;
    q?: string;
    genre?: string;
}

export interface PageParams {
    id: string;
}

export interface SearchPageProps {
    searchParams: Promise<PageSearchParams>;
}

export interface MovieDetailPageProps {
    params: Promise<PageParams>;
}

export interface HomePageProps {
    searchParams: Promise<{ page?: string }>;
}
