import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @Version('1') // ✅ Necessário para funcionar com /api/v1/health
  @ApiOperation({ summary: 'Verifica se a API está ativa (health-check)' })
  @ApiOkResponse({
    description: 'Confirma que a API está operando corretamente.',
    schema: {
      example: {
        status: 'healthy',
        timestamp: '2025-06-23T18:10:00.000Z',
      },
    },
  })
  getHealth() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
