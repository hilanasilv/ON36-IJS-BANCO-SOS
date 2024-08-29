import { Controller, Post, Body, Get, Param, Patch, NotFoundException, Delete, ParseIntPipe } from '@nestjs/common';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../../core/domain/models/cliente.model';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('adicionar')
  adicionarCliente(@Body() cliente: Cliente) {
    return this.clienteService.adicionarCliente(cliente);
  }

  @Post('associarconta')
  associarConta(@Body() body: { clienteId: number, contaId: number }) {
    const result = this.clienteService.associarConta(body.clienteId, body.contaId);
    if (!result) {
      throw new NotFoundException(`Cliente ou conta não encontrado.`);
    }
    return { message: 'Conta associada com sucesso.' };
  }

  @Get(':id')
  async buscarCliente(@Param('id', ParseIntPipe) id: number) {
    console.log(`Buscando cliente com ID: ${id}`);  
    const cliente = this.clienteService.buscarCliente(id);
    if (!cliente) {
      console.log(`Cliente com ID ${id} não encontrado.`);
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }  

  @Get()
  async buscarClientes() {
    console.log(`Buscando todos os clientes.`);  
    return this.clienteService.buscarClientes();
  }

  @Patch('atualizar/:id')
  atualizarCliente(
    @Param('id', ParseIntPipe) id: number,
    @Body() atualizarCliente: Partial<Cliente>
  ) {
    const cliente = this.clienteService.atualizarCliente(id, atualizarCliente);
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado para atualização.`);
    }
    return cliente;
  }

  @Delete('deletar/:id')
  deletarCliente(@Param('id', ParseIntPipe) id: number): { message: string } {
    console.log('Recebendo pedido para deletar cliente com id:', id);
    this.clienteService.deletarCliente(id);
    return { message: `Cliente com ID ${id} removido com sucesso.` };
  }
}
