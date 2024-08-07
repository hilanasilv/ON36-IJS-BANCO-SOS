import { ContaPoupanca } from '../models/contaPoupanca.model';

export class ContaPoupancaFactory {
  static criarContaPoupanca(
    id: number,
    saldo: number,
    clienteId: number,
    rendimentoMensal: number
  ): ContaPoupanca {
    return new ContaPoupanca(id, saldo, clienteId, rendimentoMensal);
  }
}