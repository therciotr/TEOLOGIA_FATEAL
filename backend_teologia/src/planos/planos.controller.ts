import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { PlanosService } from './planos.service';

@Controller('planos')
export class PlanosController {
  constructor(private readonly planosService: PlanosService) {}

  @Get()
  findAll() {
    return this.planosService.findAll();
  }

  @Post()
  create(@Body() data: any) {
    return this.planosService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.planosService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planosService.remove(id);
  }
}