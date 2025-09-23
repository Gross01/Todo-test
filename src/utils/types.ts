export type Task = {
    name: string,
    completed: boolean,
    id: number,
}

export type FilterItems = 'all' | 'active' | 'completed'