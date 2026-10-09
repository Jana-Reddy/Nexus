export interface User {
    id: string;
    email: string;
    name?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Project {
    id: string;
    title: string;
    description?: string;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
    startDate?: Date;
    endDate?: Date;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    dueDate?: Date;
    projectId: string;
    assigneeId?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
