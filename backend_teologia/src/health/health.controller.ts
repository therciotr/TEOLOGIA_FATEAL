import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health') // ✅ removido version
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Verifica se a API está ativa (health-check)' })
  @ApiOkResponse({
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