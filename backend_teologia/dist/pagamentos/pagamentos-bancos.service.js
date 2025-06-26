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
var PagamentosBancosService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagamentosBancosService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let PagamentosBancosService = PagamentosBancosService_1 = class PagamentosBancosService {
    constructor(http, config) {
        this.http = http;
        this.config = config;
        this.logger = new common_1.Logger(PagamentosBancosService_1.name);
    }
    async pagarComBancoDoBrasil(dadosPagamento) {
        var _a, _b;
        const url = (_a = this.config.get('BB_API_URL')) !== null && _a !== void 0 ? _a : 'https://api.bb.com.br/pagamentos';
        const token = (_b = this.config.get('BB_TOKEN')) !== null && _b !== void 0 ? _b : 'Bearer seu_token_aqui';
        return this.requestPSP(url, token, dadosPagamento);
    }
    async pagarComMercadoPago(dados) {
        return { status: 'ok', data: { message: 'Mercado Pago mock' } };
    }
    async pagarComBradesco(dados) {
        return { status: 'ok', data: { message: 'Bradesco mock' } };
    }
    async pagarComSantander(dados) {
        return { status: 'ok', data: { message: 'Santander mock' } };
    }
    async pagarComCaixa(dados) {
        return { status: 'ok', data: { message: 'Caixa mock' } };
    }
    async pagarComSicredi(dados) {
        return { status: 'ok', data: { message: 'Sicredi mock' } };
    }
    async requestPSP(url, token, payload) {
        var _a;
        const timeoutMs = Number((_a = this.config.get('PSP_TIMEOUT_MS')) !== null && _a !== void 0 ? _a : 8000);
        const observable$ = this.http
            .post(url, payload, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        })
            .pipe((0, rxjs_1.timeout)(timeoutMs), (0, rxjs_1.map)((res) => ({ status: 'ok', data: res.data })), (0, rxjs_1.catchError)((err) => {
            var _a, _b, _c, _d;
            const msg = (_d = (_c = (_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : err.message) !== null && _d !== void 0 ? _d : 'Erro desconhecido no PSP';
            this.logger.error(`PSP error: ${msg}`);
            return (0, rxjs_1.throwError)(() => new common_1.HttpException(`Falha de pagamento: ${msg}`, common_1.HttpStatus.BAD_GATEWAY));
        }));
        return (0, rxjs_1.firstValueFrom)(observable$);
    }
};
exports.PagamentosBancosService = PagamentosBancosService;
exports.PagamentosBancosService = PagamentosBancosService = PagamentosBancosService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], PagamentosBancosService);
