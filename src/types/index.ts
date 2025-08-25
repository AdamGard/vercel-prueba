export type Category = 'UI' | 'UX' | 'Feature' | 'Bug' | 'Performance';
export type Status = 'Open' | 'In Progress' | 'Complete';
export type SortBy = 'Most Upvoted' | 'Newest';

export type Task = {
    id: string;
    title: string;
    description: string;
    category: Category;
    status: Status;
    votes: number;
    comments: number;
    createdAt: Date;
    hasUserVoted: boolean;
}

export type FilterContextType = {
    selectedCategory: Category | 'All Categories';
    sortBy: SortBy;
    setSelectedCategory: (category: Category | 'All Categories') => void;
    setSortBy: (sortBy: SortBy) => void;
}
