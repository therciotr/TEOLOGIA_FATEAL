import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MensalidadesService } from './mensalidades.service';

@Controller('mensalidades')
export class MensalidadesController {
  constructor(private readonly mensalidadesService: MensalidadesService) {}

  @Get()
  findAll() {
    return this.mensalidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mensalidadesService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.mensalidadesService.create(data);
  }

  @Post('/gerar')
  gerarMensalidades() {
    return this.mensalidadesService.gerarMensalidades();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.mensalidadesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mensalidadesService.remove(id);
  }
}