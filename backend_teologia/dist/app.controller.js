"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getRoot() {
        return { status: 'ok' };
    }
    getStatus() {
        return this.appService.getStatus();
    }
    getHealth() {
        return { status: 'ok' };
    }
    redirectMetrics(res) {
        res.redirect(302, '/api/v1/metrics');
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Version)('1'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Status resumido da API (v1)' }),
    (0, swagger_1.ApiOkResponse)({ schema: { example: { status: 'ok' } } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getRoot", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, common_1.Version)('1'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Health-check detalhado da API' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Informações detalhadas da API',
        schema: {
            example: {
                status: 'ok',
                message: 'API funcionando!',
                version: '1.0.0',
                port: 3000,
                uptime: 123,
                startedAt: '2025-06-23T17:14:32.123Z',
                timestamp: '2025-06-23T17:16:55.000Z',
                node: 'v20.18.3',
                memoryUsage: {
                    rss: 12345678,
                    heapTotal: 4567890,
                    heapUsed: 2345678,
                    external: 987654,
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Get)('health'),
    (0, common_1.Version)('1'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Healthcheck externo (simples)' }),
    (0, swagger_1.ApiOkResponse)({ schema: { example: { status: 'ok' } } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getHealth", null);
__decorate([
    (0, common_1.Get)('metrics'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "redirectMetrics", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiTags)('App'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
