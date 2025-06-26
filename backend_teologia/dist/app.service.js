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
var AppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const process_1 = require("process");
const fs_1 = require("fs");
const path_1 = require("path");
let AppService = AppService_1 = class AppService {
    constructor() {
        this.startedAt = Date.now();
        this.logger = new common_1.Logger(AppService_1.name);
        this.pkgVersion = this.loadPackageVersion();
        this.logger.log(`✅ API iniciada em ${new Date(this.startedAt).toISOString()}`);
    }
    loadPackageVersion() {
        const pkgPath = (0, path_1.join)(__dirname, '..', '..', 'package.json');
        if ((0, fs_1.existsSync)(pkgPath)) {
            try {
                const pkg = JSON.parse((0, fs_1.readFileSync)(pkgPath, 'utf-8'));
                return pkg.version || '0.0.0';
            }
            catch (err) {
                this.logger.error('❌ Erro ao ler package.json', err);
                return 'unknown';
            }
        }
        this.logger.warn('⚠️ package.json não encontrado no caminho esperado.');
        return 'unknown';
    }
    getStatus() {
        const now = Date.now();
        const memory = (0, process_1.memoryUsage)();
        return {
            status: 'ok',
            message: 'API do Projeto Teologia FATEAL funcionando!',
            version: this.pkgVersion,
            commit: process.env.COMMIT_SHA || 'unknown',
            environment: process.env.NODE_ENV || 'development',
            port: process.env.PORT ? Number(process.env.PORT) : undefined,
            uptime: Math.floor((now - this.startedAt) / 1000),
            startedAt: new Date(this.startedAt).toISOString(),
            timestamp: new Date(now).toISOString(),
            node: process_1.version,
            memoryUsage: {
                rss: memory.rss,
                heapTotal: memory.heapTotal,
                heapUsed: memory.heapUsed,
                external: memory.external,
                arrayBuffers: memory.arrayBuffers,
            },
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = AppService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
