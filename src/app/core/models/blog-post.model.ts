export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: {
        name: string;
        avatar?: string;
    };
    publishedDate: string;
    lastModified: string;
    status: 'draft' | 'published' | 'archived';
    categories: string[];
    tags: string[];
    featuredImage: {
        publicId: string;
        alt: string;
    };
    seo: {
        metaTitle: string;
        metaDescription: string;
        keywords: string[];
    };
    readTimeMinutes: number;
    viewCount: number;
}

export interface BlogPostsResponse {
    posts: BlogPost[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
}
