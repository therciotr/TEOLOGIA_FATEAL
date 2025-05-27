import { Module } from '@nestjs/common';
import { AlunosModule } from './alunos/alunos.module';
import { ResponsaveisModule } from './responsaveis/responsaveis.module';
import { TurmasModule } from './turmas/turmas.module';
import { PlanosModule } from './planos/planos.module';
import { MensalidadesModule } from './mensalidades/mensalidades.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { ComprovantesModule } from './comprovantes/comprovantes.module';

@Module({
  imports: [
    AlunosModule,
    ResponsaveisModule,
    TurmasModule,
    PlanosModule,
    MensalidadesModule,
    PagamentosModule,
    ComprovantesModule
  ],
})
export class AppModule {}