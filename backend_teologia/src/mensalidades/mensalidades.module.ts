// src/mensalidades/mensalidades.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { FirebaseModule } from '@firebase/firebase.module';

import { MensalidadesController } from './mensalidades.controller';
import { MensalidadesService } from './mensalidades.service';

/**
 * 📦 MensalidadesModule
 * Regras de negócio de mensalidades + integração Firestore/Prisma
 */
@Module({
  imports: [
    PrismaModule,
    forwardRef(() => FirebaseModule), // evita loop se Firebase importar algo daqui
  ],
  controllers: [MensalidadesController],
  providers: [MensalidadesService],
  exports: [MensalidadesService],
})
export class MensalidadesModule {}