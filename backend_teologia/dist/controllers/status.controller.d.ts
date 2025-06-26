import { AppService, StatusPayload } from '../app.service';
export declare class StatusController {
    private readonly appService;
    constructor(appService: AppService);
    getStatus(): StatusPayload;
}
