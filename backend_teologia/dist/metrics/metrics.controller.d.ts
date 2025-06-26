export declare class MetricsController {
    getMetrics(): {
        status: string;
        memory: {
            rssMB: number;
            heapTotalMB: number;
            heapUsedMB: number;
            externalMB: number;
        };
        uptimeSeconds: number;
        timestamp: string;
    };
}
