export interface commentType {
    id: number
    author: string
    content: string
    created: Date
};

export interface returnType {
    comments: commentType[]
    comments_count: number
}

export interface queryType {
    author_keywords: string
    content_keywords: string
    hide_duplicates: boolean
    date_from: string
    date_to: string
    sort: string
    per_page: number
    page: number
};