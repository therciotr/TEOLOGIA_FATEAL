"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const package_json_1 = require("../package.json");
let AppService = class AppService {
    constructor() {
        this.startedAt = Date.now();
    }
    getStatus() {
        var _a, _b;
        const now = Date.now();
        return {
            status: 'ok',
            message: 'API do Projeto Teologia FATEAL funcionando!',
            version: (_a = process.env.npm_package_version) !== null && _a !== void 0 ? _a : package_json_1.version,
            commit: process.env.COMMIT_SHA,
            environment: ((_b = process.env.NODE_ENV) !== null && _b !== void 0 ? _b : 'development'),
            port: process.env.PORT ? Number(process.env.PORT) : undefined,
            uptime: Math.floor((now - this.startedAt) / 1000),
            startedAt: new Date(this.startedAt).toISOString(),
            timestamp: new Date(now).toISOString(),
            node: process.version,
            memoryUsage: process.memoryUsage(),
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
