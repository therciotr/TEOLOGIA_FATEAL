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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComprovantesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const pdfkit_1 = __importDefault(require("pdfkit"));
const stream_1 = require("stream");
const date_fns_1 = require("date-fns");
let ComprovantesService = class ComprovantesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async gerarComprovante(pagamentoId) {
        const pagamento = await this.prisma.pagamento.findUnique({
            where: { id: pagamentoId },
            include: {
                mensalidade: {
                    include: { aluno: true },
                },
            },
        });
        if (!pagamento) {
            throw new common_1.NotFoundException('Pagamento não encontrado.');
        }
        const { mensalidade, valorPago, dataPagamento } = pagamento;
        const { aluno, vencimento } = mensalidade;
        const mes = (0, date_fns_1.format)(vencimento, 'MM');
        const ano = (0, date_fns_1.format)(vencimento, 'yyyy');
        const doc = new pdfkit_1.default({ margin: 50 });
        const stream = new stream_1.PassThrough();
        doc.pipe(stream);
        doc
            .fontSize(20)
            .text('Comprovante de Pagamento', { align: 'center' })
            .moveDown(1.5);
        doc
            .fontSize(14)
            .text(`Aluno: ${aluno.nome}`)
            .text(`E-mail: ${aluno.email}`)
            .text(`Data do Pagamento: ${(0, date_fns_1.format)(dataPagamento, 'dd/MM/yyyy')}`)
            .text(`Valor Pago: R$ ${valorPago.toFixed(2).replace('.', ',')}`)
            .text(`Referente à Mensalidade: ${mes}/${ano}`)
            .moveDown()
            .text('Pagamento confirmado com sucesso.', { align: 'left' });
        doc.end();
        return stream;
    }
};
exports.ComprovantesService = ComprovantesService;
exports.ComprovantesService = ComprovantesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ComprovantesService);
