import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Conta } from '../models/conta.model';
import { TipoConta } from '../enum/tipoDeConta';
import { ContaCorrenteFactory } from '../factories/contaCorrente.factory';
import { ContaPoupancaFactory } from '../factories/contaPoupanca.factory';

@Injectable()
export class ContaService {
  private contas: Conta[] = [];

  criarConta(
    tipo: TipoConta,
    id: number,
    saldo: number,
    clienteId: number,
    chequeEspecial?: number,
    rendimentoMensal?: number,
  ): Conta {
    let conta: Conta;
    switch (tipo) {
      case TipoConta.ContaCorrente:
        conta = ContaCorrenteFactory.criarContaCorrente(id, saldo, clienteId, chequeEspecial || 0);
        break;
      case TipoConta.ContaPoupanca:
        conta = ContaPoupancaFactory.criarContaPoupanca(id, saldo, clienteId, rendimentoMensal || 0);
        break;
      default:
        throw new BadRequestException(`Tipo de conta não suportado: ${tipo}`);
    }
    this.contas.push(conta);
    console.log('Conta criada:', conta);
    return conta;
  }

  obterConta(id: number): Conta | undefined {
    const conta = this.contas.find(conta => conta.id === id);
    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada`);
    }
    return conta;
  }

  obterContas(): Conta[] {
    return this.contas;
  }

  atualizarConta(id: number, tipo: TipoConta): Conta | undefined {
    const conta = this.contas.find(c => c.id === id);
    if (conta) {
      conta.tipo = tipo;
      return conta;
    }
    throw new NotFoundException(`Conta com ID ${id} não encontrada`);
  }

  removerConta(id: number): void {
    const contaIndex = this.contas.findIndex(conta => conta.id === id);
    if (contaIndex === -1) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada`);
    }
    this.contas.splice(contaIndex, 1);
  }

  removerContasPorCliente(idCliente: number): void {
    const contasAntes = this.contas.length;
    this.contas = this.contas.filter(conta => conta.clienteId !== idCliente);
    const contasRemovidas = contasAntes - this.contas.length;
    if (contasRemovidas === 0) {
      throw new NotFoundException(`Nenhuma conta encontrada para o cliente com ID ${idCliente}`);
    }
  }
}
