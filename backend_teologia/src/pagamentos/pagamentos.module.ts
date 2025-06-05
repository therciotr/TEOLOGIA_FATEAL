import { Module, HttpModule } from '@nestjs/common';
import { PagamentosController } from './pagamentos.controller';
import { PagamentosService } from './pagamentos.service';
import { PagamentosBancosService } from './pagamentos-bancos.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [PagamentosController],
  providers: [PagamentosService, PagamentosBancosService],
  exports: [PagamentosService],
})
export class PagamentosModule {}