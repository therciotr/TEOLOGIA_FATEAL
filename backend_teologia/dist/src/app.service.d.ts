export interface StatusPayload {
    status: 'ok';
    message: string;
    version: string;
    commit?: string;
    environment: 'production' | 'staging' | 'development' | string;
    port?: number;
    uptime: number;
    startedAt: string;
    timestamp: string;
    node: string;
    memoryUsage?: NodeJS.MemoryUsage;
}
export declare class AppService {
    private readonly startedAt;
    getStatus(): StatusPayload;
}
