import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma, MetodoPagamento, MensalidadeStatus } from '@prisma/client';
import { Firestore } from 'firebase-admin/firestore';

import {
  PagamentosBancosService,
  PSPResponse,
} from './pagamentos-bancos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';

// Token exportado pelo FirebaseModule (fora de src/)
import { FIRESTORE } from '@firebase/firebase.module';

@Injectable()
export class PagamentosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bancos: PagamentosBancosService,

    @Inject(FIRESTORE)
    private readonly firestore: Firestore,
  ) {}

  /* ───────────────────── Integração bancária ───────────────────── */
  async pagarBanco(banco: string, dadosPagamento: unknown): Promise<PSPResponse> {
    if (!banco || !dadosPagamento) {
      throw new HttpException('Banco ou dados de pagamento não informados!', HttpStatus.BAD_REQUEST);
    }

    switch (banco) {
      case 'bb':
        return this.bancos.pagarComBancoDoBrasil(dadosPagamento);
      case 'mercado_pago':
        return this.bancos.pagarComMercadoPago(dadosPagamento);
      /* Adicione novos bancos/PSPs aqui */
      default:
        throw new HttpException(`Banco ${banco} não suportado!`, HttpStatus.BAD_REQUEST);
    }
  }

  /* ─────────────────────────── CREATE ─────────────────────────── */
  async create(dto: CreatePagamentoDto) {
    // Confere se a mensalidade existe antes de criar
    const mensalidade = await this.prisma.mensalidade.findUnique({
      where: { id: dto.mensalidadeId },
    });
    if (!mensalidade) {
      throw new NotFoundException('Mensalidade não encontrada');
    }

    const data: Prisma.PagamentoCreateInput = {
      mensalidade: { connect: { id: dto.mensalidadeId } },
      valorPago: new Prisma.Decimal(dto.valorPago),
      metodo: dto.metodo as MetodoPagamento,
      dataPagamento: new Date(dto.dataPagamento ?? Date.now()),
    };

    const pagamento = await this.prisma.pagamento.create({ data });

    // Dual-write no Firestore
    await this.firestore.collection('pagamentos').doc(pagamento.id).set(pagamento);

    // Marca a mensalidade como paga
    await this.prisma.mensalidade.update({
      where: { id: dto.mensalidadeId },
      data: { status: MensalidadeStatus.pago },
    });

    return pagamento;
  }

  /* ─────────────────────────── READ ─────────────────────────── */
  findAll() {
    return this.prisma.pagamento.findMany({
      include: { mensalidade: true },
      orderBy: { dataPagamento: 'desc' },
    });
  }

  async findOne(id: string) {
    const pg = await this.prisma.pagamento.findUnique({
      where: { id },
      include: { mensalidade: true },
    });
    if (!pg) throw new NotFoundException('Pagamento não encontrado');
    return pg;
  }

  /* ─────────────────────────── UPDATE ─────────────────────────── */
  async update(id: string, dto: UpdatePagamentoDto) {
    const data: Prisma.PagamentoUpdateInput = {
      valorPago: dto.valorPago !== undefined ? new Prisma.Decimal(dto.valorPago) : undefined,
      metodo: dto.metodo ? (dto.metodo as MetodoPagamento) : undefined,
      dataPagamento: dto.dataPagamento ? new Date(dto.dataPagamento) : undefined,
    };

    const pg = await this.prisma.pagamento.update({
      where: { id },
      data,
      include: { mensalidade: true },
    });

    await this.firestore.collection('pagamentos').doc(id).update({ ...pg, updatedAt: new Date() });

    return pg;
  }

  /* ─────────────────────────── DELETE ─────────────────────────── */
  async remove(id: string) {
    await this.prisma.pagamento.delete({ where: { id } });
    await this.firestore.collection('pagamentos').doc(id).delete();
    return { message: `Pagamento ${id} removido com sucesso!` };
  }

  /* ───────────── Helper (quitar mensalidade) ───────────── */
  async quitarMensalidade(mensalidadeId: string) {
    await this.prisma.mensalidade.update({
      where: { id: mensalidadeId },
      data: { status: MensalidadeStatus.pago },
    });
    return { message: `Mensalidade ${mensalidadeId} foi quitada!` };
  }

  /* ───────────── Mock de comprovante ───────────── */
  async gerarComprovanteMock(id: string) {
    return `Comprovante do pagamento ${id} (PDF gerado em desenvolvimento).`;
  }
}
