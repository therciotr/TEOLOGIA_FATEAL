import { Module } from '@nestjs/common';
import { ComprovantesService } from './comprovantes.service';
import { ComprovantesController } from './comprovantes.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ComprovantesController],
  providers: [ComprovantesService],
})
export class ComprovantesModule {}