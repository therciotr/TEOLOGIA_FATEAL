import { Module } from '@nestjs/common';
import { ResponsaveisService } from './responsaveis.service';
import { ResponsaveisController } from './responsaveis.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ResponsaveisController],
  providers: [ResponsaveisService],
  exports: [ResponsaveisService],
})
export class ResponsaveisModule {}