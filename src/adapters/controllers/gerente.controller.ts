import { Controller, Post, Get, Patch, Delete, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { GerenteService } from '../services/gerente.service';
import { Gerente } from '../models/gerente.model';
import { Cliente } from '../models/cliente.model';

@Controller('gerente')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) { }

  @Post('criar')
  criarGerente(@Body() gerente: Gerente): Gerente {
    console.log('Iniciando criação de novo gerente:', gerente);
    return this.gerenteService.criarGerente(gerente);
  }

  @Get(':id')
  buscarGerente(
    @Param('id', ParseIntPipe) id: number
  ): Gerente {
    console.log('Buscando gerente com o id:', id);
    return this.gerenteService.buscarGerente(id);
  }

  @Get()
  buscarGerentes(): Gerente[] {
    console.log('Iniciando busca de todos os gerentes registrados');
    return this.gerenteService.buscarGerentes();
  }

  @Patch('atualizar/:id')
  atualizarGerente(
    @Param('id', ParseIntPipe) id: number,
    @Body() gerenteAtualizado: Partial<Gerente>,
  ): Gerente {
    console.log(`Atualizando dados do gerente com id ${id}:`, gerenteAtualizado);
    return this.gerenteService.atualizarGerente(id, gerenteAtualizado);
  }

  @Delete(':id')
  async deletarGerente(
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    try {
      await this.gerenteService.deletarGerente(id);
      // Retorne um status 204 No Content após a deleção
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw error;
      }
    }
  }

  @Post('associarcliente/:gerenteId')
  associarClienteAoGerente(
    @Param('gerenteId', ParseIntPipe) gerenteId: number,
    @Body() cliente: Cliente
  ): Gerente {
    console.log(`Associando cliente ${JSON.stringify(cliente)} ao gerente com ID ${gerenteId}`);
    return this.gerenteService.adicionarClienteAoGerente(gerenteId, cliente);
  }
}
