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
    memoryUsage: {
        rss: number;
        heapTotal: number;
        heapUsed: number;
        external: number;
        arrayBuffers?: number;
    };
}
export declare class AppService {
    private readonly startedAt;
    private readonly logger;
    private readonly pkgVersion;
    constructor();
    private loadPackageVersion;
    getStatus(): StatusPayload;
}
