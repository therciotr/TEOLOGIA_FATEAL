import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';

@Injectable()
export class PagamentosService {
  private prisma = new PrismaClient();

  async pagar(id: string) {
    const mensalidade = await this.prisma.mensalidade.update({
      where: { id },
      data: { status: 'pago' }
    });

    const pagamento = await this.prisma.pagamento.create({
      data: {
        mensalidade_id: mensalidade.id,
        data_pagamento: new Date(),
        valor_pago: mensalidade.valor,
        metodo: 'Pix'
      }
    });

    return { mensagem: 'Pagamento efetuado com sucesso!', pagamento };
  }

  gerarComprovante(id: string, res: Response) {
    const doc = new PDFDocument();
    let buffers: Uint8Array[] = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res
        .writeHead(200, {
          'Content-Length': Buffer.byteLength(pdfData),
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment;filename=comprovante-${id}.pdf`,
        })
        .end(pdfData);
    });

    doc.text(`Comprovante de pagamento - Mensalidade ${id}`);
    doc.end();
  }
}