import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { GerenteService } from './gerente.service';
import { Cliente } from '../cliente/cliente.model';
import { TipoConta } from '../enums/tipoDeConta.enum';

@Controller('gerente')
export class GerenteController {
    constructor(private readonly gerenteService: GerenteService) {}

    @Post('novo-cliente')
    criarCliente(@Body('nome') nome: string): Cliente {
        return this.gerenteService.criarCliente(nome);
    }

    @Get(':id')
    buscarClientePeloId(@Param('id') id: number): Cliente {
        return this.gerenteService.buscarClientePeloId(id);
    }

    @Put('nova-conta')
    criarContaBancaria(@Body('tipo') tipo: TipoConta, @Body('idCliente') idCliente: number, @Body('saldo') saldo: number): Cliente {
        return this.gerenteService.criarContaBancaria(tipo, idCliente, saldo);
    }

    @Put()
    excluirContaBancaria(@Body('tipo') tipo: TipoConta, @Body('idCliente') idCliente: number): Cliente {
        return this.gerenteService.excluirContaBancaria(idCliente, tipo);
    }

    @Put('alterar-tipo-conta')
    alterarTipoConta(@Body('tipoContaAtual') tipoContaAtual: TipoConta, @Body('novoTipoConta') novoTipoConta: TipoConta, @Body('idCliente') idCliente: number): Cliente {
        return this.gerenteService.alterarTipoConta(idCliente, tipoContaAtual, novoTipoConta);
    }

    @Delete()
    excluirCliente(@Body('idCliente') idCliente: number): void {
        return this.gerenteService.excluirCliente(idCliente);
    }
}
