import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TurmasService } from './turmas.service';

@Controller('turmas')
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) {}

  @Get()
  findAll() {
    return this.turmasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turmasService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.turmasService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.turmasService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turmasService.remove(id);
  }
}