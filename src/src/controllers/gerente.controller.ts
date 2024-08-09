import { Controller, Post, Get, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { GerenteService } from '../services/gerente.service';
import { Gerente } from '../models/gerente.model';
import { Cliente } from '../models/cliente.model';

@Controller('gerente')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post('criar')
  criarGerente(@Body() gerente: Gerente): Gerente {
    console.log('Iniciando criação de novo gerente:', gerente);
    return this.gerenteService.criarGerente(gerente);
  }

  @Get(':id')
  buscarGerente(
    @Param('id', ParseIntPipe) id: number
  ): Gerente | { message: string } {
    console.log('Buscando gerente com o id:', id);
    try {
      return this.gerenteService.buscarGerente(id);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao buscar gerente:', error.message);
        return { message: error.message };
      } else {
        console.error(`Erro desconhecido ao buscar gerente com o ID ${id}:`, error);
        return { message: 'Erro desconhecido ao buscar gerente' };
      }
    }
  }

  @Get()
  buscarGerentes(): Gerente[] {
    console.log('Iniciando busca de todos os gerentes registrados');
    return this.gerenteService.buscarGerentes();
  }

  @Patch('atualizar/:id')
  atualizarGerente(
    @Param('id') id: number,
    @Body() gerenteAtualizado: Partial<Gerente>,
  ): Gerente | undefined {
    console.log(`Atualizando dados do gerente com id ${id}:`, gerenteAtualizado);
    return this.gerenteService.atualizarGerente(id, gerenteAtualizado);
  }

  @Delete('deletar/:id')
  deletarGerente(
    @Param('id', ParseIntPipe) id: number
  ): { message: string } {
    console.log(`Iniciando exclusão do gerente com id: ${id}`);
    return this.gerenteService.deletarGerente(id);
  }

  @Post('associarcliente/:gerenteId')
  associarClienteAoGerente(
    @Param('gerenteId', ParseIntPipe) gerenteId: number,
    @Body() cliente: Cliente
  ): Gerente | { message: string } {
    console.log(`Associando cliente ${JSON.stringify(cliente)} ao gerente com ID ${gerenteId}`);
    try {
      return this.gerenteService.adicionarClienteAoGerente(gerenteId, cliente);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao associar cliente ao gerente:', error.message);
        return { message: error.message };
      } else {
        console.error('Erro desconhecido ao associar cliente ao gerente:', error);
        return { message: 'Erro desconhecido ao associar cliente ao gerente' };
      }
    }
  }
}
