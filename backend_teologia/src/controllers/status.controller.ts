import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService, StatusPayload } from '../app.service';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Status da API' })
  getStatus(): StatusPayload {
    return this.appService.getStatus();
  }
}