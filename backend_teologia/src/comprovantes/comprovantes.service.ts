import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';

@Injectable()
export class ComprovantesService {
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

    doc.text(`Comprovante gerado com sucesso - ID: ${id}`);
    doc.end();
  }
}