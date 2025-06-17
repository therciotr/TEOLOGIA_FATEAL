// src/pagamentos/pagamentos.service.ts
import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PagamentosBancosService } from './pagamentos-bancos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { Response } from 'express';

@Injectable()
export class PagamentosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bancosService: PagamentosBancosService,
    @Inject('FIRESTORE')
    private readonly firestore: FirebaseFirestore.Firestore,
  ) {}

  /* ─────────────────────────────────────────────────────────
   * Integração bancária (Banco do Brasil, Asaas, etc.)
   * ──────────────────────────────────────────────────────── */
  async pagarBanco(banco: string, dadosPagamento: any) {
    if (!banco || !dadosPagamento) {
      throw new HttpException(
        'Banco ou dados de pagamento não informados!',
        HttpStatus.BAD_REQUEST,
      );
    }

    switch (banco) {
      case 'bb':
        return this.bancosService.pagarComBancoDoBrasil(dadosPagamento);
      default:
        throw new HttpException(
          `Banco ${banco} não suportado!`,
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  /* ─────────────────────────────────────────────────────────
   * CREATE – Prisma + Firestore
   * ──────────────────────────────────────────────────────── */
  async create(dto: CreatePagamentoDto) {
    const data: Prisma.PagamentoCreateInput = {
      mensalidade: { connect: { id: dto.mensalidadeId } },
      valorPago: new Prisma.Decimal(dto.valorPago),
      metodo: dto.metodo,
      dataPagamento: new Date(),
    };

    const pagamento = await this.prisma.pagamento.create({ data });

    await this.firestore
      .collection('pagamentos')
      .doc(pagamento.id)
      .set({ ...pagamento });

    return pagamento;
  }

  /* ───────────────────────────────────────────────────────── */
  async findAll() {
    return this.prisma.pagamento.findMany({
      include: { mensalidade: true },
      orderBy: { dataPagamento: 'desc' },
    });
  }

  /* ───────────────────────────────────────────────────────── */
  async findOne(id: string) {
    const pg = await this.prisma.pagamento.findUnique({
      where: { id },
      include: { mensalidade: true },
    });
    if (!pg) throw new NotFoundException('Pagamento não encontrado');
    return pg;
  }

  /* ───────────────────────────────────────────────────────── */
  async update(id: string, dto: UpdatePagamentoDto) {
    const data: Prisma.PagamentoUpdateInput = {
      valorPago:
        dto.valorPago !== undefined
          ? new Prisma.Decimal(dto.valorPago)
          : undefined,
      metodo: dto.metodo,
      dataPagamento: dto.dataPagamento,
    };

    const pg = await this.prisma.pagamento.update({
      where: { id },
      data,
      include: { mensalidade: true },
    });

    await this.firestore
      .collection('pagamentos')
      .doc(id)
      .update({ ...pg, updatedAt: new Date() });

    return pg;
  }

  /* ───────────────────────────────────────────────────────── */
  async remove(id: string) {
    await this.prisma.pagamento.delete({ where: { id } });
    await this.firestore.collection('pagamentos').doc(id).delete();
    return { message: `Pagamento ${id} removido com sucesso!` };
  }

  /* ─────────────────────────────────────────────────────────
   * Helper: marcar mensalidade como paga
   * ──────────────────────────────────────────────────────── */
  async pagar(id: string) {
    await this.prisma.mensalidade.update({
      where: { id },
      data: { status: 'pago' },
    });
    return { message: `Mensalidade ${id} quitada!` };
  }

  /* ─────────────────────────────────────────────────────────
   * Mock de comprovante (substituir por geração real)
   * ──────────────────────────────────────────────────────── */
  async gerarComprovante(id: string, res: Response) {
    res.setHeader('Content-Type', 'application/pdf');
    res.send(`Comprovante do pagamento ${id} (mock PDF gerado).`);
  }
}