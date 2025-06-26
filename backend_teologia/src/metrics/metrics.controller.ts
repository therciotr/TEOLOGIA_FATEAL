import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Metrics')
@Controller('metrics') // 🔗 Acessível via /api/v1/metrics
export class MetricsController {
  @Get()
  @Version('1') // 🌐 Suporta versionamento por URI (/api/v1/metrics)
  @ApiOperation({ summary: 'Retorna métricas básicas de execução da API' })
  @ApiOkResponse({
    description: 'Métricas atuais da aplicação',
    schema: {
      example: {
        status: 'ok',
        memory: {
          rssMB: 12.3,
          heapTotalMB: 4.56,
          heapUsedMB: 2.34,
          externalMB: 0.98,
        },
        uptimeSeconds: 321.5,
        timestamp: '2025-06-23T18:20:00.000Z',
      },
    },
  })
  getMetrics() {
    const memory = process.memoryUsage();

    return {
      status: 'ok',
      memory: {
        rssMB: +(memory.rss / 1024 / 1024).toFixed(2),
        heapTotalMB: +(memory.heapTotal / 1024 / 1024).toFixed(2),
        heapUsedMB: +(memory.heapUsed / 1024 / 1024).toFixed(2),
        externalMB: +(memory.external / 1024 / 1024).toFixed(2),
      },
      uptimeSeconds: +process.uptime().toFixed(2),
      timestamp: new Date().toISOString(),
    };
  }
}
