import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResponsaveisService } from './responsaveis.service';
import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { UpdateResponsavelDto } from './dto/update-responsavel.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Responsáveis')
@Controller('responsaveis')
export class ResponsaveisController {
  constructor(private readonly responsaveisService: ResponsaveisService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo responsável' })
  create(@Body() createResponsavelDto: CreateResponsavelDto) {
    return this.responsaveisService.create(createResponsavelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os responsáveis' })
  findAll() {
    return this.responsaveisService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um responsável por ID' })
  findOne(@Param('id') id: string) {
    return this.responsaveisService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de um responsável' })
  update(
    @Param('id') id: string,
    @Body() updateResponsavelDto: UpdateResponsavelDto,
  ) {
    return this.responsaveisService.update(id, updateResponsavelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um responsável' })
  remove(@Param('id') id: string) {
    return this.responsaveisService.remove(id);
  }
}