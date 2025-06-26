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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let MetricsController = class MetricsController {
    getMetrics() {
        const memory = process.memoryUsage();
        return {
            status: 'ok',
            memory: {
                rssMB: +(memory.rss / 1024 / 1024).toFixed(2),
                heapTotalMB: +(memory.heapTotal / 1024 / 1024).toFixed(2),
                heapUsedMB: +(memory.heapUsed / 1024 / 1024).toFixed(2),
                externalMB: +(memory.external / 1024 / 1024).toFixed(2),
            },
            uptimeSeconds: +process.uptime().toFixed(2),
            timestamp: new Date().toISOString(),
        };
    }
};
exports.MetricsController = MetricsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Version)('1'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna métricas básicas de execução da API' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Métricas atuais da aplicação',
        schema: {
            example: {
                status: 'ok',
                memory: {
                    rssMB: 12.3,
                    heapTotalMB: 4.56,
                    heapUsedMB: 2.34,
                    externalMB: 0.98,
                },
                uptimeSeconds: 321.5,
                timestamp: '2025-06-23T18:20:00.000Z',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "getMetrics", null);
exports.MetricsController = MetricsController = __decorate([
    (0, swagger_1.ApiTags)('Metrics'),
    (0, common_1.Controller)('metrics')
], MetricsController);
