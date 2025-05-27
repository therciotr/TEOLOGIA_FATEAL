import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ResponsaveisService } from './responsaveis.service';

@Controller('responsaveis')
export class ResponsaveisController {
  constructor(private readonly responsaveisService: ResponsaveisService) {}

  @Get()
  findAll() {
    return this.responsaveisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.responsaveisService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.responsaveisService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.responsaveisService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.responsaveisService.remove(id);
  }
}