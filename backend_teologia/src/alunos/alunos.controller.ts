import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AlunosService } from './alunos.service';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Get()
  findAll() {
    return this.alunosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alunosService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.alunosService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.alunosService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alunosService.remove(id);
  }
}