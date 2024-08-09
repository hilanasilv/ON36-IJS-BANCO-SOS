import { Injectable, NotFoundException } from '@nestjs/common';
import { Cliente } from '../cliente/cliente.model';
import { TipoConta } from '../enums/tipoDeConta.enum';
import { Gerente } from './gerente.model';

@Injectable()
export class GerenteService {
  private clientes: Cliente[] = [];
  private nextId: number = 1;
  private gerente: Gerente;

  constructor() {
    this.gerente = new Gerente(this.nextId++, 'Gerente Default');
  }

  criarCliente(nome: string): Cliente {
    const novoCliente = new Cliente(this.nextId++, nome);
    this.clientes.push(novoCliente);
    this.cadastrarClientes(this.clientes);
    return novoCliente;
  }

  cadastrarClientes(clientes: Cliente[]): void {
    console.log('Clientes salvos:', clientes);
  }

  buscarClientePeloId(id: number): Cliente {
    const cliente = this.clientes.find(cliente => cliente.id === id);
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return cliente;
  }

  criarContaBancaria(tipo: TipoConta, idCliente: number, saldo: number): Cliente {
    const cliente = this.buscarClientePeloId(idCliente);
    cliente.criarConta(tipo, saldo, this.gerente);
    return cliente;
  }

  alterarTipoConta(idCliente: number, tipoContaAtual: TipoConta, novoTipoConta: TipoConta): Cliente {
    const cliente = this.buscarClientePeloId(idCliente);
    cliente.alterarTipoConta(tipoContaAtual, novoTipoConta);
    return cliente;
  }

  excluirContaBancaria(idCliente: number, tipo: TipoConta): Cliente {
    const cliente = this.buscarClientePeloId(idCliente);
    cliente.excluirConta(tipo);
    return cliente;
  }

  excluirCliente(idCliente: number): void {
    const clienteIndex = this.clientes.findIndex(cliente => cliente.id === idCliente);
    if (clienteIndex === -1) {
      throw new NotFoundException(`Cliente com ID ${idCliente} não encontrado`);
    }
    this.clientes.splice(clienteIndex, 1);
  }
}
