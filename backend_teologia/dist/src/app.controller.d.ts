import { AppService, StatusPayload } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getRoot(): {
        status: 'ok';
    };
    getStatus(): StatusPayload;
}
