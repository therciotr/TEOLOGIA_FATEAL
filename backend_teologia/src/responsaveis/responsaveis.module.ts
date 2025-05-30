import { Module } from '@nestjs/common';
import { ResponsaveisController } from './responsaveis.controller';
import { ResponsaveisService } from './responsaveis.service';

@Module({
  controllers: [ResponsaveisController],
  providers: [ResponsaveisService],
})
export class ResponsaveisModule {}