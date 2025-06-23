import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Metrics')
@Controller('metrics') // ✅ removido version
export class MetricsController {
  @Get()
  @ApiOperation({ summary: 'Retorna métricas básicas de execução da API' })
  @ApiOkResponse({
    schema: {
      example: {
        status: 'ok',
        memory: {
          rss: 12345678,
          heapTotal: 4567890,
          heapUsed: 2345678,
          external: 987654,
        },
        uptime: 321.5,
        timestamp: '2025-06-23T18:20:00.000Z',
      },
    },
  })
  getMetrics() {
    return {
      status: 'ok',
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}