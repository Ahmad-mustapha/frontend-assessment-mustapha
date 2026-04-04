# 🎬 StreamFix: Movie & Series Explorer

A high-performance content discovery application built with **Next.js 15**, **React 19**, and the **TMDB API**.

**Live Demo:** [https://frontend-assessment-mustapha.ahmadishola12.workers.dev](https://frontend-assessment-mustapha.ahmadishola12.workers.dev)

---

## 🛠 Technical Decisions

### Data Fetching: TanStack Query + Native Fetch
I used a hybrid approach to balance speed and interactivity.
- **Server-Side (Native Fetch):** For the Hero and main movie grids, I use Next.js server components with `revalidate: 3600`. This enables Incremental Static Regeneration (ISR), so the page loads instantly from the cache while updating in the background.
- **Client-Side (TanStack Query):** For dynamic sections like "Coming Soon," I use TanStack Query. It handles background refetching and state management without manual `useEffect` logic.

### State Management: Zustand
I chose **Zustand** for global state (like the Watchlist) because it's lightweight and has much less boilerplate than Redux. For navigation-related state (search, filters), I stick to **URL-driven state** so that every view is easily shareable.

---

## 📂 Project Structure

```text
├── app/                  # App Router (Global Layouts, Routing, Styles)
├── components/           # UI components (Atomic Design)
├── hooks/                # Custom React hooks (e.g., useDebounce)
├── lib/                  # API client and utility functions
├── types/                # TypeScript interfaces
└── __tests__/            # Unit and integration tests
```

---

## ⚡ Performance & Accessibility

### Core Optimizations
- **LCP & Image Priority:** I use `next/image` for all media. Above-the-fold images are marked with `priority` to improve the Largest Contentful Paint.
- **Layout Stability:** Fixed aspect ratios on all containers prevent content jitter (CLS) as images load.
- **Code Splitting:** I use `next/dynamic` for heavy client components to keep the initial JavaScript bundle as small as possible.
- **Font Optimization:** Leveraging `next/font` to avoid layout shifts during font loading.

### Accessibility
- **Semantic HTML:** Using proper landmark elements (`<main>`, `<nav>`, `<header>`) and heading structures.
- **ARIA Support:** Interactive elements are tagged with `aria-label` and `aria-current` for screen-reader compatibility.
- **Keyboard Nav:** Focus-visible styles ensure clear navigation for keyboard-only users.

### Edge Caching
The project is configured for **Cloudflare Workers** via the **OpenNext** adapter.
- `revalidate: N` is mapped to the Workers `cacheTtl` at the edge.
- `force-cache` ensures static assets are served from the nearest global node.
- I added an `x-cache-status` header (HIT/MISS) to verify edge caching behavior in production.

---

## 🧪 Testing

The project uses **Vitest** and **React Testing Library**. 
- To run tests: `npm test`
- Current coverage includes core UI components like `MovieCard` and `Breadcrumbs`, including edge cases for missing data and user interactions.

---

## 🚀 Setup & Launch

1. **Clone the repo:** `git clone [repo-url]`
2. **Install dependencies:** `npm install`
3. **Environment:** Create a `.env.local` file and add your `NEXT_PUBLIC_TMDB_ACCESS_TOKEN`.
4. **Run Dev:** `npm run dev`
5. **Production Build:** `npm run build`
