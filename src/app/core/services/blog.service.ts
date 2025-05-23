import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BlogPost, BlogPostsResponse } from '@/core/models/blog-post.model';
import { LoadingState } from '@/shared/rxjs/with-loading-state.operator';
import { withLoadingState } from '@/shared/rxjs/with-loading-state.operator';

export interface BlogFilters {
    categories?: string[];
    tags?: string[];
    author?: string;
    dateFrom?: string;
    dateTo?: string;
    status?: 'draft' | 'published' | 'archived';
}

export interface BlogPaginationOptions {
    page: number;
    limit: number;
}

@Injectable({
    providedIn: 'root',
})
export class BlogService {
    private http = inject(HttpClient);
    private locale = inject(LOCALE_ID);

    private getLocalizedPath(basePath: string): string {
        return `assets/data/${this.locale}/${basePath}.json`;
    }

    getAllPosts(): Observable<LoadingState<BlogPost[]>> {
        return this.http.get<BlogPostsResponse>(this.getLocalizedPath('blog-posts')).pipe(
            map((response) => response.posts),
            withLoadingState()
        );
    }

    getPostById(id: string): Observable<LoadingState<BlogPost | null>> {
        return this.getAllPosts().pipe(
            map((loadingState) => ({
                ...loadingState,
                data: loadingState.data?.find((post) => post.id === id) || null,
            }))
        );
    }

    getPublishedPosts(): Observable<LoadingState<BlogPost[]>> {
        return this.getAllPosts().pipe(
            map((loadingState) => ({
                ...loadingState,
                data: loadingState.data?.filter((post) => post.status === 'published') || [],
            }))
        );
    }

    getPostsByCategory(category: string): Observable<LoadingState<BlogPost[]>> {
        return this.getPublishedPosts().pipe(
            map((loadingState) => ({
                ...loadingState,
                data: loadingState.data?.filter((post) => post.categories.includes(category)) || [],
            }))
        );
    }

    getPostsByTag(tag: string): Observable<LoadingState<BlogPost[]>> {
        return this.getPublishedPosts().pipe(
            map((loadingState) => ({
                ...loadingState,
                data: loadingState.data?.filter((post) => post.tags.includes(tag)) || [],
            }))
        );
    }

    getFeaturedPosts(limit = 3): Observable<LoadingState<BlogPost[]>> {
        return this.getPublishedPosts().pipe(
            map((loadingState) => ({
                ...loadingState,
                data:
                    loadingState.data?.sort((a, b) => b.viewCount - a.viewCount).slice(0, limit) ||
                    [],
            }))
        );
    }

    getRecentPosts(limit = 5): Observable<LoadingState<BlogPost[]>> {
        return this.getPublishedPosts().pipe(
            map((loadingState) => ({
                ...loadingState,
                data:
                    loadingState.data
                        ?.sort(
                            (a, b) =>
                                new Date(b.publishedDate).getTime() -
                                new Date(a.publishedDate).getTime()
                        )
                        .slice(0, limit) || [],
            }))
        );
    }

    searchPosts(query: string): Observable<LoadingState<BlogPost[]>> {
        return this.getPublishedPosts().pipe(
            map((loadingState) => ({
                ...loadingState,
                data:
                    loadingState.data?.filter((post) => this.matchesSearchQuery(post, query)) || [],
            }))
        );
    }

    filterPosts(filters: BlogFilters): Observable<LoadingState<BlogPost[]>> {
        return this.getPublishedPosts().pipe(
            map((loadingState) => ({
                ...loadingState,
                data: loadingState.data?.filter((post) => this.matchesFilters(post, filters)) || [],
            }))
        );
    }

    getPostsWithPagination(
        pagination: BlogPaginationOptions,
        filters?: BlogFilters
    ): Observable<LoadingState<BlogPostsResponse>> {
        const posts$ = filters ? this.filterPosts(filters) : this.getPublishedPosts();

        return posts$.pipe(
            map((loadingState) => {
                if (!loadingState.data) {
                    return {
                        ...loadingState,
                        data: null,
                    };
                }

                const startIndex = (pagination.page - 1) * pagination.limit;
                const endIndex = startIndex + pagination.limit;
                const paginatedPosts = loadingState.data.slice(startIndex, endIndex);
                const totalPages = Math.ceil(loadingState.data.length / pagination.limit);

                return {
                    ...loadingState,
                    data: {
                        posts: paginatedPosts,
                        totalCount: loadingState.data.length,
                        currentPage: pagination.page,
                        totalPages,
                    },
                };
            })
        );
    }

    getAllCategories(): Observable<LoadingState<string[]>> {
        return this.getAllPosts().pipe(
            map((loadingState) => ({
                ...loadingState,
                data: loadingState.data
                    ? [...new Set(loadingState.data.flatMap((post) => post.categories))].sort()
                    : [],
            }))
        );
    }

    getAllTags(): Observable<LoadingState<string[]>> {
        return this.getAllPosts().pipe(
            map((loadingState) => ({
                ...loadingState,
                data: loadingState.data
                    ? [...new Set(loadingState.data.flatMap((post) => post.tags))].sort()
                    : [],
            }))
        );
    }

    getRelatedPosts(postId: string, limit = 3): Observable<LoadingState<BlogPost[]>> {
        return this.getPostById(postId)
            .pipe(
                map((postState) => {
                    if (!postState.data) {
                        return {
                            data: [],
                            loading: false,
                            error: null,
                        };
                    }

                    const currentPost = postState.data;
                    return this.getPublishedPosts().pipe(
                        map((postsState) => ({
                            ...postsState,
                            data:
                                postsState.data
                                    ?.filter((post) => post.id !== postId)
                                    .filter(
                                        (post) =>
                                            post.categories.some((cat) =>
                                                currentPost.categories.includes(cat)
                                            ) ||
                                            post.tags.some((tag) => currentPost.tags.includes(tag))
                                    )
                                    .slice(0, limit) || [],
                        }))
                    );
                }),
                withLoadingState()
            )
            .pipe(map((state: any) => state.data || { data: [], loading: false, error: null }));
    }

    private matchesSearchQuery(post: BlogPost, query: string): boolean {
        const searchTerms = query
            .toLowerCase()
            .split(' ')
            .filter((term) => term.length > 0);
        const searchableText = [
            post.title,
            post.excerpt,
            post.content,
            post.author.name,
            ...post.categories,
            ...post.tags,
        ]
            .join(' ')
            .toLowerCase();

        return searchTerms.every((term) => searchableText.includes(term));
    }

    private matchesFilters(post: BlogPost, filters: BlogFilters): boolean {
        if (filters.categories && filters.categories.length > 0) {
            if (!filters.categories.some((cat) => post.categories.includes(cat))) return false;
        }

        if (filters.tags && filters.tags.length > 0) {
            if (!filters.tags.some((tag) => post.tags.includes(tag))) return false;
        }

        if (filters.author && post.author.name !== filters.author) return false;

        if (filters.status && post.status !== filters.status) return false;

        if (filters.dateFrom) {
            if (new Date(post.publishedDate) < new Date(filters.dateFrom)) return false;
        }

        if (filters.dateTo) {
            if (new Date(post.publishedDate) > new Date(filters.dateTo)) return false;
        }

        return true;
    }
}
