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
exports.PagamentosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const firestore_1 = require("firebase-admin/firestore");
const pagamentos_bancos_service_1 = require("./pagamentos-bancos.service");
const firebase_module_1 = require("../../firebase/firebase.module");
let PagamentosService = class PagamentosService {
    constructor(prisma, bancos, firestore) {
        this.prisma = prisma;
        this.bancos = bancos;
        this.firestore = firestore;
    }
    async pagarBanco(banco, dadosPagamento) {
        if (!banco || !dadosPagamento) {
            throw new common_1.HttpException('Banco ou dados de pagamento não informados!', common_1.HttpStatus.BAD_REQUEST);
        }
        switch (banco) {
            case 'bb':
                return this.bancos.pagarComBancoDoBrasil(dadosPagamento);
            case 'mercado_pago':
                return this.bancos.pagarComMercadoPago(dadosPagamento);
            default:
                throw new common_1.HttpException(`Banco ${banco} não suportado!`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async create(dto) {
        var _a;
        const mensalidade = await this.prisma.mensalidade.findUnique({
            where: { id: dto.mensalidadeId },
        });
        if (!mensalidade) {
            throw new common_1.NotFoundException('Mensalidade não encontrada');
        }
        const data = {
            mensalidade: { connect: { id: dto.mensalidadeId } },
            valorPago: new client_1.Prisma.Decimal(dto.valorPago),
            metodo: dto.metodo,
            dataPagamento: new Date((_a = dto.dataPagamento) !== null && _a !== void 0 ? _a : Date.now()),
        };
        const pagamento = await this.prisma.pagamento.create({ data });
        await this.firestore.collection('pagamentos').doc(pagamento.id).set(pagamento);
        await this.prisma.mensalidade.update({
            where: { id: dto.mensalidadeId },
            data: { status: client_1.MensalidadeStatus.pago },
        });
        return pagamento;
    }
    findAll() {
        return this.prisma.pagamento.findMany({
            include: { mensalidade: true },
            orderBy: { dataPagamento: 'desc' },
        });
    }
    async findOne(id) {
        const pg = await this.prisma.pagamento.findUnique({
            where: { id },
            include: { mensalidade: true },
        });
        if (!pg)
            throw new common_1.NotFoundException('Pagamento não encontrado');
        return pg;
    }
    async update(id, dto) {
        const data = {
            valorPago: dto.valorPago !== undefined ? new client_1.Prisma.Decimal(dto.valorPago) : undefined,
            metodo: dto.metodo ? dto.metodo : undefined,
            dataPagamento: dto.dataPagamento ? new Date(dto.dataPagamento) : undefined,
        };
        const pg = await this.prisma.pagamento.update({
            where: { id },
            data,
            include: { mensalidade: true },
        });
        await this.firestore.collection('pagamentos').doc(id).update(Object.assign(Object.assign({}, pg), { updatedAt: new Date() }));
        return pg;
    }
    async remove(id) {
        await this.prisma.pagamento.delete({ where: { id } });
        await this.firestore.collection('pagamentos').doc(id).delete();
        return { message: `Pagamento ${id} removido com sucesso!` };
    }
    async quitarMensalidade(mensalidadeId) {
        await this.prisma.mensalidade.update({
            where: { id: mensalidadeId },
            data: { status: client_1.MensalidadeStatus.pago },
        });
        return { message: `Mensalidade ${mensalidadeId} foi quitada!` };
    }
    async gerarComprovanteMock(id) {
        return `Comprovante do pagamento ${id} (PDF gerado em desenvolvimento).`;
    }
};
exports.PagamentosService = PagamentosService;
exports.PagamentosService = PagamentosService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(firebase_module_1.FIRESTORE)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pagamentos_bancos_service_1.PagamentosBancosService,
        firestore_1.Firestore])
], PagamentosService);
