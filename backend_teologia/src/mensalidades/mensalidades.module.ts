import { Module } from '@nestjs/common';
import { MensalidadesService } from './mensalidades.service';
import { MensalidadesController } from './mensalidades.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MensalidadesController],
  providers: [MensalidadesService],
})
export class MensalidadesModule {}